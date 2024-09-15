import React, { useState, useContext } from "react";
import "./LeftDiv.css";
import { MyContext } from "./MyContext";
import axios from 'axios';

function LeftDiv() {
    const { data, setData } = useContext(MyContext);
    const [selectedFile, setSelectedFile] = useState(null);
    const [prediction, setPrediction] = useState('');
    const [previewImage, setPreviewImage] = useState('');

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
        setPreviewImage(URL.createObjectURL(e.target.files[0]));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedFile) {
            alert("Please upload an image first.");
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await axios.post('http://localhost:5000/predict', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setPrediction(response.data.prediction);
            setPreviewImage(response.data.image);
            setData(response.data.ai_response); // Update context state
            console.log("data=>", response.data.ai_response); // Log the response

        } catch (error) {
            console.error("Error in prediction:", error.response ? error.response.data : error.message);
            alert("There was an error predicting the disease.");
        }
    };

    return (
        <div className="LeftDiv">
            <div className="racat">
                <form onSubmit={handleSubmit}>
                    <input type="file" accept="image/*" onChange={handleFileChange} />
                    <button type="submit">Predict Disease</button>
                </form>
            </div>
            <div className="line_leftside"></div>
            <div className="group_button_left">
                <h4>ML prediction:</h4>{prediction}
                <div className="user_info_left">User Input</div>
                <input type="text" className="button_leftside" placeholder="Insert PH of Soil" />
                <input type="text" className="button_leftside" placeholder="Insert Sulfur Presence" />
                <input type="text" className="button_leftside" placeholder="Insert Nitrogen Presence" />
                <input type="text" className="button_leftside" placeholder="Insert Potassium Presence" />
            </div>
        </div>
    );
}

export default LeftDiv;
