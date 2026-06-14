import React from 'react';
import './App.css';
import Orb from './Orb';

function App() {
  return (
    <div className="main-container">
      <div className="left-section">
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
          <Orb
            hoverIntensity={2}
            rotateOnHover
            hue={0}
            forceHoverState={false}
            backgroundColor="#000000"
          />
        </div>
        <div className="content-overlay">
          <h1>Welcome</h1>
          <p>This section is 40%.</p>
        </div>
      </div>
      <div className="right-section">
        <h2>Main Content Area</h2>
        <p>This section is 60% of the screen width.</p>
      </div>
    </div>
  );
}

export default App;
