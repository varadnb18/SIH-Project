import React from "react";
import "./LeftDiv.css";
function LeftDiv() {
    return (
      <div className="LeftDiv">
      <div className="racat">
      <button className="upload_button_left">upload +</button>
      </div>
      <div className="line_leftside"></div>
        <div className="group_button_left">
         <div>User Input</div>
        <button className="button_leftside">soil PH</button>
        <button  className="button_leftside">S(Sulfur)</button>
        <button  className="button_leftside">N(Nitrogen)</button>
        <button  className="button_leftside">K(potassium)</button>
      </div>
    </div>
    )
  }
  
  export default LeftDiv;
  