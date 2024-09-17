import React from "react";
import "./LeftDiv.css";

function LeftDiv() {
    return (
        <div className="LeftDiv">
            <div className="racat">
                <button className="upload_button_left">Upload image</button>
            </div>
            <div className="line_leftside"></div>
            <div className="group_button_left">
                <div className="user_info_left">User Input</div>
                <input type="text" className="button_leftside" placeholder="Insert PH of Soil" />
                <input type="text" className="button_leftside" placeholder="Insert Sulfer Presence" />
                <input type="text" className="button_leftside" placeholder="Insert Nitrogen Presence"/>
                <input type="text" className="button_leftside" placeholder="Insert Potassium Presence"/>
            </div>
            <div>
                <button class="btn">
                    Send
                </button>
            </div>
        </div>
    );
}

export default LeftDiv;