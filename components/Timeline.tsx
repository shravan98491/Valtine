import React, { useRef } from 'react';
import { TIMELINE_EVENTS } from '../constants';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { Sparkles, Coffee, Heart, Star } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  sparkles: <Sparkles className="w-5 h-5" />,
  coffee: <Coffee className="w-5 h-5" />,
  heart: <Heart className="w-5 h-5" fill="currentColor" />,
  star: <Star className="w-5 h-5" fill="currentColor" />
};

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isContainerVisible = useIntersectionObserver(containerRef, { threshold: 0.05 });

  return (
    <section ref={containerRef} className="relative py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-handwriting text-rose-300 mb-4">How It Started</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-rose-500 to-transparent mx-auto rounded"></div>
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Animated Central SVG Line */}
        <div className="absolute left-[20px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-1 bg-white/10 rounded-full overflow-hidden">
          <div 
            className={`w-full bg-gradient-to-b from-rose-500 via-pink-400 to-rose-500 origin-top transform transition-all duration-[2s] ease-in-out
              ${isContainerVisible ? 'scale-y-100' : 'scale-y-0'}`}
            style={{ height: '100%' }}
          ></div>
        </div>

        <div className="space-y-24">
          {TIMELINE_EVENTS.map((event, index) => {
            const isEven = index % 2 === 0;
            return <TimelineItem key={index} event={event} isEven={isEven} index={index} />;
          })}
        </div>
      </div>
    </section>
  );
}

interface TimelineItemProps {
  key?: React.Key;
  event: typeof TIMELINE_EVENTS[0];
  isEven: boolean;
  index: number;
}

function TimelineItem({ event, isEven, index }: TimelineItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(ref, { threshold: 0.2 });

  return (
    <div 
      ref={ref}
      className={`relative flex flex-col md:flex-row items-start md:items-center ${isEven ? 'md:flex-row-reverse' : ''}`}
    >
      {/* Icon Node */}
      <div className={`absolute left-0 md:left-1/2 -translate-x-[6px] md:-translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full bg-night-900 border-4 border-rose-500 text-rose-400 z-10 transition-all duration-700 delay-300
        ${isVisible ? 'scale-100 rotate-0 opacity-100' : 'scale-0 rotate-180 opacity-0'}`}
      >
        {iconMap[event.icon]}
      </div>

      {/* Content Container */}
      <div className={`ml-16 md:ml-0 md:w-1/2 ${isEven ? 'md:pl-16' : 'md:pr-16 text-left md:text-right'}`}>
        <div 
          className={`p-6 bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl shadow-xl transition-all duration-700 ease-out hover:bg-white/10 hover:-translate-y-1 hover:shadow-rose-500/20
            ${isVisible ? 'opacity-100 translate-x-0' : `opacity-0 ${isEven ? 'translate-x-16' : '-translate-x-16'}`}`}
        >
          <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold tracking-wider text-rose-300 uppercase bg-rose-500/20 rounded-full">
            {event.year}
          </span>
          <h3 className="text-2xl font-bold text-white mb-2 font-sans">{event.title}</h3>
          <p className="text-gray-300 leading-relaxed font-light">{event.description}</p>
        </div>
      </div>
    </div>
  );
}