import React from 'react';

const CRTOverlay: React.FC = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      <div className="crt-overlay"></div>
      <div className="scanline"></div>
      <div className="flicker"></div>
    </div>
  );
};

export default CRTOverlay;