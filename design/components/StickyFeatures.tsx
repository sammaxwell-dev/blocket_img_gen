import React, { useState, useEffect, useRef } from 'react';
import { Lamp, Scissors, Crop } from 'lucide-react';

const FEATURES = [
  {
    id: 'lighting',
    title: "Studio Lighting AI",
    desc: "We virtually relight your object. No expensive softboxes needed. Shadows are recalculated to look natural and expensive.",
    icon: <Lamp className="w-8 h-8 mb-4 stroke-[1.5px]" />,
    img: "https://picsum.photos/seed/couch_dark/800/600",
  },
  {
    id: 'background',
    title: "No Fake Backgrounds",
    desc: "We don't just cut it out. We clean the room. Socks on the floor? Gone. Messy cables? Vanished. Blur added for depth.",
    icon: <Scissors className="w-8 h-8 mb-4 stroke-[1.5px]" />,
    img: "https://picsum.photos/seed/couch_clean/800/600",
  },
  {
    id: 'framing',
    title: "Smart Framing",
    desc: "Auto-crop specifically optimized for Blocket thumbnails and Instagram Marketplace ratios.",
    icon: <Crop className="w-8 h-8 mb-4 stroke-[1.5px]" />,
    img: "https://picsum.photos/seed/couch_framed/800/600",
  }
];

export const StickyFeatures: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const { top, height } = sectionRef.current.getBoundingClientRect();
      const scrollY = -top;
      const stepHeight = window.innerHeight * 0.8; // Approximate height of one step interaction

      if (scrollY < stepHeight) setActiveStep(0);
      else if (scrollY < stepHeight * 2) setActiveStep(1);
      else setActiveStep(2);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full px-6 md:px-12 lg:px-24 py-24 border-b-2 border-charcoal bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 h-[300vh] lg:h-[250vh]">
        
        {/* Left: Sticky Text */}
        <div className="hidden lg:block relative h-full">
          <div className="sticky top-24 flex flex-col justify-center h-[calc(100vh-6rem)]">
            <h2 className="text-sm font-mono uppercase tracking-widest text-charcoal/50 mb-8">Feature Breakdown</h2>
            <div className="space-y-12">
              {FEATURES.map((feature, idx) => (
                <div 
                  key={feature.id}
                  className={`transition-all duration-500 ${activeStep === idx ? 'opacity-100 translate-x-0' : 'opacity-20 translate-x-4'}`}
                >
                  <div className="text-intl-orange">{feature.icon}</div>
                  <h3 className="text-4xl font-bold mb-4">{feature.title}</h3>
                  <p className="font-mono text-charcoal/80 max-w-md">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Scrolling Visuals */}
        <div className="flex flex-col gap-[50vh] pt-[20vh]">
          {FEATURES.map((feature, idx) => (
            <div key={feature.id} className="relative w-full aspect-[4/3] border-2 border-charcoal bg-alabaster p-4 shadow-[8px_8px_0px_0px_#1A1A1A]">
              {/* Mobile Text (Only visible on small screens) */}
              <div className="lg:hidden mb-4">
                 <div className="text-intl-orange mb-2">{feature.icon}</div>
                 <h3 className="text-2xl font-bold">{feature.title}</h3>
                 <p className="font-mono text-sm mt-2">{feature.desc}</p>
              </div>

              <div className="w-full h-full relative overflow-hidden bg-gray-200 group">
                 <img 
                   src={feature.img} 
                   alt={feature.title}
                   className={`w-full h-full object-cover transition-transform duration-700 ${activeStep === idx ? 'scale-100' : 'scale-110 grayscale'}`} 
                 />
                 {activeStep === idx && (
                   <div className="absolute inset-0 bg-intl-orange/10 mix-blend-multiply pointer-events-none" />
                 )}
                 <div className="absolute bottom-4 right-4 bg-white border border-charcoal px-2 py-1 font-mono text-xs uppercase">
                   Step 0{idx + 1}
                 </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};