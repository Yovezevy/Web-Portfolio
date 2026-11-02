import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Code2, ArrowUpRight, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { projectsData } from '../../data/projects';
import { useLanguage } from '../../context/LanguageContext';
import { MaskedHeading } from '../ui/MaskedHeading';
import { lenisInstance } from '../layout/SmoothScroll';

gsap.registerPlugin(ScrollTrigger);

export const HorizontalProjectsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const { t } = useLanguage();

  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Smooth programmatic scroll to a specific project card
  const scrollToCard = useCallback((index: number) => {
    const st = scrollTriggerRef.current;
    if (!st) return;

    const clampedIndex = Math.max(0, Math.min(projectsData.length, index));
    const totalSteps = projectsData.length;
    const targetScroll = st.start + (clampedIndex / totalSteps) * (st.end - st.start);

    if (lenisInstance) {
      lenisInstance.scrollTo(targetScroll, { duration: 1.0 });
    } else {
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    }
  }, []);

  const handlePrev = useCallback(() => {
    scrollToCard(activeIndex - 1);
  }, [activeIndex, scrollToCard]);

  const handleNext = useCallback(() => {
    scrollToCard(activeIndex + 1);
  }, [activeIndex, scrollToCard]);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    // Use GSAP matchMedia for responsive horizontal pinning (> 768px)
    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px)', () => {
      // Precise scroll distance based on full scrollWidth minus viewport width
      const getScrollDistance = () => {
        return Math.max(0, track.scrollWidth - window.innerWidth + 96);
      };

      const anim = gsap.to(track, {
        x: () => -getScrollDistance(),
        ease: 'none',
        force3D: true, // Hardware GPU compositing
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${getScrollDistance()}`,
          pin: true,
          pinSpacing: true,
          anticipatePin: 0, // Zero anticipatePin removes the hitch/jump on entry
          scrub: 0.8, // Silky smooth gliding momentum that syncs seamlessly with Lenis
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            setScrollProgress(self.progress);
            const current = Math.min(
              projectsData.length - 1,
              Math.floor(self.progress * projectsData.length)
            );
            setActiveIndex(current);
          },
        },
      });

      scrollTriggerRef.current = anim.scrollTrigger || null;

      // Enable natural horizontal trackpad two-finger swipe or horizontal mouse-wheel
      const handleWheel = (e: WheelEvent) => {
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 2) {
          if (lenisInstance) {
            lenisInstance.scrollTo(lenisInstance.scroll + e.deltaX * 1.2, {
              immediate: false,
            });
          } else {
            window.scrollBy({ top: e.deltaX, behavior: 'auto' });
          }
        }
      };

      section.addEventListener('wheel', handleWheel, { passive: true });

      return () => {
        section.removeEventListener('wheel', handleWheel);
        anim.scrollTrigger?.kill();
        anim.kill();
        scrollTriggerRef.current = null;
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
      className="relative min-h-screen md:h-screen md:max-h-[980px] flex flex-col justify-between pt-6 md:pt-10 pb-4 md:pb-6 bg-[#070707] border-b border-[rgba(242,242,238,0.1)] overflow-hidden select-none will-change-transform"
      style={{
        transform: 'translateZ(0)',
      }}
    >
      {/* Section Header with Controls */}
      <div className="px-6 md:px-12 max-w-7xl w-full mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4 shrink-0">
        <div>
          <span className="font-mono text-xs tracking-widest uppercase text-blue-400 mb-2 block">
            {t('projTag')}
          </span>
          <MaskedHeading
            as="h2"
            className="font-display font-light text-3xl sm:text-4xl md:text-5xl uppercase text-[#f2f2ee] tracking-tight block leading-tight"
          >
            SELECTED ARCHITECTURE
          </MaskedHeading>
          <div className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#f2f2ee] via-blue-300 to-[#8a8a86] tracking-tight leading-tight">
            &amp; SYSTEMS WORK
          </div>
        </div>

        {/* Right Header: Dynamic Counter, Navigation Arrows & Archive Link */}
        <div className="flex flex-col items-start md:items-end gap-3 font-mono text-xs">
          <div className="flex items-center gap-4">
            {/* Active Card Indicator */}
            <div className="px-3 py-1.5 rounded bg-[rgba(242,242,238,0.04)] border border-[rgba(242,242,238,0.1)] text-xs tabular-nums hidden sm:flex items-center gap-1.5">
              <span className="text-blue-400 font-bold">
                {(activeIndex + 1).toString().padStart(2, '0')}
              </span>
              <span className="text-[#52524e]">/</span>
              <span className="text-[#8a8a86]">
                {projectsData.length.toString().padStart(2, '0')}
              </span>
            </div>

            {/* Prev / Next Interactive Arrow Buttons */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handlePrev}
                disabled={activeIndex === 0}
                aria-label="Previous project"
                className="p-2 rounded bg-[#0d0d0d] border border-[rgba(242,242,238,0.15)] hover:border-blue-400 hover:text-blue-400 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer text-[#f2f2ee]"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={activeIndex >= projectsData.length}
                aria-label="Next project"
                className="p-2 rounded bg-[#0d0d0d] border border-[rgba(242,242,238,0.15)] hover:border-blue-400 hover:text-blue-400 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer text-[#f2f2ee]"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <Link
              to="/projects"
              className="flex items-center gap-1.5 text-blue-400 hover:text-blue-300 transition-colors uppercase tracking-wider pl-2"
            >
              <span>{t('allProjectsBtn')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <span className="hidden md:block text-[#52524e] text-[11px] tracking-widest uppercase">
            SCROLL DOWN OR DRAG TO GLIDE // HORIZONTAL PIN
          </span>
        </div>
      </div>

      {/* Horizontal Track (Pinned on Desktop, Native Smooth Scroll on Mobile) */}
      <div className="px-6 md:px-12 overflow-x-auto md:overflow-x-visible no-scrollbar my-auto py-2">
        <div
          ref={trackRef}
          className="flex flex-row gap-6 md:gap-8 items-stretch w-max will-change-transform transform-gpu"
        >
          {projectsData.map((project, idx) => (
            <div
              key={project.id}
              data-cursor="EXPLORE"
              style={{
                contain: 'content',
                transform: 'translateZ(0)',
              }}
              className="w-[85vw] sm:w-[460px] md:w-[520px] lg:w-[560px] h-[480px] md:h-[500px] max-h-[62vh] p-6 md:p-8 bg-[#0d0d0d] border border-[rgba(242,242,238,0.1)] hover:border-blue-400/50 transition-colors duration-200 rounded-lg flex flex-col justify-between shrink-0 group relative overflow-hidden"
            >
              {/* Massive Kinetic Index Number in Background */}
              <span className="absolute -bottom-8 -right-4 font-display font-black text-8xl md:text-9xl text-[rgba(242,242,238,0.03)] group-hover:text-blue-500/10 transition-colors select-none pointer-events-none tabular-nums">
                {(idx + 1).toString().padStart(2, '0')}
              </span>

              <div className="flex-1 flex flex-col justify-between overflow-hidden">
                <div>
                  {/* Card Top: Year & Category */}
                  <div className="flex items-center justify-between text-xs font-mono text-[#8a8a86] mb-4">
                    <span className="text-blue-400 font-bold">
                      {project.year} // 0{idx + 1}
                    </span>
                    <span className="px-2.5 py-0.5 rounded bg-[rgba(242,242,238,0.04)] border border-[rgba(242,242,238,0.08)]">
                      {project.category}
                    </span>
                  </div>

                  {/* Title & Role */}
                  <h3 className="font-display text-2xl md:text-3xl text-[#f2f2ee] tracking-wide mb-2 group-hover:text-blue-300 transition-colors line-clamp-2">
                    {project.title}
                  </h3>
                  <p className="font-mono text-[11px] text-[#52524e] mb-3 uppercase tracking-wider">
                    ROLE: {project.role}
                  </p>

                  {/* Description */}
                  <p className="font-sans text-xs md:text-sm text-[#8a8a86] leading-relaxed mb-4 line-clamp-3">
                    {project.description}
                  </p>
                </div>

                <div>
                  {/* Performance Metrics Badges */}
                  {project.metrics && (
                    <div className="grid grid-cols-2 gap-2 mb-4 p-2.5 bg-[#121212] rounded border border-[rgba(242,242,238,0.06)] font-mono text-xs">
                      {project.metrics.map((m) => (
                        <div key={m.label}>
                          <span className="text-[10px] text-[#52524e] uppercase block">{m.label}</span>
                          <span className="text-blue-400 font-semibold text-[11px]">{m.value}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-2 font-mono text-[10px] md:text-[11px]">
                    {project.tags.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 bg-[rgba(242,242,238,0.04)] text-[#8a8a86] border border-[rgba(242,242,238,0.06)] rounded-sm"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Links */}
              <div className="pt-3 border-t border-[rgba(242,242,238,0.08)] flex items-center justify-between font-mono text-xs z-10 shrink-0">
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
                      className="flex items-center gap-1.5 text-blue-400 hover:text-blue-300 transition-colors"
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
          <div
            style={{
              contain: 'content',
              transform: 'translateZ(0)',
            }}
            className="w-[85vw] sm:w-[380px] h-[480px] md:h-[500px] max-h-[62vh] p-6 md:p-8 bg-[#0d0d0d] border border-dashed border-[rgba(242,242,238,0.15)] rounded-lg flex flex-col justify-between shrink-0 group hover:border-blue-400 transition-colors"
          >
            <span className="font-mono text-xs text-blue-400 uppercase tracking-widest">
              END OF SHOWCASE
            </span>
            <div className="my-auto py-4">
              <h3 className="font-display text-3xl md:text-4xl text-[#f2f2ee] mb-4 leading-tight">
                EXPLORE ALL REPOSITORIES &amp; SYSTEMS
              </h3>
              <p className="font-sans text-xs md:text-sm text-[#8a8a86] mb-6 leading-relaxed">
                See architecture diagrams, RFC specifications, and complete commit history.
              </p>
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#f2f2ee] text-[#050505] font-bold text-xs font-mono uppercase tracking-widest rounded hover:bg-blue-400 transition-colors"
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

      {/* Real-time Silky Progress Bar along Bottom Edge */}
      <div className="w-full px-6 md:px-12 max-w-7xl mx-auto shrink-0 pt-2">
        <div className="w-full h-1 bg-[rgba(242,242,238,0.06)] rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 rounded-full transition-all duration-75 shadow-[0_0_12px_rgba(59,130,246,0.6)]"
            style={{
              width: `${Math.max(4, Math.min(100, Math.round(scrollProgress * 100)))}%`,
            }}
          />
        </div>
      </div>
    </section>
  );
};
