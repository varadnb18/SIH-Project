import React from 'react';
import './Navbar.css';  // Import the CSS file

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          Crop Disease Detection
        </div>
        <div className="nav-links">
          <a href="#home" className="nav-link">Home</a>
          <a href="#upload" className="nav-link">About</a>
          <a href="#detection" className="nav-link">Services</a>
          <a href="#results" className="nav-link">Contact</a>
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
