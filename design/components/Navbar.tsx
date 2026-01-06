import React from 'react';
import { Button } from './ui/Button';

export const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-alabaster/80 backdrop-blur-md border-b-2 border-charcoal px-6 py-4 flex justify-between items-center">
      <div className="font-black text-2xl tracking-tighter text-charcoal">
        SELL<span className="text-intl-orange">MORE</span>.
      </div>
      
      <div className="hidden md:flex gap-8 font-mono text-sm font-bold uppercase items-center">
        <a href="#" className="hover:text-intl-orange transition-colors">Features</a>
        <a href="#" className="hover:text-intl-orange transition-colors">Pricing</a>
        <a href="#" className="hover:text-intl-orange transition-colors">Login</a>
      </div>

      <Button className="px-6 py-2 text-xs hidden sm:flex">
        Get Started
      </Button>
    </nav>
  );
};