import React, { useState, useRef } from 'react';
import { Lock, Unlock, Heart } from 'lucide-react';
import Confetti from './Confetti';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface FinalSurpriseProps {
  name: string;
}

export default function FinalSurprise({ name }: FinalSurpriseProps) {
  const [clicksCount, setClicksCount] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [accepted, setAccepted] = useState(false);
  
  // States for the runaway "No" button using proper React.CSSProperties type
  const [noPosition, setNoPosition] = useState<React.CSSProperties>({});

  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(ref, { threshold: 0.3 });

  const CLICKS_NEEDED = 3;

  const handleHeartClick = () => {
    if (isUnlocked) return;

    // Trigger Shake
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 300);

    setClicksCount(prev => {
      const newCount = prev + 1;
      if (newCount >= CLICKS_NEEDED) {
        setIsUnlocked(true);
      }
      return newCount;
    });
  };

  const handleNoHover = () => {
    // Runaway behavior for the 'No' button
    const randomTop = Math.random() * 80 + 10; // 10% to 90%
    const randomLeft = Math.random() * 80 + 10;
    
    setNoPosition({
      position: 'absolute',
      top: `${randomTop}%`,
      left: `${randomLeft}%`,
      transform: 'translate(-50%, -50%)',
    });
  };

  const handleYesClick = () => {
    setAccepted(true);
  };

  return (
    <section ref={ref} className="py-32 relative flex flex-col items-center justify-center min-h-[60vh]">
      {accepted && <Confetti />}

      <div 
        className={`transition-all duration-1000 w-full max-w-2xl text-center
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-24'}`}
      >
        {/* State 1: Locked Heart */}
        {!isUnlocked && (
          <div className="flex flex-col items-center">
            <h2 className="text-4xl font-handwriting text-rose-300 mb-8">Click to Unlock My Heart</h2>
            
            <button 
              onClick={handleHeartClick}
              className={`relative group p-8 rounded-full bg-rose-500/10 border border-rose-500/30 hover:bg-rose-500/20 transition-all cursor-pointer animate-pulse-glow
                ${isShaking ? 'animate-[shake_0.3s_ease-in-out]' : ''}
              `}
              style={isShaking ? {
                transform: `translateX(${Math.random() > 0.5 ? 10 : -10}px) rotate(${Math.random() > 0.5 ? 5 : -5}deg)`
              } : {}}
            >
              <Heart className="w-24 h-24 text-rose-500 transition-transform group-hover:scale-110" fill="currentColor" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Lock className="w-8 h-8 text-white drop-shadow-md" />
              </div>
            </button>
            
            <p className="mt-6 text-gray-400 font-light">
              {clicksCount === 0 ? "It's tightly locked..." : `Almost there! (${clicksCount}/${CLICKS_NEEDED})`}
            </p>
          </div>
        )}

        {/* State 2: Unlocked / The Question */}
        {isUnlocked && !accepted && (
          <div className="animate-[fadeIn_1s_ease-out]">
            <Unlock className="w-12 h-12 text-rose-400 mx-auto mb-6 opacity-70" />
            <h2 className="text-5xl md:text-6xl font-handwriting text-white mb-6 leading-tight">
              {name}, <br/>
              <span className="text-rose-400">Will you be my Valentine?</span>
            </h2>
            
            <div className="relative h-40 mt-12 flex justify-center items-center gap-6">
              <button 
                onClick={handleYesClick}
                className="px-10 py-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full font-bold text-xl shadow-[0_0_20px_rgba(244,63,94,0.4)] hover:shadow-[0_0_30px_rgba(244,63,94,0.6)] transform hover:scale-110 transition-all z-10"
              >
                Yes! 💖
              </button>
              
              <button
                onMouseEnter={handleNoHover}
                onClick={handleNoHover}
                style={noPosition}
                className="px-10 py-4 bg-white/10 text-white border border-white/20 rounded-full font-bold text-xl transition-all hover:bg-white/20 z-0"
              >
                No 😢
              </button>
            </div>
          </div>
        )}

        {/* State 3: Accepted */}
        {accepted && (
          <div className="animate-[fadeIn_1s_ease-out] scale-110">
            <Heart className="w-32 h-32 text-rose-500 mx-auto mb-8 animate-heartbeat" fill="currentColor" />
            <h2 className="text-5xl md:text-7xl font-handwriting text-transparent bg-clip-text bg-gradient-to-r from-rose-300 via-pink-400 to-rose-300 mb-4">
              I love you so much!
            </h2>
            <p className="text-xl text-rose-200 mt-4 font-light">
              You've made me the happiest person in the world.
            </p>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
      `}} />
    </section>
  );
}