import React, { useMemo } from 'react';

export default function Confetti() {
  const particles = useMemo(() => {
    const colors = ['bg-rose-500', 'bg-pink-400', 'bg-red-500', 'bg-white', 'bg-purple-400'];
    return Array.from({ length: 100 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 2}s`,
      animationDuration: `${Math.random() * 2 + 2}s`,
      color: colors[Math.floor(Math.random() * colors.length)],
      width: `${Math.random() * 8 + 4}px`,
      height: `${Math.random() * 16 + 8}px`,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className={`absolute top-0 opacity-0 animate-confetti ${p.color} rounded-sm`}
          style={{
            left: p.left,
            width: p.width,
            height: p.height,
            animationDelay: p.animationDelay,
            animationDuration: p.animationDuration,
          }}
        />
      ))}
    </div>
  );
}