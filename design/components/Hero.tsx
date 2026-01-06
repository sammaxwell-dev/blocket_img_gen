import React, { useState, useEffect } from 'react';
import { UploadCloud, ScanLine } from 'lucide-react';
import { Button } from './ui/Button';

export const Hero: React.FC = () => {
  const [scanned, setScanned] = useState(false);
  const [price, setPrice] = useState(500);

  // Animation Loop
  useEffect(() => {
    const interval = setInterval(() => {
      setScanned(prev => !prev);
    }, 4000); // Toggle every 4 seconds
    return () => clearInterval(interval);
  }, []);

  // Animate Price
  useEffect(() => {
    if (scanned) {
      let start = 500;
      const end = 850;
      const duration = 1000;
      const stepTime = 50;
      const steps = duration / stepTime;
      const increment = (end - start) / steps;
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setPrice(end);
          clearInterval(timer);
        } else {
          setPrice(Math.floor(start));
        }
      }, stepTime);
      return () => clearInterval(timer);
    } else {
      setPrice(500);
    }
  }, [scanned]);

  return (
    <section className="relative min-h-screen w-full flex flex-col pt-24 pb-12 px-6 md:px-12 lg:px-24 border-b-2 border-charcoal overflow-hidden">
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left: Text Content */}
        <div className="lg:col-span-7 flex flex-col items-start z-10">
          <h1 className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter mb-8">
            YOUR ITEMS <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-intl-orange to-intl-orange bg-[length:0%_100%] hover:bg-[length:100%_100%] transition-all duration-500 underline decoration-4 decoration-charcoal decoration-skip-ink-none">
              ARE WORTH
            </span> <br/>
            MORE.
          </h1>
          <p className="font-mono text-lg md:text-xl text-charcoal/80 max-w-xl mb-10 leading-relaxed border-l-2 border-intl-orange pl-6">
            Transform ordinary phone snaps into buyer magnets for Blocket & Tradera. 
            One click. Professional studio lighting. Instant profit.
          </p>
          <div className="flex flex-col sm:flex-row gap-6">
            <Button icon={<UploadCloud className="w-5 h-5 stroke-[2.5px]" />}>
              Upload Photo
            </Button>
            <div className="flex items-center gap-2 font-mono text-sm text-charcoal/60">
              <ScanLine className="w-4 h-4" />
              <span>AI Auto-Enhance Active</span>
            </div>
          </div>
        </div>

        {/* Right: Visual Interactive Scanner */}
        <div className="lg:col-span-5 relative w-full aspect-[4/5] md:aspect-square lg:aspect-[4/5] max-h-[70vh]">
          {/* Main Frame */}
          <div className="absolute inset-0 bg-white border-2 border-charcoal shadow-[8px_8px_0px_0px_#1A1A1A] overflow-hidden group">
            
            {/* Image Container */}
            <div className="relative w-full h-full">
              {/* Bad Image (Underneath) */}
              <img 
                src="https://picsum.photos/seed/shoes_bad/800/1000" 
                alt="Before" 
                className="absolute inset-0 w-full h-full object-cover filter brightness-75 sepia-[0.3] blur-[1px] grayscale-[0.5]"
              />

              {/* Good Image (Revealed by clip-path) */}
              <div 
                className="absolute inset-0 overflow-hidden transition-[clip-path] duration-[2000ms] ease-in-out"
                style={{
                  clipPath: scanned ? 'inset(0 0 0 0)' : 'inset(0 0 100% 0)'
                }}
              >
                <img 
                  src="https://picsum.photos/seed/shoes_bad/800/1000" 
                  alt="After" 
                  className="w-full h-full object-cover filter brightness-110 contrast-110 saturate-110"
                />
              </div>

              {/* The Scanning Beam */}
              <div 
                className="absolute left-0 right-0 h-1 bg-intl-orange shadow-[0_0_20px_4px_rgba(255,79,0,0.6)] z-20 transition-all duration-[2000ms] ease-in-out"
                style={{
                  top: scanned ? '100%' : '0%',
                  opacity: scanned ? 0 : 1 // Hide when done, reappear on reset
                }}
              />
              
              {/* Scan Text Overlay */}
               <div 
                className="absolute top-4 left-4 font-mono text-xs bg-black/80 text-white px-2 py-1 uppercase tracking-widest transition-opacity duration-300"
                style={{ opacity: scanned ? 0 : 1 }}
              >
                Analyzing...
              </div>

            </div>
          </div>

          {/* Floating Price Tag */}
          <div className="absolute -right-4 top-12 z-30">
            <div className={`
              relative px-6 py-3 font-mono font-bold text-2xl border-2 border-charcoal shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]
              transition-colors duration-500
              ${scanned ? 'bg-intl-orange text-white' : 'bg-white text-charcoal'}
            `}>
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 w-2 h-6 bg-charcoal/20 rotate-12 rounded-sm"></span>
              {price} KR
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};