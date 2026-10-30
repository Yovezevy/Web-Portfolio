import React from 'react';
import { Network, Layout, Server, Activity } from 'lucide-react';
import { skillsData } from '../../data/skills';
import { KineticText } from '../ui/KineticText';
import { RevealWrapper } from '../ui/RevealWrapper';

export const SkillsSection: React.FC = () => {
  const getIcon = (title: string) => {
    switch (title) {
      case 'Networking & Protocols':
        return <Network className="w-5 h-5 text-emerald-400" />;
      case 'Web & Frontend Engineering':
        return <Layout className="w-5 h-5 text-cyan-400" />;
      case 'Cloud, Systems & DevOps':
        return <Server className="w-5 h-5 text-amber-400" />;
      default:
        return <Activity className="w-5 h-5 text-purple-400" />;
    }
  };

  return (
    <section id="stack" className="py-24 px-6 md:px-12 border-b border-[rgba(242,242,238,0.1)]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="font-mono text-xs tracking-widest uppercase text-emerald-400 mb-3 block">
              04 // TECHNICAL SPECIFICATIONS
            </span>
            <h2 className="font-display font-light text-5xl md:text-7xl uppercase text-[#f2f2ee] tracking-tight">
              <KineticText>ROUTING PROTOCOLS</KineticText> <br />
              <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#f2f2ee] to-[#8a8a86]">
                <KineticText delay={0.2}>&amp; CODE RUNTIMES</KineticText>
              </span>
            </h2>
          </div>
          <p className="font-mono text-xs md:text-sm text-[#8a8a86] max-w-md">
            Verified mastery across enterprise network infrastructure, cloud engineering, and frontend web development.
          </p>
        </div>

        {/* 4-Column Bento Grid with Reveal Animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillsData.map((category, idx) => (
            <RevealWrapper key={category.title} delay={idx * 0.15}>
              <div className="h-full p-8 bg-[#0a0a0a] border border-[rgba(242,242,238,0.1)] hover:border-emerald-400/40 hover:-translate-y-1 transition-all duration-300 rounded-lg">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[rgba(242,242,238,0.06)]">
                  <div className="p-2.5 bg-[rgba(242,242,238,0.04)] border border-[rgba(242,242,238,0.08)] rounded">
                    {getIcon(category.title)}
                  </div>
                  <div>
                    <h3 className="font-display text-2xl text-[#f2f2ee] tracking-wide">
                      {category.title}
                    </h3>
                    <span className="font-mono text-[11px] text-[#52524e] uppercase tracking-wider">
                      {category.skills.length} CORE CAPABILITIES
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  {category.skills.map((skill) => (
                    <div key={skill.name} className="flex flex-col gap-1.5 font-mono text-xs">
                      <div className="flex justify-between items-center">
                        <span className="text-[#f2f2ee] font-medium">{skill.name}</span>
                        <span className="text-[10px] text-emerald-400 px-2 py-0.5 rounded bg-[rgba(242,242,238,0.03)] border border-[rgba(242,242,238,0.06)]">
                          {skill.level}
                        </span>
                      </div>

                      {skill.tags && (
                        <div className="flex flex-wrap gap-1.5 pt-0.5">
                          {skill.tags.map((t) => (
                            <span
                              key={t}
                              className="text-[10px] text-[#8a8a86] px-2 py-0.5 bg-[rgba(242,242,238,0.03)] rounded-sm"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  );
};
