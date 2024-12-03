import React, { useEffect, useState } from 'react';

const LoadingAnimation: React.FC = () => {
  const [rotation, setRotation] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 45) % 360);
    }, 100);
    
    return () => clearInterval(interval);
  }, []);

  const getLoadingChar = (degrees: number) => {
    const chars = ['/', '⟋', '|', '⟍', '\\', '⟋', '|', '/'];
    const index = Math.round((degrees % 360) / 45);
    return chars[index];
  };
  
  return (
    <div className="flex items-center gap-2 my-2">
      <span className="inline-block w-4 text-center text-green-500">
        {getLoadingChar(rotation)}
      </span>
      <span className="text-green-500">LOADING</span>
    </div>
  );
};

export default LoadingAnimation;