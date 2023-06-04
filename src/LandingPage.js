import React, { useState } from 'react';
import './LandingPage.css';

const LandingPage = ({ onStart }) => {
  const [isMuted, setIsMuted] = useState(false);

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="landing-page">
      <div className="background-animation">
        <div className="gradient-overlay"></div>
      </div>
      <div className="start-button" onClick={onStart}>
        Start
      </div>
      <div className="music-control">
        <div className="music-logo">Music Logo</div>
        <button className={`mute-button ${isMuted ? 'muted' : ''}`} onClick={handleMuteToggle}>
          {isMuted ? 'Unmute' : 'Mute'}
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
