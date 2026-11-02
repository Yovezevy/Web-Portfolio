import React, { useState, useEffect, useRef } from 'react';
import { ContinentalGlobeCanvas } from '../ui/ContinentalGlobeCanvas';
import { useLanguage } from '../../context/LanguageContext';
import { RevealWrapper } from '../ui/RevealWrapper';

export const JourneySection: React.FC = () => {
  const { lang } = useLanguage();
  const [distance, setDistance] = useState(0);
  const [progress, setProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;
          // Animate distance count up to 830 KM
          const target = 830;
          const duration = 1400;
          const start = performance.now();

          const step = (now: number) => {
            const elapsed = now - start;
            const factor = Math.min(1, elapsed / duration);
            // Ease out expo
            const ease = 1 - Math.pow(2, -10 * factor);
            setDistance(Math.round(target * ease));
            setProgress(ease);

            if (factor < 1) {
              requestAnimationFrame(step);
            }
          };

          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#050505] border-b border-[rgba(242,242,238,0.1)] py-20 md:py-28 font-mono select-none overflow-hidden bg-dots"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Distance Counter & Narrative */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <RevealWrapper delay={0.1}>
              {/* Kicker Tag */}
              <div className="flex items-center gap-2 text-xs tracking-widest text-[#8a8a86] uppercase mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                <span>
                  {lang === 'id'
                    ? '[ PERJALANAN ] · KALIMANTAN (IKN) ➔ JAWA (ITS)'
                    : '[ JOURNEY ] · BORNEO (IKN GATEWAY) ➔ SURABAYA (ITS)'}
                </span>
              </div>

              {/* Massive Kinetic Counter */}
              <div className="font-display text-7xl sm:text-8xl md:text-9xl leading-[0.85] text-[#f2f2ee] tracking-tight mb-6">
                <span>{distance}</span>
                <span className="ml-3 text-outline text-[#8a8a86]">KM</span>
              </div>

              {/* Progress Divider Line */}
              <div className="h-px w-full bg-[rgba(242,242,238,0.12)] mb-6 relative overflow-hidden">
                <div
                  className="h-full bg-blue-400 transition-all duration-300 origin-left"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>

              {/* Coordinates DL Grid */}
              <dl className="grid grid-cols-2 gap-6 text-xs uppercase tracking-widest border-b border-[rgba(242,242,238,0.08)] pb-6 mb-8">
                <div>
                  <dt className="text-[#8a8a86] mb-1">
                    {lang === 'id' ? 'ASAL DARI' : 'FROM ORIGIN'}
                  </dt>
                  <dd className="text-[#f2f2ee] font-bold">BALIKPAPAN</dd>
                  <dd className="text-[#8a8a86] text-[11px] mt-0.5">1.26°S · 116.83°E</dd>
                </div>
                <div className="text-right">
                  <dt className="text-[#8a8a86] mb-1">
                    {lang === 'id' ? 'SEKARANG DI' : 'NOW BASED IN'}
                  </dt>
                  <dd className="text-blue-400 font-bold">SURABAYA (ITS)</dd>
                  <dd className="text-[#8a8a86] text-[11px] mt-0.5">7.28°S · 112.80°E</dd>
                </div>
              </dl>

              {/* Narrative Text */}
              <p className="font-sans text-sm md:text-base text-[#8a8a86] leading-relaxed">
                {lang === 'id'
                  ? 'Berasal dari Balikpapan (Kalimantan Timur, gerbang Ibu Kota Nusantara / IKN), kini menempuh studi Teknik Komputer di Institut Teknologi Sepuluh Nopember (ITS) Surabaya. Menjembatani infrastruktur sistem jaringan antar-pulau dengan arsitektur routing enterprise, pemantauan keamanan siber, dan rekayasa web modern.'
                  : 'Originally from Balikpapan (East Kalimantan, gateway to Nusantara / IKN), now studying Computer Engineering at Institut Teknologi Sepuluh Nopember (ITS) Surabaya. Bridging island infrastructure with core enterprise routing, cybersecurity intelligence, and modern web application development.'}
              </p>
            </RevealWrapper>
          </div>

          {/* Right Column: Interactive 3D Continental Globe Canvas Frame */}
          <div className="lg:col-span-7 flex justify-center">
            <RevealWrapper delay={0.25}>
              <div className="relative w-full max-w-[480px] sm:max-w-[540px] md:max-w-[580px] aspect-square bg-[#090909] border border-[rgba(242,242,238,0.12)] rounded-lg overflow-hidden group shadow-2xl flex items-center justify-center p-4">
                {/* Globe Canvas */}
                <ContinentalGlobeCanvas progress={progress} />

                {/* Top Overlay Badge */}
                <div className="absolute top-4 left-5 flex items-center gap-2 text-[10px] tracking-widest text-[#8a8a86] uppercase select-none pointer-events-none bg-[#050505]/75 backdrop-blur-sm px-2.5 py-1 rounded border border-[rgba(242,242,238,0.08)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                  <span>INDONESIA ARCHIPELAGO // DRAG TO ROTATE</span>
                </div>

                {/* Bottom Frame Coordinates Info */}
                <div className="absolute bottom-3 right-4 text-[9px] text-[#52524e] font-mono select-none pointer-events-none uppercase tracking-widest">
                  GEODESIC ARC: BPN ➔ SUB • LATENCY &lt; 14ms
                </div>
              </div>
            </RevealWrapper>
          </div>
        </div>
      </div>
    </section>
  );
};
