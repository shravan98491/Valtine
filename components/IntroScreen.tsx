import React, { useState } from 'react';
import { Heart } from 'lucide-react';

interface IntroScreenProps {
  onStart: (name: string) => void;
}

export default function IntroScreen({ onStart }: IntroScreenProps) {
  const [name, setName] = useState('');
  const [isFadingOut, setIsFadingOut] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      setIsFadingOut(true);
      setTimeout(() => {
        onStart(name.trim());
      }, 800);
    }
  };

  return (
    <div 
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-opacity duration-700 bg-night-900/80 backdrop-blur-sm
        ${isFadingOut ? 'opacity-0' : 'opacity-100'}`}
    >
      <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl max-w-md w-full mx-4 text-center transform transition-transform hover:scale-105 duration-500 relative overflow-hidden">
        
        {/* Little terminal decoration */}
        <div className="absolute top-3 left-4 flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
        </div>
        
        <div className="flex justify-center mb-6 mt-4 relative">
          <Heart className="w-12 h-12 text-rose-500 animate-heartbeat absolute opacity-20 blur-sm" fill="currentColor" />
          <Heart className="w-12 h-12 text-rose-500 animate-heartbeat relative z-10" fill="currentColor" />
        </div>
        
        <h1 className="text-3xl font-handwriting text-rose-100 mb-6">A Special Surprise For...</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your beautiful name"
            className="w-full px-4 py-3 bg-night-800/50 border border-white/20 rounded-xl text-center text-white placeholder-gray-500 focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400 transition-all font-mono"
            required
            autoFocus
          />
          <button
            type="submit"
            disabled={!name.trim()}
            className="w-full py-3 px-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-xl font-medium shadow-lg hover:shadow-rose-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-1 relative overflow-hidden group"
          >
            <span className="relative z-10">Compile & Open My Heart</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
          </button>
        </form>
      </div>
    </div>
  );
}