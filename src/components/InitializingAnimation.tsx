import React, { useEffect, useState } from 'react';
import LoadingAnimation from './LoadingAnimation';

const InitializingAnimation: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [messages, setMessages] = useState<string[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [showLoadingAnimation, setShowLoadingAnimation] = useState(false);
  const loadingMessages = [
    'Loading assets...',
    'Initializing components...',
    'Setting up environment...',
    'Fetching data...',
    'Starting application...',
    'Installing dependencies...',
    'Configuring system settings...',
    'Finalizing setup...',
    'Installation complete.'
  ];

  useEffect(() => {
    let messageIndex = 0;
    let charIndex = 0;

    const typeMessage = () => {
      if (messageIndex < loadingMessages.length) {
        const message = loadingMessages[messageIndex];

        if (charIndex < message.length) {
          setCurrentMessage(message.substring(0, charIndex + 1)); // Update to display the message up to current charIndex
          charIndex++;
        } else {
          setMessages((prev) => [...prev, message]);
          setCurrentMessage(''); // Reset for the next message
          charIndex = 0;
          messageIndex++;
        }
      } else {
        setShowLoadingAnimation(true);
        setTimeout(onComplete, 2000); // Show loading animation for 2 seconds before completing
      }
    };

    const interval = setInterval(typeMessage, 50);

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, [onComplete]);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black z-50">
      <div className="text-green-500 text-2xl font-vt323 mb-4">
        Initializing...
      </div>
      <div className="text-green-500 font-vt323">
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
        {currentMessage && <div>{currentMessage}</div>}
      </div>
      {showLoadingAnimation && <LoadingAnimation />}
    </div>
  );
};

export default InitializingAnimation;