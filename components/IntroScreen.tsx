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
      <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl max-w-md w-full mx-4 text-center transform transition-transform hover:scale-105 duration-500">
        <Heart className="w-12 h-12 text-rose-500 mx-auto mb-6 animate-heartbeat" fill="currentColor" />
        <h1 className="text-3xl font-handwriting text-rose-100 mb-2">A Special Surprise For...</h1>
        <p className="text-gray-400 text-sm mb-6">Enter your beautiful name to begin</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-center text-white placeholder-gray-400 focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400 transition-all"
            required
            autoFocus
          />
          <button
            type="submit"
            disabled={!name.trim()}
            className="w-full py-3 px-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-xl font-medium shadow-lg hover:shadow-rose-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-1"
          >
            Open My Heart
          </button>
        </form>
      </div>
    </div>
  );
}