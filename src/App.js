import React, { useState } from 'react';
import LandingPage from './LandingPage';
import ThreeScene from './ThreeScene';

const App = () => {
  const [isMusicOn, setIsMusicOn] = useState(false);

  const handleStart = () => {
    setIsMusicOn(true);
  };

  return (
    <div className="app">
      {!isMusicOn && <LandingPage onStart={handleStart} />}
      {isMusicOn && <ThreeScene />}
    </div>
  );
};

export default App;
