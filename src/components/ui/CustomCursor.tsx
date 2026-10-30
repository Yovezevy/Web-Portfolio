import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [cursorText, setCursorText] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const cursorRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -100, y: -100, targetX: -100, targetY: -100 });

  useEffect(() => {
    // Detect if device supports touch only
    if (window.matchMedia('(pointer: coarse)').matches && !window.matchMedia('(pointer: fine)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      posRef.current.targetX = e.clientX;
      posRef.current.targetY = e.clientY;
      setIsVisible(true);

      // Check hovered element
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('a, button, input, textarea, select, [role="button"], .cursor-pointer');
      setIsPointer(!!interactive);

      const customBadge = target.closest('[data-cursor]') as HTMLElement | null;
      if (customBadge) {
        setCursorText(customBadge.getAttribute('data-cursor'));
      } else {
        setCursorText(null);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Smooth animation loop for physics lerping
    let rafId: number;
    const animate = () => {
      const pos = posRef.current;
      pos.x += (pos.targetX - pos.x) * 0.22;
      pos.y += (pos.targetY - pos.y) * 0.22;

      setPosition({ x: pos.x, y: pos.y });
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 pointer-events-none z-50 transition-opacity duration-300 font-mono ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
      }}
    >
      {/* Immediate Tracking Center Dot */}
      <div
        className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full transition-transform duration-150 ${
          cursorText
            ? 'w-16 h-16 bg-[#f2f2ee] text-[#050505] flex items-center justify-center text-[10px] font-bold tracking-widest uppercase shadow-2xl scale-100'
            : isPointer
            ? 'w-10 h-10 border border-emerald-400 bg-emerald-400/20 backdrop-blur-xs scale-100'
            : 'w-2 h-2 bg-emerald-400 scale-100'
        }`}
      >
        {cursorText && (
          <span className="animate-in fade-in zoom-in-50 duration-150">
            {cursorText}
          </span>
        )}
      </div>

      {/* Lagging Outer Follower Ring (When not in custom text mode) */}
      {!cursorText && (
        <div
          className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgba(242,242,238,0.25)] transition-all duration-300 ${
            isPointer ? 'w-12 h-12 border-emerald-400/40 opacity-40' : 'w-7 h-7 opacity-80'
          }`}
        />
      )}

      {/* Technical Coordinates Indicator */}
      <div className="absolute left-4 top-4 text-[9px] text-[#52524e] tracking-widest whitespace-nowrap hidden sm:block select-none">
        <span>X:{Math.round(position.x)}</span>{' '}
        <span>Y:{Math.round(position.y)}</span>
      </div>
    </div>
  );
};
