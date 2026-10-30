import React from 'react';
import { Network, Code2, Activity, ArrowUpRight } from 'lucide-react';
import { profileData } from '../../data/profile';
import { RevealWrapper } from '../ui/RevealWrapper';
import { ProximityText } from '../ui/ProximityText';

export const AboutSection: React.FC = () => {
  const pillars = [
    {
      icon: Network,
      title: "Resilient Routing & Network Backbones",
      description:
        "Designing and maintaining fault-tolerant enterprise topologies, dynamic BGP transit peering, OSPF interior routing, and zero-trust WireGuard/IPsec tunnels. Built for zero-downtime operations.",
      tag: "INFRASTRUCTURE",
    },
    {
      icon: Code2,
      title: "Modern Full-Stack Web Development",
      description:
        "Crafting snappy, reactive frontend interfaces with React, TypeScript, and modern CSS, paired with robust backend APIs in Node.js and Python. Focused on 60 FPS performance and clean code design.",
      tag: "WEB ENGINEERING",
    },
    {
      icon: Activity,
      title: "Telemetry & Network Observability",
      description:
        "Implementing high-frequency telemetry pipelines parsing SNMP, syslog, and NetFlow streams with Grafana and Prometheus to identify latency spikes and packet loss before users feel it.",
      tag: "OBSERVABILITY",
    },
  ];

  return (
    <section id="about" className="relative py-24 px-6 md:px-12 border-b border-[rgba(242,242,238,0.1)] bg-dots">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="font-mono text-xs tracking-widest uppercase text-emerald-400 mb-3 block">
              01 // CORE PHILOSOPHY
            </span>
            <h2 className="font-display font-light text-5xl md:text-7xl uppercase text-[#f2f2ee] tracking-tight">
              <ProximityText minWeight={180} maxWeight={850} radius={260}>
                FROM ROUTING TABLES
              </ProximityText> <br />
              <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#f2f2ee] to-[#8a8a86]">
                <ProximityText minWeight={350} maxWeight={900} radius={260}>
                  TO BROWSER RUNTIMES
                </ProximityText>
              </span>
            </h2>
          </div>
          <p className="font-mono text-xs md:text-sm text-[#8a8a86] max-w-md leading-relaxed">
            Networks and web applications are two sides of the same coin: one routes the packets, the other renders the value.
          </p>
        </div>

        {/* Narrative & Pillars Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <RevealWrapper key={pillar.title} delay={idx * 0.15}>
                <div className="group h-full p-8 bg-[#0d0d0d] border border-[rgba(242,242,238,0.1)] hover:border-emerald-400/40 hover:-translate-y-1 transition-all duration-300 rounded-lg flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="p-3 bg-[rgba(242,242,238,0.04)] border border-[rgba(242,242,238,0.1)] rounded group-hover:border-emerald-400/50 transition-colors">
                        <Icon className="w-5 h-5 text-emerald-400" />
                      </div>
                      <span className="font-mono text-[10px] tracking-widest uppercase text-[#52524e]">
                        {pillar.tag}
                      </span>
                    </div>

                    <h3 className="font-display text-2xl text-[#f2f2ee] tracking-wide mb-3 group-hover:text-emerald-300 transition-colors">
                      {pillar.title}
                    </h3>

                    <p className="font-sans text-sm text-[#8a8a86] leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-[rgba(242,242,238,0.06)] flex items-center justify-between text-xs font-mono text-[#52524e] group-hover:text-[#8a8a86]">
                    <span>DISCIPLINE_VERIFIED</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:text-emerald-400 transition-colors" />
                  </div>
                </div>
              </RevealWrapper>
            );
          })}
        </div>

        {/* Extended Narrative Bio Banner */}
        <RevealWrapper delay={0.3}>
          <div className="mt-12 p-8 md:p-10 bg-[#0a0a0a] border border-[rgba(242,242,238,0.08)] rounded-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-3xl">
              <h4 className="font-mono text-xs uppercase tracking-widest text-emerald-400 mb-2">
                BIOGRAPHY // BACKGROUND
              </h4>
              <p className="font-sans text-base text-[#8a8a86] leading-relaxed">
                {profileData.bio[1]}
              </p>
            </div>
            <a
              href="#contact"
              className="shrink-0 px-6 py-3 border border-[rgba(242,242,238,0.2)] hover:border-[#f2f2ee] text-xs font-mono text-[#f2f2ee] hover:bg-[#f2f2ee] hover:text-[#050505] transition-all rounded-sm tracking-wider"
            >
              DISCUSS OPPORTUNITIES →
            </a>
          </div>
        </RevealWrapper>
      </div>
    </section>
  );
};
