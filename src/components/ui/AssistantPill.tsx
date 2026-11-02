import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface AssistantPillProps {
  onOpenTerminal: () => void;
  className?: string;
}

export const AssistantPill: React.FC<AssistantPillProps> = ({
  onOpenTerminal,
  className = '',
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Show prompt speech bubble after 2.5 seconds (matching Christen Dijoux reference)
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed bottom-6 right-6 z-40 font-mono select-none ${className}`}
    >
      {/* Speech Callout Bubble (Persis Gambar 5 Referensi Christen Dijoux) */}
      {showTooltip && (
        <div
          onClick={onOpenTerminal}
          className="absolute bottom-full right-0 mb-3 w-60 sm:w-64 p-3 bg-[#0a0a0a]/95 backdrop-blur-md border border-[rgba(242,242,238,0.2)] hover:border-blue-400/50 rounded shadow-2xl text-left cursor-pointer transition-all group font-sans animate-fade-in"
        >
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="font-semibold text-xs text-[#f2f2ee] group-hover:text-blue-300 transition-colors">
                A question about my work?
              </p>
              <p className="text-[#8a8a86] text-[11px] mt-0.5 font-mono">
                Ask my assistant.
              </p>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowTooltip(false);
              }}
              className="text-[#52524e] hover:text-[#f2f2ee] p-0.5 transition-colors"
              aria-label="Dismiss helper tip"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Pill Button [MI] ASSISTANT */}
      <button
        onClick={onOpenTerminal}
        className="group relative flex items-center gap-2.5 px-3.5 py-2 bg-[#050505]/90 backdrop-blur-md border border-[rgba(242,242,238,0.2)] hover:border-[#f2f2ee] hover:bg-[#f2f2ee] hover:text-[#050505] transition-all rounded shadow-2xl text-xs text-[#f2f2ee] focus:outline-none focus:ring-1 focus:ring-blue-400"
        title="Launch Interactive Terminal Assistant"
      >
        {/* Top white/emerald status dot indicator */}
        <span className="absolute -top-1 left-5 w-2 h-2 rounded-full bg-white border border-[#050505] shadow-[0_0_8px_#ffffff]" />

        {/* Monogram Box */}
        <span className="px-1.5 py-0.5 border border-current rounded text-[10px] font-bold leading-none tracking-tight transition-colors">
          MI
        </span>

        {/* Label */}
        <span className="text-[11px] font-bold tracking-widest uppercase transition-colors">
          ASSISTANT
        </span>
      </button>
    </div>
  );
};
