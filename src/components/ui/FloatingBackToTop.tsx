import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const FloatingBackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled down past 280px
      setIsVisible(window.scrollY > 280);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div
      className={`fixed bottom-6 right-6 z-40 transition-all duration-300 font-mono ${
        isVisible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <button
        onClick={scrollToTop}
        className="w-10 h-10 bg-[#050505]/85 backdrop-blur-md border border-[rgba(242,242,238,0.2)] text-[#f2f2ee] hover:bg-[#f2f2ee] hover:text-[#050505] hover:border-[#f2f2ee] transition-all rounded shadow-2xl flex items-center justify-center group focus:outline-none focus:ring-1 focus:ring-emerald-400"
        aria-label="Scroll back to top"
        title="Scroll to Top"
      >
        <ArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
      </button>
    </div>
  );
};
