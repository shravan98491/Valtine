import React, { useRef } from 'react';
import { ChevronDown, Heart } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface HeroProps {
  name: string;
}

export default function Hero({ name }: HeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(ref);

  return (
    <section 
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-4"
    >
      {/* Background Floating Hearts */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
        className={`transform transition-all duration-1000 delay-300 z-10 
          ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}
      >
        <p className="text-xl md:text-2xl text-rose-300 font-light tracking-wider mb-4 uppercase">
          Our Love Story
        </p>
        <h1 className="text-6xl md:text-8xl font-handwriting text-transparent bg-clip-text bg-gradient-to-r from-rose-300 via-pink-200 to-rose-300 mb-8 pb-4">
          Hey {name}
        </h1>
        <p className="text-2xl md:text-3xl font-light text-gray-300 mt-2">
          Scroll slowly... ❤️
        </p>
      </div>

      <div className="absolute bottom-12 animate-bounce cursor-pointer opacity-70 hover:opacity-100 transition-opacity">
        <ChevronDown className="w-10 h-10 text-rose-400" />
      </div>
    </section>
  );
}