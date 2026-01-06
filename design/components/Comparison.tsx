import React from 'react';
import { Heart, MousePointer2 } from 'lucide-react';

export const Comparison: React.FC = () => {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-white border-y-2 border-charcoal overflow-hidden">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-black mb-4">THE BATTLE OF ADS</h2>
        <p className="font-mono text-charcoal/60">WHICH ONE WOULD YOU CLICK?</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 md:gap-4 items-center justify-center max-w-6xl mx-auto">
        
        {/* Loser Ad */}
        <div className="w-full max-w-sm opacity-50 hover:opacity-100 transition-opacity duration-300 grayscale">
          <div className="bg-[#f2f2f2] p-4 rounded-sm border border-gray-300">
            <div className="aspect-[4/3] bg-gray-300 mb-4 overflow-hidden relative">
              <img 
                src="https://picsum.photos/seed/bike_dark/600/450" 
                className="w-full h-full object-cover filter brightness-75 blur-[0.5px]" 
                alt="Bad Ad" 
              />
            </div>
            <div className="h-4 w-3/4 bg-gray-300 mb-2"></div>
            <div className="h-4 w-1/4 bg-gray-300"></div>
            <div className="mt-4 flex justify-between text-xs font-mono text-gray-500">
              <span>2 days ago</span>
              <span>0 likes</span>
            </div>
          </div>
          <p className="text-center font-mono text-xs mt-4 uppercase text-red-500 line-through">Unsold after 2 weeks</p>
        </div>

        <div className="text-2xl font-black text-intl-orange z-10">VS</div>

        {/* Winner Ad */}
        <div className="w-full max-w-sm relative group">
          {/* Floating Interaction Elements */}
          <div className="absolute -top-6 -right-6 z-20 flex flex-col gap-2 animate-bounce">
            <div className="bg-intl-orange text-white px-3 py-1 font-mono text-xs font-bold shadow-[2px_2px_0px_0px_#1A1A1A]">
              +450% CLICKS
            </div>
          </div>

          <div className="bg-white p-4 rounded-sm border-2 border-intl-orange shadow-[12px_12px_0px_0px_rgba(255,79,0,0.15)] transform transition-transform hover:-translate-y-1">
            <div className="aspect-[4/3] bg-gray-100 mb-4 overflow-hidden relative">
              <img 
                src="https://picsum.photos/seed/bike_dark/600/450" 
                className="w-full h-full object-cover filter contrast-125 brightness-110 saturate-110" 
                alt="Good Ad" 
              />
              <div className="absolute top-2 right-2 bg-sage-green text-white px-2 py-0.5 text-xs font-bold uppercase rounded-full">
                Sold
              </div>
            </div>
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-lg leading-tight">Vintage Racing Bike<br/>Restored Condition</h3>
              <span className="font-mono font-bold text-intl-orange">3.500 kr</span>
            </div>
            <div className="flex items-center gap-4 mt-4 text-charcoal/80">
              <div className="flex items-center gap-1">
                <Heart className="w-4 h-4 fill-intl-orange text-intl-orange" />
                <span className="text-xs font-mono font-bold">142</span>
              </div>
              <div className="flex items-center gap-1">
                <MousePointer2 className="w-4 h-4" />
                <span className="text-xs font-mono font-bold">85 views</span>
              </div>
            </div>
          </div>
          
          {/* Simulated Cursors */}
          <MousePointer2 className="absolute -bottom-4 -right-4 w-8 h-8 fill-black text-white drop-shadow-lg z-30" />
          <MousePointer2 className="absolute top-1/2 -left-8 w-8 h-8 fill-black text-white drop-shadow-lg z-30 transform rotate-12" />
        </div>

      </div>
    </section>
  );
};