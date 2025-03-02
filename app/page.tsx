"use client";

import { useState, useEffect } from 'react';
import ModeSelector from '@/components/mode-selector';
import NormalMode from '@/components/normal-mode';
import HackerMode from '@/components/hacker-mode';
import MatrixBackground from '@/components/matrix-background';

export default function Home() {
  const [mode, setMode] = useState<'selector' | 'normal' | 'hacker'>('selector');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-black">
        <div className="text-green-500 text-2xl font-mono animate-pulse">
          Loading system...
        </div>
      </div>
    );
  }

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-black">
      <MatrixBackground />
      
      <div className="relative z-10 min-h-screen">
        {mode === 'selector' && <ModeSelector onSelectMode={setMode} />}
        {mode === 'normal' && <NormalMode onExit={() => setMode('selector')} />}
        {mode === 'hacker' && <HackerMode onExit={() => setMode('selector')} />}
      </div>
    </main>
  );
}