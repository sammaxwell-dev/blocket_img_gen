import React from 'react';
import { CarFront, Shirt, Gamepad2, Armchair, Watch } from 'lucide-react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  icon: React.ReactNode;
  title: string;
  hoverText?: string;
}

const Card = ({ 
  children, 
  className = "", 
  icon, 
  title, 
  hoverText = "ENHANCE"
}: CardProps) => (
  <div 
    className={`relative group overflow-hidden border-2 border-charcoal bg-white p-6 transition-all duration-300 hover:shadow-[8px_8px_0px_0px_#FF4F00] ${className}`}
    data-cursor={hoverText}
  >
    <div className="absolute top-6 left-6 z-10 flex items-center gap-2 bg-white/90 backdrop-blur px-3 py-1 border border-charcoal/20">
      {icon}
      <span className="font-mono text-xs font-bold uppercase">{title}</span>
    </div>
    
    <div className="w-full h-full transition-transform duration-500 ease-out group-hover:scale-105">
      {children}
    </div>

    {/* Hover Overlay */}
    <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/5 transition-colors duration-300 pointer-events-none" />
  </div>
);

export const BentoGrid: React.FC = () => {
  return (
    <section className="px-6 md:px-12 lg:px-24 py-24 bg-alabaster">
      <div className="mb-12 flex justify-between items-end">
        <h2 className="text-5xl font-black max-w-lg">WORKS ON <br/> EVERYTHING.</h2>
        <span className="hidden md:block font-mono text-sm text-charcoal/60 text-right">
          FROM VINTAGE FINDS <br/> TO LUXURY CARS.
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[300px]">
        {/* Large Item - Car */}
        <Card 
          className="md:col-span-2 md:row-span-2" 
          icon={<CarFront className="w-4 h-4"/>} 
          title="Vehicles"
        >
          <img src="https://picsum.photos/seed/car_vintage/800/800" className="w-full h-full object-cover" alt="Car" />
        </Card>

        {/* Tall Item - Dress */}
        <Card 
          className="md:col-span-1 md:row-span-2" 
          icon={<Shirt className="w-4 h-4"/>} 
          title="Fashion"
        >
           <img src="https://picsum.photos/seed/fashion_dress/400/800" className="w-full h-full object-cover" alt="Fashion" />
        </Card>

        {/* Wide Item - Furniture */}
        <Card 
          className="md:col-span-1 md:row-span-1" 
          icon={<Armchair className="w-4 h-4"/>} 
          title="Furniture"
        >
           <img src="https://picsum.photos/seed/chair_modern/400/400" className="w-full h-full object-cover" alt="Chair" />
        </Card>

        {/* Standard Item - Tech */}
        <Card 
          className="md:col-span-1 md:row-span-1" 
          icon={<Gamepad2 className="w-4 h-4"/>} 
          title="Electronics"
        >
           <img src="https://picsum.photos/seed/tech_gamepad/400/400" className="w-full h-full object-cover" alt="Gamepad" />
        </Card>
        
        {/* Standard Item - Accessories */}
        <Card 
          className="md:col-span-1 md:row-span-1" 
          icon={<Watch className="w-4 h-4"/>} 
          title="Accessories"
        >
           <img src="https://picsum.photos/seed/watch_lux/400/400" className="w-full h-full object-cover" alt="Watch" />
        </Card>

      </div>
    </section>
  );
};