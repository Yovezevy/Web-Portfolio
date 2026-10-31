import React, { useState, useEffect } from 'react';
import { Terminal, ArrowUpRight, Star } from 'lucide-react';
import { DitheredSphere } from '../3d/DitheredSphere';
import { RevealWrapper } from '../ui/RevealWrapper';
import { ProximityText } from '../ui/ProximityText';

interface HeroSectionProps {
  onOpenTerminal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenTerminal }) => {
  const [localTime, setLocalTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setLocalTime(
        now.toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="overview"
      className="relative min-h-screen pt-28 pb-14 px-6 md:px-12 flex flex-col justify-between border-b border-[rgba(242,242,238,0.1)] overflow-hidden bg-grid font-mono select-none"
    >
      {/* Background Cinematic Radial Lighting Gradient (Persis Gambar 2 Referensi) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,rgba(255,255,255,0.08)_0%,rgba(20,20,20,0.45)_40%,rgba(5,5,5,1)_85%)] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-dots opacity-40 pointer-events-none z-0" />

      {/* 3D Halftone Dithered Sphere with Illumination */}
      <div className="absolute right-2 sm:right-6 md:right-12 lg:right-20 top-1/2 -translate-y-1/2 w-full max-w-[480px] md:max-w-[560px] aspect-square opacity-45 md:opacity-90 pointer-events-none z-0">
        <DitheredSphere />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col justify-between flex-1">
        {/* Top: Availability Status Ribbon (Persis Gambar 2 Referensi) */}
        <div className="flex justify-center mb-6">
          <a
            href="#contact"
            className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#0d0d0d]/90 border border-[rgba(242,242,238,0.2)] hover:border-emerald-400/80 backdrop-blur-md text-xs text-[#f2f2ee] transition-all group shadow-xl"
          >
            <span className="px-1.5 py-0.5 rounded border border-current text-[10px] font-bold">
              MI
            </span>
            <span className="text-[11px] tracking-wider text-[#8a8a86] group-hover:text-[#f2f2ee] transition-colors">
              AVAILABLE FOR FULL-TIME &amp; CONTRACTS — SURABAYA (ITS)
            </span>
            <span className="text-emerald-400 font-bold group-hover:translate-x-0.5 transition-transform">
              CONTACT ↗
            </span>
          </a>
        </div>

        {/* 4-Column Meta Header Ribbon (Persis Gambar 2 Referensi) */}
        <RevealWrapper delay={0.1}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-6 border-b border-[rgba(242,242,238,0.08)] text-[11px] text-[#8a8a86] uppercase tracking-widest">
            <div>
              <span className="text-[#52524e] block text-[9px]">NAME</span>
              <span className="text-[#f2f2ee] font-bold">MUHAMMAD IHSAN</span>
            </div>
            <div>
              <span className="text-[#52524e] block text-[9px]">BASE LOCATION</span>
              <span className="text-[#f2f2ee]">SURABAYA (ITS) · ID</span>
            </div>
            <div>
              <span className="text-[#52524e] block text-[9px]">SPECIALIZATION</span>
              <span className="text-emerald-400 font-semibold">NETWORKS • BGP • ROUTEROS • WEB</span>
            </div>
            <div className="text-right flex items-center justify-end gap-2">
              <div>
                <span className="text-[#52524e] block text-[9px]">LOCAL TIME</span>
                <span className="text-[#f2f2ee]">{localTime || 'WIB'}</span>
              </div>
              <Star className="w-3.5 h-3.5 text-emerald-400" />
            </div>
          </div>
        </RevealWrapper>

        {/* Main Hero Body: Left Stacked Headline + Right Floating Info Card */}
        <div className="my-auto py-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Stacked High-Contrast Headline */}
          <div className="lg:col-span-7">
            <div className="text-xs tracking-widest text-[#8a8a86] uppercase mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>[ 00 ] - OPEN TO COLLABORATIONS</span>
            </div>

            <h1 className="font-display font-light text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[0.88] text-[#f2f2ee] uppercase select-none">
              <ProximityText minWeight={180} maxWeight={900} radius={320}>
                BUILDING RESILIENT
              </ProximityText> <br />
              <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#f2f2ee] via-emerald-300 to-[#8a8a86]">
                <ProximityText minWeight={400} maxWeight={900} radius={320}>
                  NETWORKS &amp; WEB
                </ProximityText>
              </span> <br />
              <ProximityText minWeight={180} maxWeight={900} radius={320}>
                INTO LIVE SYSTEMS.
              </ProximityText>
            </h1>
          </div>

          {/* Right Column: Floating Profile Card (Persis Gambar 2 Referensi) */}
          <div className="lg:col-span-5 flex justify-start lg:justify-end">
            <RevealWrapper delay={0.3}>
              <div className="p-6 md:p-8 bg-[#0a0a0a]/85 backdrop-blur-md border border-[rgba(242,242,238,0.12)] rounded-lg shadow-2xl max-w-md">
                <p className="font-sans text-sm md:text-base text-[#8a8a86] leading-relaxed mb-6 font-light">
                  Junior Network Engineer &amp; Computer Engineering student at Institut Teknologi Sepuluh Nopember (ITS). I bridge enterprise routing, BGP/OSPF redundancy, and snappy reactive web interfaces with React and TypeScript.
                </p>

                <div className="flex flex-wrap items-center gap-3 text-xs tracking-wider">
                  <a
                    href="#projects"
                    className="px-5 py-2.5 bg-[#050505] text-[#f2f2ee] border border-[rgba(242,242,238,0.2)] hover:border-emerald-400 hover:text-emerald-400 rounded transition-all font-semibold"
                  >
                    SEE PROJECTS
                  </a>

                  <a
                    href="#contact"
                    className="px-5 py-2.5 bg-[#f2f2ee] text-[#050505] hover:bg-emerald-400 rounded transition-all font-bold flex items-center gap-1.5"
                  >
                    <span>GET IN TOUCH</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={onOpenTerminal}
                    className="p-2.5 border border-[rgba(242,242,238,0.2)] hover:border-[#f2f2ee] text-[#8a8a86] hover:text-[#f2f2ee] rounded transition-colors"
                    title="Launch Terminal CLI"
                  >
                    <Terminal className="w-4 h-4 text-emerald-400" />
                  </button>
                </div>
              </div>
            </RevealWrapper>
          </div>
        </div>

        {/* Giant Bottom Full-Width Name (Christen Dijoux Signature Style - Persis Gambar 2) */}
        <div className="pt-4 border-t border-[rgba(242,242,238,0.06)] overflow-hidden">
          <div className="font-display font-light text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-[rgba(242,242,238,0.18)] hover:text-[rgba(52,211,153,0.4)] transition-colors tracking-tighter uppercase whitespace-nowrap overflow-x-hidden">
            <ProximityText minWeight={100} maxWeight={900} radius={280}>
              MUHAMMAD IHSAN
            </ProximityText>
          </div>

          <div className="pt-3 flex flex-wrap justify-between items-center text-xs text-[#52524e]">
            <div className="flex items-center gap-4">
              <span>FULL-STACK NETWORK ENGINEER — 2026</span>
              <span className="text-[#8a8a86] hidden sm:inline">• CCNA • MTCRE • MTCNA</span>
            </div>
            <div className="flex items-center gap-2 text-[#8a8a86]">
              <span>SCROLL</span>
              <span className="animate-bounce">↓</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
