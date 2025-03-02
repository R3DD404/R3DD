"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Monitor, Terminal } from 'lucide-react';

interface ModeSelectorProps {
  onSelectMode: (mode: 'normal' | 'hacker') => void;
}

const ModeSelector = ({ onSelectMode }: ModeSelectorProps) => {
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    // Activate glitch effect periodically
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 3000);

    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="grid grid-cols-1 gap-8 max-w-4xl w-full">
        <div className="text-center mb-8">
          <h1 
            className={`text-5xl md:text-7xl font-bold text-red-500 mb-4 pixel-font ${
              glitchActive ? 'animate-glitch' : ''
            }`}
          >
            ROOT,RECON AND R3DD
          </h1>
          <p className="text-green-400 text-xl pixel-font">SELECT INTERFACE MODE</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Button 
            onClick={() => onSelectMode('normal')}
            className="h-40 bg-black border-2 border-green-500 hover:bg-green-900/20 hover:scale-105 transition-all duration-300 group"
          >
            <div className="flex flex-col items-center justify-center space-y-4">
              <Monitor className="h-12 w-12 text-green-500 group-hover:animate-pulse" />
              <span className="text-xl text-green-500 pixel-font">NORMAL MODE</span>
            </div>
          </Button>

          <Button 
            onClick={() => onSelectMode('hacker')}
            className="h-40 bg-black border-2 border-green-500 hover:bg-green-900/20 hover:scale-105 transition-all duration-300 group"
          >
            <div className="flex flex-col items-center justify-center space-y-4">
              <Terminal className="h-12 w-12 text-green-500 group-hover:animate-pulse" />
              <span className="text-xl text-green-500 pixel-font">HACKER MODE</span>
            </div>
          </Button>
        </div>
      </div>

      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none"></div>
    </div>
  );
};

export default ModeSelector;