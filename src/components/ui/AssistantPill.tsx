import React from 'react';

interface AssistantPillProps {
  onOpenTerminal: () => void;
  className?: string;
}

export const AssistantPill: React.FC<AssistantPillProps> = ({
  onOpenTerminal,
  className = '',
}) => {
  return (
    <div
      className={`fixed bottom-6 right-20 z-40 font-mono select-none ${className}`}
    >
      <button
        onClick={onOpenTerminal}
        className="group relative flex items-center gap-2.5 px-3.5 py-2 bg-[#050505]/90 backdrop-blur-md border border-[rgba(242,242,238,0.2)] hover:border-[#f2f2ee] hover:bg-[#f2f2ee] hover:text-[#050505] transition-all rounded shadow-2xl text-xs text-[#f2f2ee] focus:outline-none focus:ring-1 focus:ring-emerald-400"
        title="Launch Interactive Terminal Assistant"
      >
        {/* Top blinking status dot (matching reference exactly) */}
        <span className="absolute -top-1 left-6 w-2 h-2 rounded-full bg-emerald-400 border border-[#050505] shadow-[0_0_8px_#22c55e]" />

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
