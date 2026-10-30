import React from 'react';
import { RadialWarpCanvas } from '../ui/RadialWarpCanvas';
import { RidgeLinesCanvas } from '../ui/RidgeLinesCanvas';
import { HalftoneGlobeCanvas } from '../ui/HalftoneGlobeCanvas';
import { Shield, Network, BookOpen } from 'lucide-react';
import { ProximityText } from '../ui/ProximityText';
import { RevealWrapper } from '../ui/RevealWrapper';
import { MaskedHeading } from '../ui/MaskedHeading';

interface Pillar {
  number: string;
  category: string;
  title: string;
  description: string;
  technologies: string[];
  icon: React.ComponentType<{ className?: string }>;
  tag: string;
  visualComponent: React.ReactNode;
}

export const RadialWarpShowcase: React.FC = () => {
  const pillars: Pillar[] = [
    {
      number: '#01',
      category: 'NETWORK INFRASTRUCTURE',
      tag: 'FIBER-OPTIC DATA WARP // TOPOLOGY',
      title: 'Core Routing & Multi-WAN Failover',
      description:
        'Enterprise BGP Route Reflectors, Multi-Area OSPF backbones, and MikroTik recursive failover routing engineered with hierarchical Queue Tree QoS for zero-downtime campus continuity.',
      technologies: ['Cisco BGP', 'OSPF Multi-Area', 'MikroTik RouterOS', 'Queue Tree QoS', 'HSRP / VRRP'],
      icon: Network,
      visualComponent: <RadialWarpCanvas />,
    },
    {
      number: '#02',
      category: 'CYBERSECURITY & THREAT MONITORING',
      tag: 'SIEM TELEMETRY // RIDGE SCAN',
      title: 'Fortinet Fabric & Wazuh SIEM Intelligence',
      description:
        'FortiGate enterprise UTM firewall policies, High Availability (HA) clusters, and automated security event telemetry through Wazuh SIEM deployed on Windows Server for real-time anomaly isolation.',
      technologies: ['Fortinet FortiGate', 'Wazuh SIEM', 'Security Fabric', 'IPsec & SSL VPN', 'CTF Rank 6'],
      icon: Shield,
      visualComponent: <RidgeLinesCanvas />,
    },
    {
      number: '#03',
      category: 'TECHNICAL AUTHORING & SYSTEMS',
      tag: 'GLOBAL CLOUD MESH // 5 TEXTBOOKS',
      title: '5 Published Textbooks & Cloud Systems',
      description:
        'Author of 5 comprehensive technical textbooks (Cisco CCNP/CCNA, MikroTik MTCRE/MTCNA, AWS Cloud) totaling 772 pages, coupled with virtualized Linux mail servers and Google Cloud Platform (#JuaraGCP).',
      technologies: ['CCNP (254 Pages)', 'CCNA (117 Pages)', 'MTCNA (199 Pages)', 'MTCRE (77 Pages)', 'AWS & GCP'],
      icon: BookOpen,
      visualComponent: <HalftoneGlobeCanvas />,
    },
  ];

  return (
    <section className="relative bg-[#050505] font-mono select-none border-b border-[rgba(242,242,238,0.1)] bg-dots">
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505] pointer-events-none" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="pt-20 pb-8 border-b border-[rgba(242,242,238,0.08)] flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 text-xs tracking-widest text-[#8a8a86] uppercase mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>CORE ARCHITECTURES & SYSTEMS</span>
            </div>
            <MaskedHeading
              as="h2"
              className="font-display text-4xl sm:text-5xl md:text-6xl text-[#f2f2ee] uppercase tracking-tight"
            >
              ENGINEERING PILLARS
            </MaskedHeading>
          </div>
          <p className="text-xs text-[#8a8a86] max-w-sm tracking-wide">
            SCROLL TO EXPLORE INFRASTRUCTURE CAPABILITIES, NETWORK SIMULATIONS, AND PUBLISHED AUTHORSHIPS.
          </p>
        </div>

        {/* Vertically Stacked Pillars (Scroll-based editorial layout) */}
        <div className="divide-y divide-[rgba(242,242,238,0.08)]">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            // Alternating zigzag layout: Pillar 1 & 3 visual left; Pillar 2 visual right
            const isVisualRight = index % 2 === 1;

            return (
              <article
                key={pillar.number}
                className="py-20 md:py-28"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                  {/* Visual Canvas Column */}
                  <div
                    className={`lg:col-span-7 ${
                      isVisualRight ? 'lg:order-2' : 'lg:order-1'
                    }`}
                  >
                    <RevealWrapper delay={0.1}>
                      <div className="relative w-full h-[360px] sm:h-[420px] md:h-[460px] bg-[#090909] border border-[rgba(242,242,238,0.12)] rounded-lg overflow-hidden group shadow-2xl">
                        {/* Generative Visual Canvas */}
                        {pillar.visualComponent}

                        {/* Top Indicator Badge */}
                        <div className="absolute top-4 left-5 flex items-center gap-2 text-[10px] tracking-widest text-[#8a8a86] uppercase select-none pointer-events-none bg-[#050505]/70 backdrop-blur-sm px-2.5 py-1 rounded border border-[rgba(242,242,238,0.08)]">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span>{pillar.tag}</span>
                        </div>

                        {/* Bottom Frame Monogram / Dimension info */}
                        <div className="absolute bottom-3 right-4 text-[9px] text-[#52524e] font-mono select-none pointer-events-none uppercase tracking-widest">
                          SYS//DIM [240x180] • LIVE GENERATIVE
                        </div>
                      </div>
                    </RevealWrapper>
                  </div>

                  {/* Text Narrative Column */}
                  <div
                    className={`lg:col-span-5 flex flex-col justify-center space-y-6 ${
                      isVisualRight ? 'lg:order-1' : 'lg:order-2'
                    }`}
                  >
                    <RevealWrapper delay={0.2}>
                      <div>
                        {/* Category & Pillar Number */}
                        <div className="flex items-center gap-3 text-xs tracking-widest text-[#8a8a86] uppercase mb-4">
                          <span className="text-emerald-400 font-bold">{pillar.number}</span>
                          <span className="text-[#52524e]">·</span>
                          <Icon className="w-3.5 h-3.5 text-emerald-400" />
                          <span>{pillar.category}</span>
                        </div>

                        {/* Variable-Weight Heading with Proximity Wave */}
                        <h3 className="font-display font-light text-4xl sm:text-5xl md:text-6xl text-[#f2f2ee] uppercase tracking-tight leading-[0.94] mb-6">
                          <ProximityText minWeight={250} maxWeight={850} radius={220}>
                            {pillar.title}
                          </ProximityText>
                        </h3>

                        {/* Narrative Description */}
                        <p className="font-sans text-base text-[#8a8a86] leading-relaxed mb-8">
                          {pillar.description}
                        </p>

                        {/* Technology / Protocol Badges */}
                        <div className="flex flex-wrap gap-2 font-mono text-[11px]">
                          {pillar.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-2.5 py-1 bg-[rgba(242,242,238,0.04)] text-[#8a8a86] border border-[rgba(242,242,238,0.08)] rounded-sm hover:border-[#f2f2ee]/30 transition-colors"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </RevealWrapper>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
