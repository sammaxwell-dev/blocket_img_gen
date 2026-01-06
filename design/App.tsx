import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { StickyFeatures } from './components/StickyFeatures';
import { BentoGrid } from './components/BentoGrid';
import { Comparison } from './components/Comparison';
import { Footer } from './components/Footer';
import { Cursor } from './components/ui/Cursor';

function App() {
  return (
    <div className="min-h-screen bg-alabaster text-charcoal font-sans selection:bg-intl-orange selection:text-white">
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <StickyFeatures />
        <BentoGrid />
        <Comparison />
      </main>
      <Footer />
    </div>
  );
}

export default App;