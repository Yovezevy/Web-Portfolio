import React, { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Global reference so any component can smoothly scroll via Lenis
export let lenisInstance: Lenis | null = null;

interface SmoothScrollProps {
  children: React.ReactNode;
}

export const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    lenisInstance = lenis;
    // Also bind to window for debugging or global access
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    // 1. Sync Lenis scroll events with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // 2. Drive Lenis through GSAP ticker for 100% frame synchronization (Zero stutter)
    const tickerUpdate = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerUpdate);
    gsap.ticker.lagSmoothing(0);

    // 3. Keep Lenis and ScrollTrigger layout metrics perfectly aligned on pin refresh
    const onRefresh = () => {
      lenis.resize();
    };
    ScrollTrigger.addEventListener('refresh', onRefresh);

    return () => {
      ScrollTrigger.removeEventListener('refresh', onRefresh);
      gsap.ticker.remove(tickerUpdate);
      lenis.destroy();
      lenisInstance = null;
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);

  return <>{children}</>;
};
