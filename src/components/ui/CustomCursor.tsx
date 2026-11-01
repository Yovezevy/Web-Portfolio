import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const [isPointer, setIsPointer] = useState(false);
  const [cursorText, setCursorText] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const cursorRef = useRef<HTMLDivElement>(null);
  const coordRef = useRef<HTMLDivElement>(null);
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
      if (!isVisible) setIsVisible(true);

      // Check hovered element
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('a, button, input, textarea, select, [role="button"], .cursor-pointer');
      setIsPointer(!!interactive);

      const customBadge = target.closest('[data-cursor]') as HTMLElement | null;
      if (customBadge) {
        const text = customBadge.getAttribute('data-cursor');
        setCursorText(text);
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

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // High-performance smooth animation loop (Direct GPU DOM transform - 0 React re-renders)
    let rafId: number;
    const animate = () => {
      const pos = posRef.current;
      pos.x += (pos.targetX - pos.x) * 0.24;
      pos.y += (pos.targetY - pos.y) * 0.24;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      }

      if (coordRef.current) {
        coordRef.current.textContent = `X:${Math.round(pos.x)} Y:${Math.round(pos.y)}`;
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(rafId);
    };
  }, [isVisible]);

  if (isTouchDevice) return null;

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 pointer-events-none z-50 transition-opacity duration-200 font-mono will-change-transform ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        transform: 'translate3d(-100px, -100px, 0)',
      }}
    >
      {/* Immediate Tracking Center Dot & Morphing Badge */}
      <div
        className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-200 ease-out flex items-center justify-center ${
          cursorText
            ? 'w-[84px] h-[84px] bg-[#f2f2ee] text-[#050505] shadow-[0_0_35px_rgba(242,242,238,0.25)] scale-100'
            : isPointer
            ? 'w-10 h-10 border border-emerald-400 bg-emerald-400/20 backdrop-blur-xs scale-100'
            : 'w-2 h-2 bg-emerald-400 scale-100'
        }`}
      >
        {cursorText && (
          <div className="flex flex-col items-center justify-center text-center px-1 font-bold text-[10px] tracking-wider uppercase leading-[1.15] select-none text-[#050505]">
            {cursorText.includes(' ') ? (
              cursorText.split(' ').map((word, i) => (
                <span key={i} className="block whitespace-nowrap">
                  {word}
                </span>
              ))
            ) : (
              <span>{cursorText}</span>
            )}
          </div>
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
      {!cursorText && (
        <div
          ref={coordRef}
          className="absolute left-4 top-4 text-[9px] text-[#52524e] tracking-widest whitespace-nowrap hidden sm:block select-none"
        >
          X:0 Y:0
        </div>
      )}
    </div>
  );
};
