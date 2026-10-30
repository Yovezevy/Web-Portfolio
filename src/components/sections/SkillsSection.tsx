import React from 'react';
import { skillsGridData } from '../../data/skills';
import { RevealWrapper } from '../ui/RevealWrapper';
import { MaskedHeading } from '../ui/MaskedHeading';

export const SkillsSection: React.FC = () => {
  const totalSkillsCount = skillsGridData.reduce(
    (acc, curr) => acc + curr.chips.length,
    0
  );

  return (
    <section
      id="stack"
      className="relative py-24 px-6 md:px-12 border-b border-[rgba(242,242,238,0.1)] bg-[#050505] font-mono select-none"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section (Exactly as in Reference Screenshot with Masked Reveal) */}
        <div className="mb-10 flex items-end justify-between gap-6 pb-2">
          <MaskedHeading
            as="h2"
            className="font-display font-light text-6xl sm:text-7xl md:text-8xl text-[#f2f2ee] tracking-tight uppercase"
          >
            SKILLS
          </MaskedHeading>

          <p className="font-mono text-xs uppercase tracking-widest text-[#8a8a86] pb-2">
            STACK · {totalSkillsCount}
          </p>
        </div>

        {/* 6-Category Bento Grid with Crosshair '+' Intersections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-l border-t border-[rgba(242,242,238,0.12)]">
          {skillsGridData.map((category, idx) => (
            <RevealWrapper key={category.title} delay={idx * 0.07}>
              <div className="crosshair border-b border-r border-[rgba(242,242,238,0.12)] p-6 md:p-8 h-full flex flex-col justify-between bg-[#050505] hover:bg-[#080808] transition-colors group">
                <div>
                  {/* Category Header Row: Title & Number */}
                  <div className="mb-5 flex items-center justify-between">
                    <h3 className="font-mono text-[12px] uppercase tracking-[0.12em] text-[#f2f2ee] font-bold group-hover:text-emerald-400 transition-colors">
                      {category.title}
                    </h3>
                    <span className="font-mono text-[11px] text-[#52524e] tracking-wider">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Skills Chips Container */}
                  <div className="flex flex-wrap gap-2">
                    {category.chips.map((chip) => (
                      <span key={chip} className="chip">
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </RevealWrapper>
          ))}
        </div>

        {/* Bottom Label (As seen in Reference Screenshot) */}
        <div className="mt-8">
          <span className="font-mono text-[11px] uppercase tracking-widest text-[#52524e]">
            AREAS OF EXPERTISE
          </span>
        </div>
      </div>
    </section>
  );
};
