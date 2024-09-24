import { useState } from "react";
import LeftDiv from "./DIV/LeftDiv.jsx";
import RightDiv from "./DIV/RightDiv.jsx";
import "./App.css";
import Navbar from "./assets/Navbar.jsx";
import { MyProvider } from "./MyContext.jsx";

function App() {
  return (
    <div className="App">
      <MyProvider>
        <div className="NavbarContainer">
          <Navbar />
        </div>
        <div className="MainContent">
          <LeftDiv />
          <div className="Divider"></div>
          <RightDiv />
        </div>
      </MyProvider>
    </div>
  );
}

export default App;
