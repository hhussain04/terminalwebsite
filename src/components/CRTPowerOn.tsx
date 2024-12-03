import React, { useEffect, useState } from 'react';

const CRTPowerOn: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      onComplete();
    }, 2000); // Duration of the CRT power-on animation

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
      <div className="crt-power-on"></div>
    </div>
  );
};

export default CRTPowerOn;