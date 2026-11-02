import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Menu, X, Terminal, Languages, Search } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { ScrambleText } from '../ui/ScrambleText';

interface NavbarProps {
  onOpenTerminal?: () => void;
  onOpenCommandPalette?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenTerminal, onOpenCommandPalette }) => {
  const [isInverted, setIsInverted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [simulatedPing, setSimulatedPing] = useState(11);
  const location = useLocation();
  const { lang, setLang, t } = useLanguage();

  const toggleNegativeMode = () => {
    setIsInverted(!isInverted);
    document.body.classList.toggle('inverted');
  };

  const toggleLanguage = () => {
    setLang(lang === 'en' ? 'id' : 'en');
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSimulatedPing(Math.floor(Math.random() * 5) + 9);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { label: t('navOverview'), to: '/' },
    { label: t('navProjects'), to: '/projects' },
    { label: t('navLab'), to: '/lab' },
    { label: t('navCv'), to: '/cv' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 font-mono ${
        isScrolled
          ? 'bg-[#050505]/85 backdrop-blur-md border-b border-[rgba(242,242,238,0.08)] py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Left: Logo / Monogram */}
        <Link to="/" className="flex items-center gap-3 group">
          <span className="font-display text-2xl tracking-wider text-[#f2f2ee] font-bold group-hover:text-blue-400 transition-colors">
            <ScrambleText>NET//DEV</ScrambleText>
          </span>
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] tracking-widest bg-[rgba(242,242,238,0.05)] border border-[rgba(242,242,238,0.1)] text-[#8a8a86]">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            <span>{t('navOnline')}</span>
            <span className="text-[#52524e]">•</span>
            <span className="text-blue-400">{simulatedPing}ms</span>
          </span>
        </Link>

        {/* Center: Desktop Route Links */}
        <div className="hidden lg:flex items-center gap-7 text-xs tracking-widest text-[#8a8a86]">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`transition-colors relative py-1 ${
                  isActive ? 'text-[#f2f2ee] font-bold' : 'hover:text-[#f2f2ee]'
                } after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[1px] after:bg-blue-400 after:transition-all after:duration-300 ${
                  isActive ? 'after:w-full' : 'after:w-0 hover:after:w-full'
                }`}
              >
                <ScrambleText>{link.label}</ScrambleText>
              </Link>
            );
          })}
        </div>

        {/* Right: Actions with Distinct Divider & Spacing */}
        <div className="flex items-center gap-2.5 lg:ml-8 lg:pl-6 lg:border-l lg:border-[rgba(242,242,238,0.12)]">
          {/* Command Palette Button (Ctrl+K) */}
          {onOpenCommandPalette && (
            <button
              onClick={onOpenCommandPalette}
              className="hidden sm:flex items-center gap-2 px-2.5 py-1 text-xs border border-[rgba(242,242,238,0.15)] bg-[rgba(242,242,238,0.03)] hover:bg-[#f2f2ee] hover:text-[#050505] transition-all rounded text-[#8a8a86] hover:border-[#f2f2ee] group"
              title="Open Command Palette (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5 text-blue-400 group-hover:text-[#050505] transition-colors" />
              <span className="text-[10px] font-mono tracking-wider font-semibold">
                CTRL K
              </span>
            </button>
          )}

          {/* Language Switcher Pill (EN / ID) */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs border border-[rgba(242,242,238,0.15)] bg-[rgba(242,242,238,0.03)] hover:bg-[#f2f2ee] hover:text-[#050505] transition-all rounded text-[#8a8a86] hover:border-[#f2f2ee]"
            title="Toggle Language (EN / ID)"
          >
            <Languages className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-[11px] font-mono font-bold uppercase">
              {lang === 'en' ? 'EN' : 'ID'}
            </span>
          </button>

          {/* Terminal Launcher */}
          {onOpenTerminal && (
            <button
              onClick={onOpenTerminal}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs border border-[rgba(242,242,238,0.15)] bg-[rgba(242,242,238,0.03)] hover:bg-[#f2f2ee] hover:text-[#050505] transition-all rounded text-[#8a8a86] hover:border-[#f2f2ee]"
              title="Open Terminal"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-[11px] font-mono">CLI</span>
            </button>
          )}

          {/* Invert Mode Easter Egg Toggle */}
          <button
            onClick={toggleNegativeMode}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs border border-[rgba(242,242,238,0.15)] bg-[rgba(242,242,238,0.03)] hover:bg-[#f2f2ee] hover:text-[#050505] transition-all rounded text-[#8a8a86] hover:border-[#f2f2ee]"
            title="Toggle Negative Mode Easter Egg"
          >
            {isInverted ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline text-[11px] font-mono">
              {isInverted ? 'INVERT: ON' : 'INVERT: OFF'}
            </span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 text-[#8a8a86] hover:text-[#f2f2ee] border border-[rgba(242,242,238,0.15)] rounded"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#050505] border-b border-[rgba(242,242,238,0.1)] px-6 py-6 flex flex-col gap-4 text-xs tracking-widest text-[#8a8a86]">
          {onOpenCommandPalette && (
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenCommandPalette(); }}
              className="py-2 flex items-center justify-between text-left text-blue-400 border-b border-[rgba(242,242,238,0.05)] uppercase"
            >
              <span>SEARCH / COMMAND PALETTE</span>
              <span>CTRL K</span>
            </button>
          )}
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-[#f2f2ee] border-b border-[rgba(242,242,238,0.05)]"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 flex items-center justify-between text-[11px] text-[#52524e]">
            <span>ROUTER: 192.168.1.1</span>
            <span className="text-blue-400">LANG: {lang.toUpperCase()}</span>
          </div>
        </div>
      )}
    </nav>
  );
};
