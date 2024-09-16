import { useState } from 'react';
import LeftDiv from './LeftDiv.jsx';
import RightDiv from './RightDiv.jsx';
import './App.css';

function App() {
  return (
    <>
      <div className='App'>
        <LeftDiv />
        <div className="Divider"></div>
        <RightDiv />
      </div>
    </>
  );
}

export default App;
