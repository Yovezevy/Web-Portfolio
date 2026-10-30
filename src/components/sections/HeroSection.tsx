import React from 'react';
import { ArrowDownRight, Terminal, Globe, ShieldCheck } from 'lucide-react';
import { DitheredSphere } from '../3d/DitheredSphere';
import { profileData } from '../../data/profile';
import { useLanguage } from '../../context/LanguageContext';
import { RevealWrapper } from '../ui/RevealWrapper';
import { ProximityText } from '../ui/ProximityText';
import { ScrambleText } from '../ui/ScrambleText';

interface HeroSectionProps {
  onOpenTerminal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenTerminal }) => {
  const { t } = useLanguage();

  return (
    <section
      id="overview"
      className="relative min-h-screen pt-28 pb-16 px-6 md:px-12 flex flex-col justify-between border-b border-[rgba(242,242,238,0.1)] overflow-hidden bg-grid"
    >
      {/* Background Engineering Blueprint Gradient Mask */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#05050500_20%,#050505_90%)] pointer-events-none z-0" />
      {/* Background 3D Dithered Sphere Canvas - Centered and inset away from right border */}
      <div className="absolute right-2 sm:right-6 md:right-12 lg:right-20 xl:right-28 top-1/2 -translate-y-1/2 w-full max-w-[520px] md:max-w-[620px] aspect-square opacity-40 md:opacity-85 pointer-events-none z-0">
        <DitheredSphere />
      </div>

      {/* Top Meta Details */}
      <RevealWrapper delay={0.1}>
        <div className="relative z-10 flex flex-wrap justify-between items-center text-xs font-mono text-[#8a8a86] tracking-widest uppercase gap-4">
          <div className="flex items-center gap-2">
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            <span>LOCATION: {profileData.location} // {profileData.coordinates}</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-emerald-400 font-semibold">{t('heroStatus')}</span>
          </div>
        </div>
      </RevealWrapper>

      {/* Main Massive Kinetic Headline with Proximity Weight Wave */}
      <div className="relative z-10 my-auto py-12">
        <div className="text-xs font-mono tracking-widest2 text-[#8a8a86] uppercase mb-4 flex items-center gap-2">
          <span className="inline-block w-6 h-[1px] bg-emerald-400" />
          <ScrambleText>{t('heroTagline')}</ScrambleText>
        </div>

        <h1 className="font-display font-light text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight leading-[0.88] text-[#f2f2ee] uppercase select-none">
          <ProximityText minWeight={180} maxWeight={900} radius={320}>
            {t('heroTitle1')}
          </ProximityText> <br />
          <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#f2f2ee] via-emerald-300 to-[#8a8a86]">
            <ProximityText minWeight={400} maxWeight={900} radius={320}>
              {t('heroTitle2')}
            </ProximityText>
          </span> <br />
          <ProximityText minWeight={180} maxWeight={900} radius={320}>
            {t('heroTitle3')}
          </ProximityText>
        </h1>

        <RevealWrapper delay={0.5}>
          <p className="mt-8 font-sans text-base md:text-xl text-[#8a8a86] max-w-2xl font-light leading-relaxed">
            {t('heroDesc')}
          </p>
        </RevealWrapper>

        {/* Action Buttons with Scramble Hover */}
        <RevealWrapper delay={0.65}>
          <div className="mt-10 flex flex-wrap items-center gap-4 font-mono text-xs tracking-wider">
            <a
              href="#projects"
              className="group flex items-center gap-2 px-6 py-3.5 bg-[#f2f2ee] text-[#050505] hover:bg-emerald-400 transition-all font-semibold rounded-sm"
            >
              <ScrambleText>{t('heroExplore')}</ScrambleText>
              <ArrowDownRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
            </a>

            <button
              onClick={onOpenTerminal}
              className="flex items-center gap-2.5 px-6 py-3.5 border border-[rgba(242,242,238,0.2)] bg-[rgba(242,242,238,0.03)] hover:bg-[rgba(242,242,238,0.1)] text-[#f2f2ee] transition-all rounded-sm"
            >
              <Terminal className="w-4 h-4 text-emerald-400" />
              <ScrambleText>{t('heroCli')}</ScrambleText>
            </button>
          </div>
        </RevealWrapper>
      </div>

      {/* Giant Bottom Name with Proximity Weight Hover (Christen Dijoux Signature Style) */}
      <div className="relative z-10 pt-4 pb-2 border-t border-[rgba(242,242,238,0.06)] overflow-hidden">
        <div className="font-display font-light text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-[rgba(242,242,238,0.15)] hover:text-[rgba(52,211,153,0.4)] transition-colors tracking-tighter uppercase whitespace-nowrap overflow-x-hidden">
          <ProximityText minWeight={100} maxWeight={900} radius={280}>
            {profileData.name}
          </ProximityText>
        </div>

        <div className="pt-3 flex flex-wrap justify-between items-center font-mono text-xs text-[#52524e]">
          <div className="flex items-center gap-4">
            <span>{t('heroScroll')}</span>
            <span className="animate-bounce">↓</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-[#8a8a86]">
            <span>CORE: BGP / OSPF / WIREGUARD</span>
            <span>•</span>
            <span>CERTS: CCNA / MTCRE / FCA</span>
          </div>
        </div>
      </div>
    </section>
  );
};
