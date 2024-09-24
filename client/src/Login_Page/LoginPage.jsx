import { useState } from "react";
import "./LoginPage.css";
import SignInForm from "./Signin";
import SignUpForm from "./Signup";

const LoginPage = () => {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);

  const handleOverlayClick = () => {
    setIsRightPanelActive(!isRightPanelActive);
  };

  return (
    <div
      className={`login-container ${
        isRightPanelActive ? "right-panel-active" : ""
      }`}
      id="container"
    >
      <SignUpForm />
      <SignInForm />

      <div className="overlay-container" id="overlayCon">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1 className="overlay-heading">Welcome Back!</h1>
            <p className="overlay-text">
              To keep connected with us, please login with your personal info
            </p>
            <button onClick={handleOverlayClick} className="overlay-button">
              Sign In
            </button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1 className="overlay-heading">Hello, Friend!</h1>
            <p className="overlay-text">
              Enter your personal details and start your journey with us
            </p>
            <button onClick={handleOverlayClick} className="overlay-button">
              Sign Up
            </button>
          </div>
        </div>
        <button
          id="overlayBtn"
          onClick={handleOverlayClick}
          className="overlay-button"
        ></button>
      </div>
    </div>
  );
};

export default LoginPage;
