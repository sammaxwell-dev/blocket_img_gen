import React from 'react';

const REVIEWS = [
  "VOLVO V60 • SOLD IN 2 DAYS",
  "IKEA SOFA • +30 CLICKS VS AVG",
  "VINTAGE JACKET • SOLD OVER ASKING",
  "MACBOOK PRO • 15 MESSAGES IN 1 HOUR",
  "LEATHER BOOTS • SOLD INSTANTLY",
  "PLAYSTATION 5 • BUYER WAR STARTED",
];

export const Marquee: React.FC = () => {
  return (
    <div className="w-full bg-charcoal text-alabaster py-4 border-b-2 border-charcoal overflow-hidden whitespace-nowrap flex">
      <div className="animate-marquee flex gap-12 items-center">
        {[...REVIEWS, ...REVIEWS, ...REVIEWS].map((text, i) => (
          <span key={i} className="font-mono text-sm uppercase tracking-widest flex items-center gap-4">
            {text}
            <span className="w-2 h-2 bg-intl-orange rounded-full block"></span>
          </span>
        ))}
      </div>
       {/* Duplicate for seamless loop */}
      <div className="animate-marquee flex gap-12 items-center ml-12" aria-hidden="true">
        {[...REVIEWS, ...REVIEWS, ...REVIEWS].map((text, i) => (
          <span key={i} className="font-mono text-sm uppercase tracking-widest flex items-center gap-4">
            {text}
            <span className="w-2 h-2 bg-intl-orange rounded-full block"></span>
          </span>
        ))}
      </div>
      <style>{`
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
};