import React, { useRef, useState, useEffect } from 'react';
import { ChevronDown, Heart } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { useTypewriter } from '../hooks/useTypewriter';

interface HeroProps {
  name: string;
}

export default function Hero({ name }: HeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(ref);
  const { displayText, isTyping } = useTypewriter(`Hey ${name}`, 100, 1000);
  
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse position between -1 and 1
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section 
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden"
    >
      {/* Background Floating Hearts with Parallax */}
      <div 
        className="absolute inset-0 pointer-events-none transition-transform duration-200 ease-out"
        style={{ transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -20}px)` }}
      >
        {[...Array(15)].map((_, i) => (
          <Heart
            key={i}
            className="absolute text-rose-500/20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 30 + 10}px`,
              height: `${Math.random() * 30 + 10}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 3 + 4}s`
            }}
            fill="currentColor"
          />
        ))}
      </div>

      <div 
        className={`transform transition-all duration-1000 delay-300 z-10 flex flex-col items-center
          ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}
        style={{ transform: `translate(${mousePos.x * 15}px, ${mousePos.y * 15}px)` }}
      >
        <p className="text-xl md:text-2xl text-rose-300 font-light tracking-wider mb-4 uppercase">
          Our Love Story
        </p>
        
        <h1 className="text-6xl md:text-8xl font-handwriting text-transparent bg-clip-text bg-gradient-to-r from-rose-300 via-pink-200 to-rose-300 mb-8 pb-4 min-h-[120px] flex items-center justify-center">
          {displayText}
          <span className={`w-1 h-12 md:h-20 bg-rose-300 ml-2 ${isTyping ? 'animate-pulse' : 'animate-bounce'}`}></span>
        </h1>
        
        <p className="text-2xl md:text-3xl font-light text-gray-300 mt-2 flex items-center gap-2">
          Scroll slowly... <Heart className="w-6 h-6 text-rose-500 inline animate-heartbeat" fill="currentColor" />
        </p>
      </div>

      <div className="absolute bottom-12 animate-bounce cursor-pointer opacity-70 hover:opacity-100 transition-opacity">
        <ChevronDown className="w-10 h-10 text-rose-400" />
      </div>
    </section>
  );
}