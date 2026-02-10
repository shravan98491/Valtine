import React, { useState, useRef, useEffect } from 'react';
import { REASONS_I_LOVE_YOU } from '../constants';
import { Heart, RefreshCw, TerminalSquare } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

export default function Reasons() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState(REASONS_I_LOVE_YOU[0]);
  const [isDecoding, setIsDecoding] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(ref, { threshold: 0.2 });

  const chars = '!<>-_\\/[]{}—=+*^?#________';

  const nextReason = () => {
    if (isDecoding) return;
    
    setIsDecoding(true);
    const nextIdx = (currentIndex + 1) % REASONS_I_LOVE_YOU.length;
    setCurrentIndex(nextIdx);
    
    const targetText = REASONS_I_LOVE_YOU[nextIdx];
    let iteration = 0;
    
    const interval = setInterval(() => {
      setDisplayText(
        targetText
          .split('')
          .map((letter, index) => {
            if (index < iteration) return targetText[index]; // Reveal correct char
            return chars[Math.floor(Math.random() * chars.length)]; // Scrambled char
          })
          .join('')
      );
      
      if (iteration >= targetText.length) {
        clearInterval(interval);
        setIsDecoding(false);
      }
      
      iteration += 1 / 2; // Adjust speed of decoding here
    }, 20);
  };

  return (
    <section ref={ref} className="py-20 flex flex-col items-center justify-center">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-handwriting text-rose-300 mb-4 flex items-center justify-center gap-3">
          <TerminalSquare className="w-8 h-8 opacity-50" />
          Reasons I Love You
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-rose-500 to-transparent mx-auto rounded"></div>
      </div>

      <div 
        className={`relative w-full max-w-lg transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
      >
        <div 
          onClick={nextReason}
          className={`cursor-pointer group relative bg-night-800/80 backdrop-blur-xl border border-white/10 rounded-3xl p-10 min-h-[300px] flex flex-col items-center justify-center text-center shadow-2xl transition-all duration-500 hover:shadow-rose-500/20 hover:border-rose-500/30 overflow-hidden`}
        >
          {/* Tech/Cyber decoration */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-500/0 via-rose-500 to-rose-500/0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          
          <Heart className="absolute top-6 left-6 text-rose-400/20 w-8 h-8 rotate-12 transition-transform group-hover:scale-110" fill="currentColor" />
          <Heart className="absolute bottom-6 right-6 text-rose-400/20 w-8 h-8 -rotate-12 transition-transform group-hover:scale-110" fill="currentColor" />

          <div className="flex items-center gap-2 text-rose-400/80 uppercase tracking-[0.2em] text-xs font-mono mb-6 bg-rose-500/10 px-3 py-1 rounded-full">
            <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse"></span>
            Reason.exe [{currentIndex + 1}/{REASONS_I_LOVE_YOU.length}]
          </div>
          
          <h3 className={`text-2xl md:text-3xl leading-relaxed min-h-[100px] flex items-center
            ${isDecoding ? 'font-mono text-rose-300/80 text-xl' : 'font-handwriting text-white'}
          `}>
            "{displayText}"
          </h3>

          <div className="mt-8 flex items-center text-gray-500 text-xs font-mono group-hover:text-rose-300 transition-colors">
            <RefreshCw className={`w-3 h-3 mr-2 ${isDecoding ? 'animate-spin text-rose-400' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
            {isDecoding ? 'DECODING...' : 'CLICK TO REFRESH CACHE'}
          </div>
        </div>
      </div>
    </section>
  );
}