import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const vantaRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadVanta = async () => {
      // Load Three.js first
      const threeScript = document.createElement('script');
      threeScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
      threeScript.async = true;
      
      threeScript.onload = () => {
        // Load Vanta after Three.js
        const vantaScript = document.createElement('script');
        vantaScript.src = 'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.dots.min.js';
        vantaScript.async = true;
        
        vantaScript.onload = () => {
          if (vantaRef.current && window.VANTA) {
            window.VANTA.DOTS({
              el: vantaRef.current,
              mouseControls: true,
              touchControls: true,
              gyroControls: false,
              minHeight: 200.0,
              minWidth: 200.0,
              scale: 1.0,
              scaleMobile: 1.0,
              color: 0x3b82f6,
              backgroundColor: 0x0f172a,
            });
          }
        };
        document.body.appendChild(vantaScript);
      };
      document.body.appendChild(threeScript);
    };

    loadVanta();

    return () => {
      // Cleanup is handled by Vanta
    };
  }, []);

  return (
    <div ref={vantaRef} className="w-full h-screen flex items-center justify-center">
      <div className="text-center text-white z-10">
        <h1 className="text-5xl font-bold mb-4">AI Code Reviewer</h1>
        <button
          onClick={() => navigate('/app')}
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold"
        >
          Start Reviewing
        </button>
      </div>
    </div>
  );
}

export default LandingPage;
