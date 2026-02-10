import React, { useMemo } from 'react';

export default function StarryBackground() {
  const stars = useMemo(() => {
    return Array.from({ length: 70 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 3 + 1,
      animationDelay: `${Math.random() * 5}s`,
      opacity: Math.random() * 0.5 + 0.3
    }));
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-gradient-to-b from-night-900 via-night-800 to-night-900">
      {/* Stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white animate-twinkle"
          style={{
            top: star.top,
            left: star.left,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: star.animationDelay,
            opacity: star.opacity
          }}
        />
      ))}
      
      {/* Soft floating glow orbs representing nebulas/magic */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-rose-500/10 rounded-full blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
    </div>
  );
}