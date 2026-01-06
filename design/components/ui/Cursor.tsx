import React, { useEffect, useState } from 'react';

export const Cursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hoverText, setHoverText] = useState<string | null>(null);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      // Check if hovering over an element with data-cursor attribute
      const cursorText = target.closest('[data-cursor]')?.getAttribute('data-cursor');
      setHoverText(cursorText || null);
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <div 
      className={`custom-cursor ${hoverText ? 'hovered' : ''}`}
      style={{ left: position.x, top: position.y }}
      data-text={hoverText}
    />
  );
};