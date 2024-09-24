import React, { useState, useContext } from "react";
import "./LeftDiv.css";
import { MyContext } from "../MyContext";
import axios from "axios";

function LeftDiv() {
  const { data, setData } = useContext(MyContext);
  const { loading, setLoading } = useContext(MyContext);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [prediction, setPrediction] = useState("");
  const [ph, setPh] = useState();
  const [sulfur, setSulfur] = useState();
  const [nitrogen, setNitrogen] = useState();
  const [potassium, setPotassium] = useState();

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreviewUrl(previewUrl);
    }
  };

  async function handleSend() {
    setLoading(true);
    const formData = new FormData();

    // Append the image file to formData
    formData.append("file", selectedImage);

    // Append additional parameters to formData
    formData.append("ph", ph);
    formData.append("sulfur", sulfur);
    formData.append("nitrogen", nitrogen);
    formData.append("potassium", potassium);

    try {
      const response = await axios.post(
        "http://localhost:5000/predict",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setPrediction(response.data.prediction);
      setData(response.data.ai_response); // Update context state
      console.log("data=>", response.data.ai_response); // Log the response
      setLoading(false);
    } catch (error) {
      console.error(
        "Error in prediction:",
        error.response ? error.response.data : error.message
      );
      alert("There was an error predicting the disease.");
    }
  }

  return (
    <div className="LeftDiv">
      {/* Display the uploaded image preview */}
      {imagePreviewUrl && (
        <div className="image_preview">
          <img
            src={imagePreviewUrl}
            alt="Uploaded"
            className="uploaded_image"
          />
        </div>
      )}

      <div className="racat">
        <label htmlFor="upload" className="upload_button_left">
          Upload image
        </label>
        <input
          id="upload"
          type="file"
          accept="image/*"
          style={{ display: "none" }} // Hide the default file input
          onChange={handleImageUpload}
        />
      </div>

      <div className="line_leftside"></div>

      <div className="group_button_left">
        <div className="user_info_left">User Input</div>
        <input
          type="text"
          className="button_leftside"
          placeholder="Insert PH of Soil"
          onChange={(e) => setPh(e.target.value)}
        />
        <input
          type="text"
          className="button_leftside"
          placeholder="Insert Sulfur Presence (mg/kg)"
          onChange={(e) => setSulfur(e.target.value)}
        />
        <input
          type="text"
          className="button_leftside"
          placeholder="Insert Nitrogen Presence (mg/kg)"
          onChange={(e) => setNitrogen(e.target.value)}
        />
        <input
          type="text"
          className="button_leftside"
          placeholder="Insert Potassium Presence (mg/kg)"
          onChange={(e) => setPotassium(e.target.value)}
        />
      </div>

      <div>
        <button className="btn" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
}

export default LeftDiv;
