import React, { useState } from 'react';
import StarryBackground from './components/StarryBackground';
import IntroScreen from './components/IntroScreen';
import Hero from './components/Hero';
import Timeline from './components/Timeline';
import Memories from './components/Memories';
import Reasons from './components/Reasons';
import FinalSurprise from './components/FinalSurprise';
import CustomCursor from './components/CustomCursor';

export default function App() {
  const [partnerName, setPartnerName] = useState<string>('');
  const [isStarted, setIsStarted] = useState<boolean>(false);

  const handleStart = (name: string) => {
    setPartnerName(name);
    setIsStarted(true);
    // Smooth scroll to top when starting
    window.scrollTo(0, 0);
  };

  return (
    <div className="relative min-h-screen font-sans selection:bg-rose-500 selection:text-white cursor-none sm:cursor-auto">
      <CustomCursor />
      <StarryBackground />
      
      {!isStarted ? (
        <IntroScreen onStart={handleStart} />
      ) : (
        <main className="relative z-10">
          <Hero name={partnerName} />
          
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32 pb-32">
            <Timeline />
            <Memories />
            <Reasons />
            <FinalSurprise name={partnerName} />
          </div>
        </main>
      )}
    </div>
  );
}