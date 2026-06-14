import React from 'react';
import './App.css';
import Orb from './Orb';

function App() {
  return (
    <div className="app-wrapper">
      {/* Orb is now a separate layer at the top level */}
      <div className="background-orb">
        <Orb
          hoverIntensity={2}
          rotateOnHover
          hue={0}
          forceHoverState={false}
          backgroundColor="#000000"
        />
      </div>

      {/* Your content lives in a separate container on top of the orb */}
      <div className="content-container">
        <div className="left-section">
          <h1>Welcome</h1>
          <p>This section is 40%.</p>
        </div>
        <div className="right-section">
          <h2>Main Content Area</h2>
          <p>This section is 60% of the screen width.</p>
        </div>
      </div>
    </div>
  );
}

export default App;
