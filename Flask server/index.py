from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import img_to_array, load_img
import numpy as np
import os
import cv2
import base64
import google.generativeai as genai
import asyncio

app = Flask(__name__)
CORS(app)

# Load pre-trained Keras model
MLmodel = load_model('trained_model.keras')

# Class names as per model output
class_names = [
    'Tomato___Bacterial_spot', 'Tomato___Early_blight', 'Tomato___Late_blight',
    'Tomato___Leaf_Mold', 'Tomato___Septoria_leaf_spot', 'Tomato___Spider_mites_Two-spotted_spider_mite',
    'Tomato___Target_Spot', 'Tomato___Tomato_Yellow_Leaf_Curl_Virus', 'Tomato___Tomato_mosaic_virus', 'Tomato___healthy'
]

# Configure Google Gemini API
genai.configure(api_key="AIzaSyD2JwFzqCf9bzMtm2TsdZzrd2_td-RW6CE")
generation_config = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 64,
    "max_output_tokens": 8192,
    "response_mime_type": "text/plain",
}

# Initialize the Generative Model globally
AImodel = genai.GenerativeModel(
    model_name="gemini-1.5-pro",
    generation_config=generation_config,
    system_instruction=(
        "You are a AI Crop(Tomato) Expert. Whenever user sends you the image of tomato leaf with disease, predicted disease from the ML model along with the soil parameters such as Ph,sulfur,nitrogen,potassium content in the soil in (mg/kg) you will rectify the result and just generate proper output for it including detailed Symptoms, preventive measures, Treatment and the links to the products such as fertilizer, pesticides, etc.\nThe predicted output array consist of:\nclass_names = [\n    'Tomato___Bacterial_spot',\n    'Tomato___Early_blight',\n    'Tomato___Late_blight',\n    'Tomato___Leaf_Mold',\n    'Tomato___Septoria_leaf_spot',\n    'Tomato___Spider_mites Two-spotted_spider_mite',\n    'Tomato___Target_Spot',\n    'Tomato___Tomato_Yellow_Leaf_Curl_Virus',\n    'Tomato___Tomato_mosaic_virus',\n    'Tomato___healthy'\n]\nDo not comment on the output of ML model.\n\nlinks: www.amazon.in, https://www.bighaat.com/, https://agribegri.com/"
    )
)

# Global variable for chat session
chat_session = None

# Function to upload image to Gemini
def upload_to_gemini(path):
    file = genai.upload_file(path, mime_type="image/jpeg")
    return file

# Function to initialize the chatbot session asynchronously
async def start_chat():
    global chat_session
    try:
        chat_session = AImodel.start_chat(history=[])
        print("Chat session initialized")
    except Exception as e:
        print(f"Error initializing chat session: {e}")

@app.route('/')
def home():
    return 'Welcome to the Crop Disease Prediction Model'

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400
    
    file = request.files['file']
    ph = request.form.get('ph')
    sulfur = request.form.get('sulfur')
    nitrogen = request.form.get('nitrogen')
    potassium = request.form.get('potassium')

    # Use these variables in your prediction logic
    print(f"PH: {ph}, Sulfur: {sulfur}, Nitrogen: {nitrogen}, Potassium: {potassium}")

    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    if file and file.filename.endswith(('jpg', 'jpeg', 'png')):
        # Save and preprocess the image
        image_path = os.path.join('uploads', file.filename)
        file.save(image_path)
        image = load_img(image_path, target_size=(128, 128))
        input_arr = np.expand_dims(img_to_array(image) / 255.0, axis=0)
        
        try:
            # Model prediction
            prediction = MLmodel.predict(input_arr)
            predicted_class_index = np.argmax(prediction)
            model_prediction = class_names[predicted_class_index]

            # Convert image to base64 format
            img = cv2.imread(image_path)
            img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
            _, buffer = cv2.imencode('.jpg', img)
            img_str = base64.b64encode(buffer).decode('utf-8')

            # Upload image to Gemini and send message
            uploaded_file = upload_to_gemini(image_path)
            chat_session = AImodel.start_chat(history=[{"role": "user", "parts": [uploaded_file]}])
            
            # Create a formatted message string
            message = (
                f"Predicted Disease: {model_prediction}\n"
                f"PH: {ph}\n"
                f"Sulfur: {sulfur}\n"
                f"Nitrogen: {nitrogen}\n"
                f"Potassium: {potassium}"
            )

            # Send the message
            response = chat_session.send_message(message)
            print("AI response =>", response.text)

            # Remove the temporary image file
            os.remove(image_path)

            # Return prediction and image
            return jsonify({
                'prediction': model_prediction,
                'image': f'data:image/jpeg;base64,{img_str}',
                'ai_response': response.text  # AI-generated suggestions
            })
        except Exception as e:
            print(f"Prediction error: {e}")
            return jsonify({'error': 'Error during prediction'}), 500
    else:
        return jsonify({'error': 'Invalid file type, only images are allowed'}), 400

@app.route('/chat', methods=['POST'])
def chat():
    text_data = request.form.get('text')
    print("Received text =>", text_data)
    try:
        response = chat_session.send_message(text_data)
        return jsonify({'ai_response': response.text})
    except Exception as e:
        return jsonify({'error': f'Error sending message: {e}'}), 500
    

if __name__ == '__main__':
    if not os.path.exists('uploads'):
        os.makedirs('uploads')
    
    # Start the Flask app and initialize the chat session
    asyncio.run(start_chat())
    app.run(debug=True)
