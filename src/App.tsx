import React, { useState } from 'react';
import Terminal from './components/Terminal';
import CRTOverlay from './components/CRTOverlay';
import GridLogo from './components/GridLogo';
import InitializingAnimation from './components/InitializingAnimation';

function App() {
  const [isInitialized, setIsInitialized] = useState(false);

  return (
    <div className="relative">
      {!isInitialized && <InitializingAnimation onComplete={() => setIsInitialized(true)} />}
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