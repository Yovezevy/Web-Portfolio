import React, { useState, useEffect } from 'react';
import { ArrowUp, Code2, Globe, Mail, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { profileData } from '../../data/profile';
import { RidgeLinesCanvas } from '../ui/RidgeLinesCanvas';
import { ProximityText } from '../ui/ProximityText';
import { useLanguage } from '../../context/LanguageContext';

const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg
    viewBox="0 0 24 24"
    width="14"
    height="14"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export const Footer: React.FC = () => {
  const { lang } = useLanguage();
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZoneName: 'short',
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#050505] text-[#8a8a86] font-mono border-t border-[rgba(242,242,238,0.1)] select-none">
      {/* 1. Giant Signature Banner with Joy Division Ridge Lines (As in Reference Screenshot 3) */}
      <div className="relative h-[44vw] max-h-[520px] min-h-[260px] overflow-hidden border-b border-[rgba(242,242,238,0.08)]">
        {/* Ridge Lines Canvas Background */}
        <div className="absolute inset-0 opacity-75">
          <RidgeLinesCanvas />
        </div>

        {/* Gradient Mask to smoothly blend top and bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#050505]/20 to-[#050505] pointer-events-none" />

        {/* Colossal Variable-Font Name at Bottom Edge */}
        <div className="absolute inset-x-0 bottom-0 translate-y-[10%] text-center px-4 overflow-hidden pointer-events-auto">
          <h2 className="font-display font-light text-[13vw] sm:text-[14vw] md:text-[15vw] uppercase tracking-tight leading-[0.82] text-[#f2f2ee]">
            <ProximityText minWeight={120} maxWeight={900} radius={340}>
              MUHAMMAD IHSAN
            </ProximityText>
          </h2>
        </div>
      </div>

      {/* 2. Bento Navigation Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-[rgba(242,242,238,0.08)]">
          {/* Identity & Mission */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="font-display text-2xl font-bold text-[#f2f2ee] tracking-wider border border-[rgba(242,242,238,0.2)] px-2 py-0.5 rounded">
                  MI
                </span>
                <span className="text-xs text-blue-400 font-bold uppercase tracking-widest">
                  NET//DEV
                </span>
              </div>
              <p className="text-xs font-mono uppercase tracking-widest text-[#f2f2ee] mb-2">
                {profileData.role}
              </p>
              <p className="text-xs text-[#8a8a86] font-sans leading-relaxed max-w-sm">
                {lang === 'id'
                  ? 'Menjembatani keandalan infrastruktur jaringan enterprise dengan aplikasi web modern berkinerja tinggi. Mahasiswa Teknik Komputer ITS.'
                  : 'Bridging enterprise network infrastructure reliability with high-performance modern web applications. Computer Engineering Student at ITS.'}
              </p>
            </div>

            <div className="flex items-center gap-2 text-[10px] tracking-widest text-blue-400">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              <span>STATUS: AVAILABLE FOR CONTRACT &amp; FULL-TIME</span>
            </div>
          </div>

          {/* 01 // PROJECTS */}
          <div className="lg:col-span-2">
            <p className="text-[10px] text-[#52524e] tracking-widest uppercase mb-2">01</p>
            <h3 className="font-display text-lg text-[#f2f2ee] uppercase tracking-wide mb-4">
              {lang === 'id' ? 'PROYEK' : 'PROJECTS'}
            </h3>
            <ul className="space-y-2.5 text-xs text-[#8a8a86]">
              <li>
                <Link to="/project/dual-isp-redundancy" className="hover:text-[#f2f2ee] transition-colors">
                  Dual-ISP Campus
                </Link>
              </li>
              <li>
                <Link to="/project/fortigate-wazuh-siem" className="hover:text-[#f2f2ee] transition-colors">
                  Fortinet SIEM
                </Link>
              </li>
              <li>
                <Link to="/project/five-network-textbooks" className="hover:text-[#f2f2ee] transition-colors">
                  5 Network Books
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center gap-1">
                  <span>View All (8+)</span>
                  <span>→</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* 02 // SOCIAL */}
          <div className="lg:col-span-2">
            <p className="text-[10px] text-[#52524e] tracking-widest uppercase mb-2">02</p>
            <h3 className="font-display text-lg text-[#f2f2ee] uppercase tracking-wide mb-4">
              SOCIAL
            </h3>
            <ul className="space-y-2.5 text-xs text-[#8a8a86]">
              <li>
                <a
                  href="https://www.instagram.com/blog_etc22/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors inline-flex items-center gap-1.5"
                >
                  <InstagramIcon />
                  <span>Instagram ↗</span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Akiyo974"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#f2f2ee] transition-colors inline-flex items-center gap-1.5"
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>GitHub ↗</span>
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/muhammad-ihsan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#f2f2ee] transition-colors inline-flex items-center gap-1.5"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>LinkedIn ↗</span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/6282255176697"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors inline-flex items-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp ↗</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${profileData.email}`}
                  className="hover:text-[#f2f2ee] transition-colors inline-flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email ↗</span>
                </a>
              </li>
            </ul>
          </div>

          {/* 03 // DOCS & LEGAL */}
          <div className="lg:col-span-2">
            <p className="text-[10px] text-[#52524e] tracking-widest uppercase mb-2">03</p>
            <h3 className="font-display text-lg text-[#f2f2ee] uppercase tracking-wide mb-4">
              DOCS &amp; RESUME
            </h3>
            <ul className="space-y-2.5 text-xs text-[#8a8a86]">
              <li>
                <Link to="/cv" className="text-[#f2f2ee] font-semibold hover:text-blue-400 transition-colors">
                  View ATS Resume
                </Link>
              </li>
              <li>
                <a href="/llms.txt" target="_blank" className="hover:text-[#f2f2ee] transition-colors">
                  /llms.txt (AI spec)
                </a>
              </li>
              <li>
                <a href="/humans.txt" target="_blank" className="hover:text-[#f2f2ee] transition-colors">
                  /humans.txt
                </a>
              </li>
              <li>
                <span className="text-[#52524e]">CCNA #478915238</span>
              </li>
            </ul>
          </div>

          {/* 04 // LOCATION */}
          <div className="lg:col-span-2">
            <p className="text-[10px] text-[#52524e] tracking-widest uppercase mb-2">04</p>
            <h3 className="font-display text-lg text-[#f2f2ee] uppercase tracking-wide mb-4">
              SURABAYA
            </h3>
            <div className="space-y-1 text-xs text-[#8a8a86]">
              <p className="text-[#f2f2ee]">TEKNIK KOMPUTER</p>
              <p>INSTITUT TEKNOLOGI</p>
              <p>SEPULUH NOPEMBER (ITS)</p>
              <p className="text-blue-400 pt-2 text-[11px] font-mono">
                {profileData.coordinates}
              </p>
              <p className="text-[10px] text-[#52524e] pt-1">
                TIME: {time || 'SURABAYA (WIB)'}
              </p>
            </div>
          </div>
        </div>

        {/* 3. Bottom Colophon & Scroll to Top */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs text-[#52524e]">
          <div>
            <p>
              © {new Date().getFullYear()} <strong className="text-[#8a8a86]">Muhammad Ihsan Malarangeng</strong>. All rights reserved.
            </p>
            <p className="mt-1 text-[11px]">
              Design &amp; Code — Big Shoulders Display, Geist · React, Three.js &amp; WebGL.
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 px-3.5 py-1.5 border border-[rgba(242,242,238,0.15)] hover:border-[#f2f2ee] text-[#8a8a86] hover:text-[#050505] hover:bg-[#f2f2ee] transition-all rounded text-xs"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
