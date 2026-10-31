import React, { useEffect, useRef } from 'react';

const words = [
  { text: "DEPLOY", outline: false },
  { text: "AUTOMATE", outline: true },
  { text: "INTEGRATE", outline: false },
  { text: "ARCHITECT", outline: true },
  { text: "ROUTE", outline: false },
  { text: "CONNECT", outline: true },
  { text: "SECURE", outline: false },
  { text: "OPTIMIZE", outline: true },
];

export const ManifestoBand: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const isHoveredRef = useRef(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let x = 0;
    let currentSkew = 0;
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;
    let animationId: number;

    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY;
      scrollVelocity = delta;
      lastScrollY = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    const animate = () => {
      // Natural dampening of scroll velocity towards zero
      scrollVelocity *= 0.91;
      if (Math.abs(scrollVelocity) < 0.05) scrollVelocity = 0;

      // Scroll speed boost calculation
      const speedBoost = Math.min(Math.abs(scrollVelocity) * 0.45, 22);
      const baseSpeed = isHoveredRef.current ? 0.15 : 0.85;

      // Primary scroll movement
      const step = baseSpeed + speedBoost;
      x -= step;

      const halfWidth = track.scrollWidth / 2;
      if (halfWidth > 0) {
        if (x <= -halfWidth) {
          x += halfWidth;
        } else if (x > 0) {
          x -= halfWidth;
        }
      }

      // Dynamic kinetic skewing based on scroll velocity
      const targetSkew = Math.max(-10, Math.min(10, scrollVelocity * 0.28));
      currentSkew += 0.12 * (targetSkew - currentSkew);

      track.style.transform = `translate3d(${x}px, 0, 0) skewX(${currentSkew.toFixed(2)}deg)`;

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className="relative py-20 md:py-28 bg-[#050505] border-y border-[rgba(242,242,238,0.1)] overflow-hidden select-none group">
      {/* Background Cinematic Radial Lighting Gradient & Dither Texture (Persis Gambar 1 Referensi) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.08)_0%,rgba(30,30,30,0.35)_40%,rgba(5,5,5,1)_85%)] pointer-events-none" />
      <div className="absolute inset-0 bg-dots opacity-45 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505] pointer-events-none" />

      {/* Infinite Scrolling Track with Dynamic Velocity Skew */}
      <div
        className="relative z-10 w-full overflow-hidden"
        onMouseEnter={() => {
          isHoveredRef.current = true;
        }}
        onMouseLeave={() => {
          isHoveredRef.current = false;
        }}
      >
        <div ref={trackRef} className="flex w-max items-center will-change-transform">
          {/* First sequence */}
          <div className="flex shrink-0 items-center gap-8 md:gap-14 pr-8 md:pr-14">
            {words.map((item, idx) => (
              <React.Fragment key={`seq1-${idx}`}>
                <span
                  className={`font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl uppercase tracking-tight transition-all duration-300 ${
                    item.outline
                      ? 'text-outline hover:text-[#f2f2ee]'
                      : 'text-[#f2f2ee] hover:text-emerald-400 font-bold'
                  }`}
                >
                  {item.text}
                </span>
                <span className="text-[#8a8a86] text-3xl md:text-5xl font-mono select-none opacity-40">
                  ✻
                </span>
              </React.Fragment>
            ))}
          </div>

          {/* Duplicated sequence for seamless loop */}
          <div
            className="flex shrink-0 items-center gap-8 md:gap-14 pr-8 md:pr-14"
            aria-hidden="true"
          >
            {words.map((item, idx) => (
              <React.Fragment key={`seq2-${idx}`}>
                <span
                  className={`font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl uppercase tracking-tight transition-all duration-300 ${
                    item.outline
                      ? 'text-outline hover:text-[#f2f2ee]'
                      : 'text-[#f2f2ee] hover:text-emerald-400 font-bold'
                  }`}
                >
                  {item.text}
                </span>
                <span className="text-[#8a8a86] text-3xl md:text-5xl font-mono select-none opacity-40">
                  ✻
                </span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Center Subcaption Underneath (Persis Gambar 1 Referensi) */}
      <div className="relative z-10 mt-6 md:mt-8 px-6 text-center">
        <p className="font-mono text-[11px] md:text-xs tracking-widest2 text-[#8a8a86] uppercase max-w-2xl mx-auto">
          ENTERPRISE ROUTING, RESILIENT NETWORKS AND HIGH-PERFORMANCE WEB APPLICATION RUNTIMES.
        </p>
      </div>
    </section>
  );
};
