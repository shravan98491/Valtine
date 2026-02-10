import React, { useState, useRef } from 'react';
import { REASONS_I_LOVE_YOU } from '../constants';
import { Heart, RefreshCw } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

export default function Reasons() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(ref, { threshold: 0.2 });

  const nextReason = () => {
    if (isFlipping) return;
    
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % REASONS_I_LOVE_YOU.length);
      setIsFlipping(false);
    }, 400); // Wait for half of flip animation to change text
  };

  return (
    <section ref={ref} className="py-20 flex flex-col items-center justify-center">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-handwriting text-rose-300 mb-4">Reasons I Love You</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-rose-500 to-transparent mx-auto rounded"></div>
      </div>

      <div 
        className={`relative w-full max-w-lg transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
      >
        <div 
          onClick={nextReason}
          className={`cursor-pointer group relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-10 min-h-[300px] flex flex-col items-center justify-center text-center shadow-2xl transition-all duration-700 transform preserve-3d
            ${isFlipping ? 'scale-95 rotate-x-90 opacity-0' : 'scale-100 rotate-x-0 opacity-100 hover:shadow-rose-500/20 hover:border-white/40'}
          `}
          style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
        >
          {/* Decorative Corner Icons */}
          <Heart className="absolute top-6 left-6 text-rose-400/30 w-8 h-8 rotate-12" fill="currentColor" />
          <Heart className="absolute bottom-6 right-6 text-rose-400/30 w-8 h-8 -rotate-12" fill="currentColor" />

          <p className="text-gray-300 uppercase tracking-[0.2em] text-sm mb-6 font-semibold">Reason #{currentIndex + 1}</p>
          
          <h3 className="text-2xl md:text-3xl font-handwriting text-white leading-relaxed">
            "{REASONS_I_LOVE_YOU[currentIndex]}"
          </h3>

          <div className="mt-8 flex items-center text-rose-300 text-sm font-medium group-hover:text-rose-200 transition-colors">
            <RefreshCw className="w-4 h-4 mr-2 animate-spin-slow group-hover:animate-spin" />
            Click for another reason
          </div>
        </div>
      </div>
    </section>
  );
}