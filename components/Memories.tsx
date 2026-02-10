import React, { useRef, useState } from 'react';
import { MEMORIES as INITIAL_MEMORIES } from '../constants';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { Camera } from 'lucide-react';

export default function Memories() {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(ref, { threshold: 0.1 });
  
  // State to hold dynamic memories
  const [memories, setMemories] = useState(INITIAL_MEMORIES);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeId, setActiveId] = useState<number | null>(null);

  const handleImageClick = (id: number) => {
    setActiveId(id);
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && activeId !== null) {
      const imageUrl = URL.createObjectURL(file);
      setMemories(prev => 
        prev.map(m => m.id === activeId ? { ...m, imageUrl } : m)
      );
    }
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setActiveId(null);
  };

  const handleCaptionChange = (id: number, newCaption: string) => {
    setMemories(prev => 
      prev.map(m => m.id === id ? { ...m, caption: newCaption } : m)
    );
  };

  return (
    <section ref={ref} className="py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-handwriting text-rose-300 mb-4">Favorite Memories</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-rose-500 to-transparent mx-auto rounded"></div>
        <p className="text-rose-200/60 mt-4 text-sm font-light">
          (Click any photo to add your own, and click the text to edit the caption)
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 place-items-center relative">
        {/* Hidden file input for handling image uploads */}
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          accept="image/*" 
          className="hidden" 
        />

        {memories.map((memory, index) => {
          // Pre-calculate rotations for that messy scattered desk look
          const rotations = ['-rotate-3', 'rotate-2', '-rotate-2'];
          const translationYs = ['translate-y-4', '-translate-y-2', 'translate-y-6'];
          
          return (
            <div 
              key={memory.id}
              className={`w-72 bg-white p-4 pb-12 rounded shadow-2xl transition-all duration-700 hover:z-20 transform hover:-rotate-0 hover:scale-105 hover:shadow-rose-500/30
                ${rotations[index % rotations.length]}
                ${translationYs[index % translationYs.length]}
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-24'}`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {/* Image Container */}
              <div 
                className="w-full aspect-[4/5] overflow-hidden rounded bg-gray-200 relative group cursor-pointer"
                onClick={() => handleImageClick(memory.id)}
              >
                <img 
                  src={memory.imageUrl} 
                  alt={memory.caption}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="flex flex-col items-center text-white">
                    <Camera className="w-8 h-8 mb-2 drop-shadow-md" />
                    <span className="text-sm font-medium drop-shadow-md">Click to change</span>
                  </div>
                </div>
              </div>

              {/* Editable Caption */}
              <input 
                type="text"
                value={memory.caption}
                onChange={(e) => handleCaptionChange(memory.id, e.target.value)}
                placeholder="Write a memory..."
                className="w-full bg-transparent text-gray-800 font-handwriting text-2xl text-center mt-6 px-2 focus:outline-none focus:ring-1 focus:ring-rose-300/50 rounded border-b border-transparent hover:border-gray-200 transition-colors"
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}