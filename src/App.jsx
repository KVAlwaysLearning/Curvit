import React from 'react';
import './App.css'; // Standard Create React App CSS
import Orb from './Orb';

function App() {
  return (
    <div className="main-container">
      {/* Section 1: LEFT SIDE (40% width)
        The Orb must be positioned relatively so the absolute Orb component inside
        fills this container.
      */}
      <div className="left-section">
        <div className="orb-wrapper">
          <Orb hue={210} saturation={0.8} brightness={0.6} /> {/* Optional props: customized blue */}
        </div>
        <div className="content-overlay">
          <h1>Welcome</h1>
          <p>This section is 40%.</p>
        </div>
      </div>

      {/* Section 2: RIGHT SIDE (60% width)
      */}
      <div className="right-section">
        <h2>Main Content Area</h2>
        <p>This section is 60% of the screen width.</p>
        <p>Your main application logic or data dashboard goes here.</p>
      </div>
    </div>
  );
}

export default App;
