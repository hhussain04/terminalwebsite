import React, { useEffect, useState } from 'react';
import LoadingAnimation from './LoadingAnimation';

const InitializingAnimation: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      onComplete();
    }, 1500); // Animation duration

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black z-50">
      <div className="text-green-500 text-2xl font-vt323 mb-4">
        Initializing...
      </div>
      <LoadingAnimation />
    </div>
  );
};

export default InitializingAnimation;