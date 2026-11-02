import React, { useState, useEffect } from 'react';

interface PreloaderProps {
  onComplete: () => void;
}

const systemMessages = [
  "INITIALIZING ROUTING TABLE...",
  "PROBING BGP PEERS & TRANSIT...",
  "VERIFYING WIREGUARD OVERLAY...",
  "COMPILING WEBGL SHADERS...",
  "NETWORK NODES SYNCHRONIZED.",
];

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Accelerate near the end
        const jump = prev < 70 ? Math.floor(Math.random() * 4) + 1 : Math.floor(Math.random() * 7) + 3;
        const next = Math.min(prev + jump, 100);
        return next;
      });
    }, 28);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const msgStep = Math.floor((progress / 100) * (systemMessages.length - 1));
    setMessageIndex(msgStep);

    if (progress === 100) {
      const timer = setTimeout(() => {
        setIsFading(true);
        const exitTimer = setTimeout(() => {
          onComplete();
        }, 600);
        return () => clearTimeout(exitTimer);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [progress, onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col justify-between p-6 md:p-12 bg-[#050505] text-[#f2f2ee] font-mono transition-transform duration-700 ease-in-out ${
        isFading ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'
      }`}
    >
      {/* Top Header */}
      <div className="flex justify-between items-center text-xs tracking-widest uppercase text-[#8a8a86]">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          <span>NET_KERNEL_v4.19 // BOOTLOADER</span>
        </div>
        <div className="hidden sm:block">
          <span>LATENCY: &lt;12ms // STATUS: NOMINAL</span>
        </div>
      </div>

      {/* Middle Huge Counter */}
      <div className="my-auto">
        <div className="font-display font-light text-[22vw] leading-none tracking-tighter text-[#f2f2ee] select-none tabular-nums">
          {progress.toString().padStart(2, '0')}
          <span className="text-3xl md:text-6xl text-[#8a8a86] font-mono ml-2">%</span>
        </div>
        <p className="font-mono text-xs md:text-sm tracking-wider text-[#8a8a86] mt-4 flex items-center gap-3">
          <span className="text-blue-400 font-bold">&gt;&gt;</span>
          <span>{systemMessages[messageIndex]}</span>
        </p>
      </div>

      {/* Bottom Progress Bar */}
      <div className="w-full">
        <div className="flex justify-between text-[11px] tracking-widest text-[#52524e] uppercase mb-2">
          <span>SYS_INITIALIZATION</span>
          <span>{progress}% COMPLETED</span>
        </div>
        <div className="w-full h-[1px] bg-[rgba(242,242,238,0.1)] relative overflow-hidden">
          <div
            className="h-full bg-[#f2f2ee] transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};
