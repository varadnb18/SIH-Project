import { useState } from 'react';
import LeftDiv from './LeftDiv.jsx';
import RightDiv from './RightDiv.jsx';
import './App.css';
import Navbar from './assets/Navbar.jsx';

function App() {
  return (
    <div className='App'>
      
      <div className="NavbarContainer">
        <Navbar />
      </div>
      <div className="MainContent">
        <LeftDiv />
        <div className="Divider"></div>
        <RightDiv />
      </div>
    </div>
  );
}

export default App;
