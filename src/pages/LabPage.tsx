import React, { useState } from 'react';
import { ArrowLeft, Sparkles, Terminal, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TopologyCanvas } from '../components/ui/TopologyCanvas';
import { SubnetCalculator } from '../components/tools/SubnetCalculator';
import { ClientTelemetryWidget } from '../components/tools/ClientTelemetryWidget';
import { labExperiments } from '../data/lab';
import { KineticText } from '../components/ui/KineticText';
import { RevealWrapper } from '../components/ui/RevealWrapper';

interface LabPageProps {
  onOpenTerminal: () => void;
}

export const LabPage: React.FC<LabPageProps> = ({ onOpenTerminal }) => {
  const [selectedExperiment, setSelectedExperiment] = useState(labExperiments[0]);
  const [pingResult, setPingResult] = useState<string | null>(null);
  const [isPinging, setIsPinging] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>('ALL');

  const runLivePingTest = () => {
    setIsPinging(true);
    setPingResult('PROBING TRANSIT ROUTE TO 1.1.1.1 (CLOUDFLARE ANYCAST)...');
    setTimeout(() => {
      const ms = (Math.random() * 3 + 10.2).toFixed(1);
      setPingResult(`REPLY FROM 1.1.1.1: bytes=32 time=${ms}ms TTL=58 (STATUS: EXCELLENT, JITTER 0.3ms)`);
      setIsPinging(false);
    }, 700);
  };

  const categories = ['ALL', 'Shader', 'Network Tool', 'Interactive Canvas'];

  const filteredExperiments = activeFilter === 'ALL'
    ? labExperiments
    : labExperiments.filter((exp) => exp.type === activeFilter);

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 bg-[#050505] text-[#f2f2ee]">
      <div className="max-w-7xl mx-auto">
        {/* Back navigation */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-mono text-xs text-[#8a8a86] hover:text-[#f2f2ee] mb-8 transition-colors uppercase tracking-widest"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>RETURN TO OVERVIEW</span>
        </Link>

        {/* Page Header */}
        <div className="mb-14">
          <div className="flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-blue-400 mb-3">
            <Sparkles className="w-4 h-4" />
            <span>LABORATORY // EXPERIMENTS &amp; DISSECTIONS</span>
          </div>
          <h1 className="font-display font-light text-6xl md:text-8xl uppercase text-[#f2f2ee] tracking-tight">
            <KineticText>THE SITE, TAKEN</KineticText> <br />
            <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-[#f2f2ee]">
              <KineticText delay={0.15}>APART PIECE BY PIECE</KineticText>
            </span>
          </h1>
          <p className="mt-4 font-sans text-base text-[#8a8a86] max-w-2xl leading-relaxed">
            Every component of this portfolio analyzed openly: why it was built, how it routes packets or renders shaders, and an honest verdict on its real-world performance.
          </p>
        </div>

        {/* Top Feature: Interactive Visualizer & Latency Engine */}
        <RevealWrapper delay={0.1}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
            <div className="lg:col-span-8 flex flex-col gap-6">
              <TopologyCanvas />

              {/* Real-time Diagnostics Bar */}
              <div className="p-6 bg-[#0a0a0a] border border-[rgba(242,242,238,0.1)] rounded-lg font-mono text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[#52524e] text-[10px] uppercase block">DIAGNOSTIC TEST</span>
                  <span className="text-[#f2f2ee] font-semibold text-sm">LIVE ICMP EDGE PING BENCHMARK</span>
                  {pingResult && (
                    <p className="text-blue-400 text-xs mt-1.5 font-mono">{pingResult}</p>
                  )}
                </div>
                <button
                  onClick={runLivePingTest}
                  disabled={isPinging}
                  className="px-5 py-2.5 bg-[#f2f2ee] text-[#050505] hover:bg-blue-400 font-bold transition-colors rounded text-xs shrink-0 uppercase tracking-wider"
                >
                  {isPinging ? 'TESTING...' : 'RUN PING TEST'}
                </button>
              </div>
            </div>

            {/* Right Terminal Launcher Box */}
            <div className="lg:col-span-4 flex flex-col justify-between p-8 bg-[#0a0a0a] border border-[rgba(242,242,238,0.1)] rounded-lg">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Terminal className="w-6 h-6 text-blue-400" />
                  <h3 className="font-display text-3xl text-[#f2f2ee]">PSEUDO-BASH CLI</h3>
                </div>
                <p className="font-sans text-sm text-[#8a8a86] leading-relaxed mb-6">
                  Experience command-line networking straight in the browser. Type commands such as <code>status</code>, <code>ping</code>, <code>traceroute</code>, and <code>skills</code>.
                </p>

                <div className="p-4 bg-[#111111] rounded border border-[rgba(242,242,238,0.06)] font-mono text-xs space-y-2 text-[#8a8a86] mb-6">
                  <p><span className="text-blue-400">$</span> ping 1.1.1.1</p>
                  <p><span className="text-blue-400">$</span> traceroute gateway</p>
                  <p><span className="text-blue-400">$</span> show ip route</p>
                </div>
              </div>

              <button
                onClick={onOpenTerminal}
                className="w-full py-3.5 bg-blue-400 text-[#050505] font-bold text-xs font-mono uppercase tracking-widest rounded hover:bg-blue-300 transition-colors"
              >
                LAUNCH TERMINAL NOW
              </button>
            </div>
          </div>
        </RevealWrapper>

        {/* Live Network Engineering Tools (CIDR Calculator & Client Diagnostics) */}
        <div className="space-y-8 mb-16">
          <RevealWrapper delay={0.1}>
            <SubnetCalculator />
          </RevealWrapper>

          <RevealWrapper delay={0.2}>
            <ClientTelemetryWidget />
          </RevealWrapper>
        </div>

        {/* Component Autopsies Grid */}
        <div className="mb-12">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[rgba(242,242,238,0.08)] mb-8 font-mono text-xs">
            <span className="text-xs uppercase tracking-widest text-blue-400">
              DISSECTED COMPONENTS // 0{filteredExperiments.length} ENTRIES
            </span>

            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-3 py-1.5 rounded transition-all uppercase tracking-wider ${
                    activeFilter === cat
                      ? 'bg-[#f2f2ee] text-[#050505] font-bold'
                      : 'text-[#8a8a86] hover:text-[#f2f2ee]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredExperiments.map((exp, idx) => (
              <RevealWrapper key={exp.id} delay={idx * 0.1}>
                <div
                  onClick={() => setSelectedExperiment(exp)}
                  className={`p-6 rounded-lg border cursor-pointer transition-all ${
                    selectedExperiment.id === exp.id
                      ? 'bg-[#121212] border-blue-400/60 shadow-xl'
                      : 'bg-[#0a0a0a] border-[rgba(242,242,238,0.08)] hover:border-[rgba(242,242,238,0.2)]'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono mb-3">
                    <span className="text-[#f2f2ee] text-base font-bold">{exp.title}</span>
                    <span className="px-2.5 py-1 rounded text-[10px] bg-[rgba(242,242,238,0.04)] text-blue-400 border border-[rgba(242,242,238,0.08)] uppercase">
                      {exp.type}
                    </span>
                  </div>
                  <p className="font-sans text-sm text-[#8a8a86] mb-4 leading-relaxed">
                    {exp.description}
                  </p>
                  <div className="p-3 bg-[#070707] rounded border border-[rgba(242,242,238,0.04)] text-xs font-mono text-[#52524e] flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">
                      <strong className="text-[#8a8a86]">Verdict:</strong> {exp.verdict}
                    </span>
                  </div>
                </div>
              </RevealWrapper>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
