import React, { useState, useContext } from "react";
import LeftDiv from './LeftDiv.jsx';
import RightDiv from './RightDiv.jsx';
import './App.css';
import { MyProvider } from './MyContext.jsx';

function App() {
  return (
    <>
      <div className='App'>
      <MyProvider>
        <LeftDiv />
        <div className="Divider"></div>
        <RightDiv />
      </MyProvider>
      </div>
    </>
  );
}

export default App;