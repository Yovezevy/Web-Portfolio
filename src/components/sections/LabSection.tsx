import React, { useState } from 'react';
import { Terminal, Sparkles, CheckCircle2 } from 'lucide-react';
import { TopologyCanvas } from '../ui/TopologyCanvas';
import { labExperiments } from '../../data/lab';

interface LabSectionProps {
  onOpenTerminal: () => void;
}

export const LabSection: React.FC<LabSectionProps> = ({ onOpenTerminal }) => {
  const [selectedExperiment, setSelectedExperiment] = useState(labExperiments[0]);
  const [pingResult, setPingResult] = useState<string | null>(null);
  const [isPinging, setIsPinging] = useState(false);

  const runLivePingTest = () => {
    setIsPinging(true);
    setPingResult('SENDING ICMP ECHO TO 1.1.1.1...');
    setTimeout(() => {
      const ms = (Math.random() * 4 + 9.8).toFixed(1);
      setPingResult(`REPLY FROM 1.1.1.1: bytes=32 time=${ms}ms TTL=58 (STATUS: EXCELLENT)`);
      setIsPinging(false);
    }, 600);
  };

  return (
    <section id="lab" className="py-24 px-6 md:px-12 border-b border-[rgba(242,242,238,0.1)] bg-[#070707]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-emerald-400 mb-3">
              <Sparkles className="w-4 h-4" />
              <span>03 // THE LAB &amp; EXPERIMENTS</span>
            </div>
            <h2 className="font-display font-light text-5xl md:text-7xl uppercase text-[#f2f2ee] tracking-tight">
              SYSTEMS DISSECTED <br />
              <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-[#f2f2ee]">
                LIVE IN THE BROWSER
              </span>
            </h2>
          </div>
          <p className="font-mono text-xs md:text-sm text-[#8a8a86] max-w-md">
            Interactive prototypes, network topology simulators, and honest component autopsies inspired by creative coding.
          </p>
        </div>

        {/* Experiment Visualizer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Left Column: Live Interactive Canvas */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <TopologyCanvas />

            {/* Quick Live Latency Probe Widget */}
            <div className="p-5 bg-[#0d0d0d] border border-[rgba(242,242,238,0.1)] rounded-lg font-mono text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-[#52524e] text-[10px] uppercase block">DIAGNOSTIC TEST</span>
                <span className="text-[#f2f2ee] font-semibold">ICMP EDGE PING BENCHMARK</span>
                {pingResult && (
                  <p className="text-emerald-400 text-[11px] mt-1">{pingResult}</p>
                )}
              </div>
              <button
                onClick={runLivePingTest}
                disabled={isPinging}
                className="px-4 py-2 border border-[rgba(242,242,238,0.2)] hover:border-emerald-400 hover:text-emerald-400 transition-colors rounded text-xs text-[#8a8a86] shrink-0"
              >
                {isPinging ? 'TESTING...' : 'RUN PING TEST'}
              </button>
            </div>
          </div>

          {/* Right Column: Experiment List & Honest Verdicts */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="font-mono text-xs text-[#52524e] tracking-widest uppercase block mb-2">
                COMPONENT AUTOPSIES
              </span>

              {labExperiments.map((exp) => (
                <div
                  key={exp.id}
                  onClick={() => setSelectedExperiment(exp)}
                  className={`p-5 rounded-lg border cursor-pointer transition-all ${
                    selectedExperiment.id === exp.id
                      ? 'bg-[#121212] border-emerald-400/60 shadow-lg'
                      : 'bg-[#0a0a0a] border-[rgba(242,242,238,0.08)] hover:border-[rgba(242,242,238,0.2)]'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono mb-2">
                    <span className="text-[#f2f2ee] font-bold">{exp.title}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-[rgba(242,242,238,0.05)] text-emerald-400 border border-[rgba(242,242,238,0.08)]">
                      {exp.type}
                    </span>
                  </div>
                  <p className="font-sans text-xs text-[#8a8a86] mb-3 leading-relaxed">
                    {exp.description}
                  </p>
                  <div className="pt-2 border-t border-[rgba(242,242,238,0.05)] flex items-start gap-2 text-[11px] font-mono text-[#52524e]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong className="text-[#8a8a86]">Verdict:</strong> {exp.verdict}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Launch CLI Terminal Callout */}
            <div className="mt-6 p-5 bg-[rgba(242,242,238,0.02)] border border-[rgba(242,242,238,0.1)] rounded-lg flex items-center justify-between font-mono text-xs">
              <div className="flex items-center gap-3">
                <Terminal className="w-5 h-5 text-emerald-400" />
                <div>
                  <p className="text-[#f2f2ee] font-semibold">Interactive SSH/Bash CLI</p>
                  <p className="text-[#52524e] text-[11px]">Type commands to explore network stats</p>
                </div>
              </div>
              <button
                onClick={onOpenTerminal}
                className="px-3.5 py-1.5 bg-[#f2f2ee] text-[#050505] hover:bg-emerald-400 transition-colors font-bold rounded text-xs"
              >
                LAUNCH
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
