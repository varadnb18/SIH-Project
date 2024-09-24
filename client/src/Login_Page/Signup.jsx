import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginPage.css";

function SignUpForm() {
  const [sign, setSign] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  function HandleInput(event) {
    const { value, name } = event.target;

    setSign((prevalue) => ({
      ...prevalue,
      [name]: value,
    }));
  }

  function HandleSubmit(event) {
    event.preventDefault();

    axios
      .post("http://localhost:4000/login", sign, {
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

    setSign({
      name: "",
      email: "",
      password: "",
    });
  }
  return (
    <div className="form-container sign-up-container">
      <form action="#" className="form" onSubmit={HandleSubmit}>
        <h1 className="form-heading">Create Account</h1>
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
        <span className="alternate-login">
          or use your email for registration
        </span>
        <div className="input-field">
          <input
            type="text"
            placeholder="Name"
            name="name"
            onChange={HandleInput}
            value={sign.name}
          />
          <label></label>
        </div>
        <div className="input-field">
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={HandleInput}
            value={sign.email}
          />
          <label></label>
        </div>
        <div className="input-field">
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={HandleInput}
            value={sign.password}
          />
          <label></label>
        </div>
        <button className="form-button">Sign Up</button>
      </form>
      {console.log(sign.email)};{console.log(sign.password)};
      {console.log(sign.name)}
    </div>
  );
}

export default SignUpForm;
