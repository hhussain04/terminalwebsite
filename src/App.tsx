import React, { useState } from 'react';
import Terminal from './components/Terminal';
import CRTOverlay from './components/CRTOverlay';
import GridLogo from './components/GridLogo';
import InitializingAnimation from './components/InitializingAnimation';
import CRTPowerOn from './components/CRTPowerOn';

function App() {
  const [isPowerOn, setIsPowerOn] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  return (
    <div className="relative">
      {!isPowerOn && <CRTPowerOn onComplete={() => setIsPowerOn(true)} />}
      {isPowerOn && !isInitialized && <InitializingAnimation onComplete={() => setIsInitialized(true)} />}
      {isInitialized && (
        <>
          <GridLogo />
          <Terminal />
          <CRTOverlay />
        </>
      )}
    </div>
  );
}

export default App;