import React from 'react';
import './App.css';
import Orb from './Orb';

function App() {
  return (
    <div className="app-wrapper">
      {/* Layer 0: Background Orb 
        The Orb component is placed here to span the full viewport.
      */}
      <div className="background-orb">
        <Orb 
          hoverIntensity={2} 
          rotateOnHover={true} 
          hue={0} 
          forceHoverState={false} 
          backgroundColor="#000000" 
        />
      </div>

      {/* Layer 1: Content Container
        This sits on top of the orb.
      */}
      <div className="content-wrapper">
        <div className="left-section">
          <h1>Curvit</h1>
          <p>Your interactive background is now set to full screen.</p>
        </div>
        <div className="right-section">
          <h2>Main Content Area</h2>
          <p>This content sits comfortably on top of the WebGL animation.</p>
        </div>
      </div>
    </div>
  );
}

export default App;
