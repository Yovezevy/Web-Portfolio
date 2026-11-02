import React from 'react';
import { MapPin, CheckCircle } from 'lucide-react';
import { experienceData } from '../../data/experience';
import { MaskedHeading } from '../ui/MaskedHeading';
import { RevealWrapper } from '../ui/RevealWrapper';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-24 px-6 md:px-12 border-b border-[rgba(242,242,238,0.1)]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="font-mono text-xs tracking-widest uppercase text-blue-400 mb-3 block">
              05 // TRACK RECORD
            </span>
            <MaskedHeading
              as="h2"
              className="font-display font-light text-5xl md:text-7xl uppercase text-[#f2f2ee] tracking-tight"
            >
              CAREER JOURNEY &amp; RESPONSIBILITIES
            </MaskedHeading>
          </div>
          <p className="font-mono text-xs md:text-sm text-[#8a8a86] max-w-md">
            Proven history of delivering rock-solid network uptime, secure VPN tunnels, and high-velocity web platforms.
          </p>
        </div>

        {/* Timeline Stack with Staggered Reveal */}
        <div className="space-y-12">
          {experienceData.map((item, idx) => (
            <RevealWrapper key={item.company + item.period} delay={idx * 0.15}>
              <div className="p-8 md:p-10 bg-[#0a0a0a] border border-[rgba(242,242,238,0.1)] hover:border-blue-400/40 hover:-translate-y-1 transition-all duration-300 rounded-lg relative overflow-hidden group">
                {/* Top Row: Period, Role, Company */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-[rgba(242,242,238,0.06)] font-mono text-xs">
                  <div>
                    <span className="text-blue-400 font-bold text-sm tracking-wider block mb-1">
                      {item.period}
                    </span>
                    <h3 className="font-display text-3xl md:text-4xl text-[#f2f2ee] tracking-wide group-hover:text-blue-300 transition-colors">
                      {item.role}
                    </h3>
                    <span className="text-base text-[#8a8a86] font-sans">
                      {item.company}
                    </span>
                  </div>

                  <div className="flex flex-wrap md:flex-col items-start md:items-end gap-2 text-[#52524e]">
                    <span className="px-2.5 py-1 rounded bg-[rgba(242,242,238,0.04)] border border-[rgba(242,242,238,0.08)] text-[#8a8a86]">
                      {item.type}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-[#8a8a86]">
                      <MapPin className="w-3.5 h-3.5 text-blue-400" />
                      {item.location}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="font-sans text-sm md:text-base text-[#8a8a86] leading-relaxed mb-6">
                  {item.description}
                </p>

                {/* Key Achievements */}
                <div className="space-y-2.5 mb-8">
                  <span className="font-mono text-[11px] text-[#52524e] uppercase tracking-wider block mb-2">
                    KEY IMPACTS &amp; MILESTONES:
                  </span>
                  {item.achievements.map((ach, achIdx) => (
                    <div key={achIdx} className="flex items-start gap-2.5 text-xs md:text-sm font-sans text-[#cccccc]">
                      <CheckCircle className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                      <span>{ach}</span>
                    </div>
                  ))}
                </div>

                {/* Technologies Used */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-[rgba(242,242,238,0.06)] font-mono text-[11px]">
                  {item.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 bg-[rgba(242,242,238,0.03)] text-[#8a8a86] border border-[rgba(242,242,238,0.06)] rounded-sm"
                    >
                      {tech}
                    </span>
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
