import { useState, useEffect } from 'react';
import Envelope from './Envelope';
import Details from './Details';
import bgImageDefault from './images/IMG_7585.JPG.jpeg';
import bgImageClosing from './images/IMG_7560.JPG.jpeg';
import './App.css';

function App() {
  const [showDetails, setShowDetails] = useState(false);
  const [resetEnvelope, setResetEnvelope] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [currentBg, setCurrentBg] = useState({ url: bgImageDefault, position: 'bottom' });

  useEffect(() => {
    // Wait for the intro animation (2s delay + 2s animation) before switching classes
    const timer = setTimeout(() => {
      setHasLoaded(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleCloseDetails = () => {
    setShowDetails(false);
    setCurrentBg({ url: bgImageClosing, position: 'right' });

    // Wait for the details screen to fade out and the envelope to float back down before closing the flaps
    setTimeout(() => {
      setResetEnvelope(true);
      setTimeout(() => setResetEnvelope(false), 100); // trigger reset and turn off
    }, 1200);
  };

  return (
    <div
      className="app-container"
      style={{
        backgroundImage: `radial-gradient(circle at center, rgba(255,255,255,0.3) 0%, rgba(244,238,230,0.85) 100%), url(${currentBg.url})`,
        backgroundSize: 'cover',
        backgroundPosition: currentBg.position, /* Dynamic background position */
        backgroundAttachment: 'scroll',
        backgroundRepeat: 'no-repeat',
        transition: 'background-position 1.2s ease, background-image 1.2s ease'
      }}
    >
      {/* 
        We keep both components in the DOM so the envelope can fade/zoom out 
        while the details page fades in. 
      */}
      <div className={`envelope-wrapper ${hasLoaded ? 'visible' : ''} ${showDetails ? 'zoom-out' : ''}`}>
        <Envelope onOpen={() => setShowDetails(true)} reset={resetEnvelope} />
      </div>

      <Details isActive={showDetails} onClose={handleCloseDetails} />
    </div>
  );
}

export default App;
