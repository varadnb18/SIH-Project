import React, { useState } from "react";
import "./LeftDiv.css";

function LeftDiv() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setSelectedImage(file);
        
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setImagePreviewUrl(previewUrl);
        }
    };

    return (
        <div className="LeftDiv">
            {/* Display the uploaded image preview */}
            {imagePreviewUrl && (
                <div className="image_preview">
                    <img src={imagePreviewUrl} alt="Uploaded" className="uploaded_image" />
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
                <input type="text" className="button_leftside" placeholder="Insert PH of Soil" />
                <input type="text" className="button_leftside" placeholder="Insert Sulfur Presence" />
                <input type="text" className="button_leftside" placeholder="Insert Nitrogen Presence" />
                <input type="text" className="button_leftside" placeholder="Insert Potassium Presence" />
            </div>

            <div>
                <button className="btn">
                    Send
                </button>
            </div>
        </div>
    );
}

export default LeftDiv;
