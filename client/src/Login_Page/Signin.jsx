import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

function SignInForm() {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  function HandleInput(event) {
    const { value, name } = event.target;

    setLogin((prevalue) => ({
      ...prevalue,
      [name]: value,
    }));
  }

  function HandleSubmit(event) {
    event.preventDefault();

    axios
      .post("http://localhost:4000/login", login, {
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify(sign),
      })
      // .then((response) => response.json())

      .then((data) => {
        navigate("/main-page");
        // console.log("success:", data);
        alert("hello");
      })

      .then((error) => {
        console.log("Error", error);
      });

    setLogin({
      email: "",
      password: "",
    });
  }

  return (
    <div className="form-container sign-in-container">
      <form action="#" className="form" onSubmit={HandleSubmit}>
        <h1 className="form-heading">Sign in</h1>
        <div className="social-container">
          <a href="#" className="social-icon">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" className="social-icon">
            <i className="fab fa-google-plus-g"></i>
          </a>
          <a href="#" className="social-icon">
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>
        <span className="alternate-login">or use your account</span>
        <div className="input-field">
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={HandleInput}
            value={login.email}
          />
          <label></label>
        </div>
        <div className="input-field">
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={HandleInput}
            value={login.password}
          />
          <label></label>
        </div>
        <a href="#" className="forgot-password">
          Forgot your password?
        </a>
        <button className="form-button">Sign In</button>
      </form>
    </div>
  );
}

export default SignInForm;
