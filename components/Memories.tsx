import React, { useRef, useState } from 'react';
import { MEMORIES as INITIAL_MEMORIES } from '../constants';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { Camera } from 'lucide-react';

export default function Memories() {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(ref, { threshold: 0.1 });
  
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
        <p className="text-rose-200/60 mt-4 text-sm font-light font-mono">
          /* click image to patch, edit text to commit */
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 place-items-center relative perspective-[1000px]">
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          accept="image/*" 
          className="hidden" 
        />

        {memories.map((memory, index) => (
          <MemoryCard 
            key={memory.id}
            memory={memory}
            index={index}
            isVisible={isVisible}
            onImageClick={() => handleImageClick(memory.id)}
            onCaptionChange={(val) => handleCaptionChange(memory.id, val)}
          />
        ))}
      </div>
    </section>
  );
}

interface MemoryCardProps {
  memory: {
    id: number;
    imageUrl: string;
    caption: string;
  };
  index: number;
  isVisible: boolean;
  onImageClick: () => void;
  onCaptionChange: (val: string) => void;
}

// Extracted Component for individual 3D tracking
function MemoryCard({ memory, index, isVisible, onImageClick, onCaptionChange }: MemoryCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const rotations = ['-rotate-3', 'rotate-2', '-rotate-2'];
  const translationYs = ['translate-y-4', '-translate-y-2', 'translate-y-6'];
  const baseRotation = rotations[index % rotations.length];
  const baseY = translationYs[index % translationYs.length];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    // Calculate mouse position relative to card center (-0.5 to 0.5)
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    // Tilt multiplier (adjust for more/less dramatic effect)
    setTilt({ x: x * 20, y: -y * 20 });
  };

  const handleMouseEnter = () => setIsHovering(true);
  
  const handleMouseLeave = () => {
    setIsHovering(false);
    setTilt({ x: 0, y: 0 }); // Reset tilt
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`w-72 bg-white p-4 pb-12 rounded shadow-2xl transition-all duration-300 hover:z-20
        ${!isHovering ? `${baseRotation} ${baseY}` : ''}
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-24'}`}
      style={{ 
        transitionDelay: isHovering ? '0ms' : `${index * 200}ms`,
        transform: isHovering 
          ? `perspective(1000px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) scale3d(1.05, 1.05, 1.05)` 
          : undefined
      }}
    >
      <div 
        className="w-full aspect-[4/5] overflow-hidden rounded bg-gray-200 relative group cursor-pointer"
        onClick={onImageClick}
      >
        <img 
          src={memory.imageUrl} 
          alt={memory.caption}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
          <div className="flex flex-col items-center text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <Camera className="w-8 h-8 mb-2 drop-shadow-md text-rose-300" />
            <span className="text-sm font-mono drop-shadow-md">upload_img()</span>
          </div>
        </div>
      </div>

      <input 
        type="text"
        value={memory.caption}
        onChange={(e) => onCaptionChange(e.target.value)}
        placeholder="Write a memory..."
        className="w-full bg-transparent text-gray-800 font-handwriting text-2xl text-center mt-6 px-2 focus:outline-none focus:ring-1 focus:ring-rose-300/50 rounded border-b border-transparent hover:border-gray-200 transition-colors"
      />
    </div>
  );
}