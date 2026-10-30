import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Code2, ArrowUpRight, ArrowRight } from 'lucide-react';
import { projectsData } from '../../data/projects';
import { useLanguage } from '../../context/LanguageContext';
import { KineticText } from '../ui/KineticText';

gsap.registerPlugin(ScrollTrigger);

export const HorizontalProjectsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    // Only enable GSAP pin on desktop / screens above 768px for optimal mobile touch experience
    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px)', () => {
      const totalWidth = track.scrollWidth - window.innerWidth + 80;

      const anim = gsap.to(track, {
        x: -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: `+=${totalWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        anim.scrollTrigger?.kill();
        anim.kill();
      };
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative bg-[#070707] border-b border-[rgba(242,242,238,0.1)] overflow-hidden"
    >
      {/* Section Header */}
      <div className="pt-24 px-6 md:px-12 max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <span className="font-mono text-xs tracking-widest uppercase text-emerald-400 mb-3 block">
            {t('projTag')}
          </span>
          <h2 className="font-display font-light text-5xl md:text-7xl uppercase text-[#f2f2ee] tracking-tight">
            <KineticText>{t('projTitle1')}</KineticText> <br />
            <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#f2f2ee] via-emerald-300 to-[#8a8a86]">
              <KineticText>{t('projTitle2')}</KineticText>
            </span>
          </h2>
        </div>
        <div className="flex flex-col items-start md:items-end gap-2 font-mono text-xs text-[#8a8a86]">
          <span className="hidden md:block">HORIZONTAL EXPLORATION // PIN_SCROLL</span>
          <Link
            to="/projects"
            className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors uppercase tracking-wider"
          >
            <span>{t('allProjectsBtn')}</span>
          </Link>
        </div>
      </div>

      {/* Horizontal Track (pinned on desktop, scrollable on mobile) */}
      <div className="pb-24 px-6 md:px-12 overflow-x-auto md:overflow-x-visible no-scrollbar">
        <div
          ref={trackRef}
          className="flex flex-row gap-8 items-stretch w-max pb-4"
        >
          {projectsData.map((project, idx) => (
            <div
              key={project.id}
              data-cursor="EXPLORE"
              className="w-[85vw] sm:w-[480px] md:w-[560px] p-8 md:p-10 bg-[#0d0d0d] border border-[rgba(242,242,238,0.1)] hover:border-emerald-400/40 transition-all duration-300 rounded-lg flex flex-col justify-between shrink-0 group relative overflow-hidden"
            >
              {/* Massive Kinetic Index Number in Background */}
              <span className="absolute -bottom-8 -right-4 font-display font-black text-8xl md:text-9xl text-[rgba(242,242,238,0.03)] group-hover:text-[rgba(52,211,153,0.06)] transition-colors select-none pointer-events-none tabular-nums">
                {(idx + 1).toString().padStart(2, '0')}
              </span>

              <div>
                {/* Card Top: Year & Category */}
                <div className="flex items-center justify-between text-xs font-mono text-[#8a8a86] mb-6">
                  <span className="text-emerald-400 font-bold">
                    {project.year} // 0{idx + 1}
                  </span>
                  <span className="px-2.5 py-1 rounded bg-[rgba(242,242,238,0.04)] border border-[rgba(242,242,238,0.08)]">
                    {project.category}
                  </span>
                </div>

                {/* Title & Role */}
                <h3 className="font-display text-3xl md:text-4xl text-[#f2f2ee] tracking-wide mb-3 group-hover:text-emerald-300 transition-colors">
                  {project.title}
                </h3>
                <p className="font-mono text-xs text-[#52524e] mb-5 uppercase tracking-wider">
                  ROLE: {project.role}
                </p>

                {/* Description */}
                <p className="font-sans text-sm text-[#8a8a86] leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Performance Metrics Badges */}
                {project.metrics && (
                  <div className="grid grid-cols-2 gap-3 mb-6 p-3 bg-[#121212] rounded border border-[rgba(242,242,238,0.06)] font-mono text-xs">
                    {project.metrics.map((m) => (
                      <div key={m.label}>
                        <span className="text-[10px] text-[#52524e] uppercase block">{m.label}</span>
                        <span className="text-emerald-400 font-semibold">{m.value}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8 font-mono text-[11px]">
                  {project.tags.slice(0, 5).map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 bg-[rgba(242,242,238,0.04)] text-[#8a8a86] border border-[rgba(242,242,238,0.06)] rounded-sm"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Links */}
              <div className="pt-4 border-t border-[rgba(242,242,238,0.06)] flex items-center justify-between font-mono text-xs z-10">
                <div className="flex items-center gap-4">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-[#8a8a86] hover:text-[#f2f2ee] transition-colors"
                    >
                      <Code2 className="w-3.5 h-3.5" />
                      <span>CODE</span>
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>DEMO</span>
                    </a>
                  )}
                </div>

                <Link
                  to={`/project/${project.id}`}
                  className="flex items-center gap-1 text-[#8a8a86] hover:text-[#f2f2ee] transition-colors"
                >
                  <span>DEEP DIVE</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}

          {/* Final Call to Action Slide in Horizontal Track */}
          <div className="w-[85vw] sm:w-[380px] p-8 md:p-10 bg-[#0d0d0d] border border-dashed border-[rgba(242,242,238,0.15)] rounded-lg flex flex-col justify-between shrink-0 group hover:border-emerald-400 transition-all">
            <span className="font-mono text-xs text-emerald-400 uppercase tracking-widest">
              END OF SHOWCASE
            </span>
            <div className="my-auto py-8">
              <h3 className="font-display text-4xl text-[#f2f2ee] mb-4">
                EXPLORE ALL REPOSITORIES &amp; SYSTEMS
              </h3>
              <p className="font-sans text-sm text-[#8a8a86] mb-6">
                See architecture diagrams, RFC specifications, and complete commit history.
              </p>
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#f2f2ee] text-[#050505] font-bold text-xs font-mono uppercase tracking-widest rounded hover:bg-emerald-400 transition-colors"
              >
                <span>OPEN PROJECT ARCHIVE</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <span className="font-mono text-[11px] text-[#52524e]">
              TOTAL ARCHIVE: {projectsData.length} PROJECTS
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
