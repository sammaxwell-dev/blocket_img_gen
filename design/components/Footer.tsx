import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Button } from './ui/Button';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-charcoal text-alabaster pt-24 pb-12 px-6 md:px-12 lg:px-24">
      <div className="flex flex-col items-start max-w-4xl">
        <h2 className="text-6xl md:text-8xl font-black mb-8 leading-[0.85] tracking-tighter">
          READY TO <br/>
          SELL OUT?
        </h2>
        <p className="font-mono text-gray-400 max-w-xl mb-12 text-lg">
          Join 15,000+ sellers earning 30% more per item. 
          First 5 photos are free. No credit card required.
        </p>
        
        <Button className="bg-intl-orange text-white border-alabaster shadow-[4px_4px_0px_0px_#F9F9F7] hover:bg-white hover:text-intl-orange w-full sm:w-auto text-xl py-6">
          Start Selling Now <ArrowUpRight className="ml-2 w-6 h-6" />
        </Button>
      </div>

      <div className="mt-32 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 font-mono text-xs text-gray-500 uppercase">
        <div className="flex gap-8">
          <a href="#" className="hover:text-intl-orange transition-colors">Pricing</a>
          <a href="#" className="hover:text-intl-orange transition-colors">How it works</a>
          <a href="#" className="hover:text-intl-orange transition-colors">Login</a>
        </div>
        <div>
          © 2024 SellMore AI. Stockholm, Sweden.
        </div>
      </div>
    </footer>
  );
};