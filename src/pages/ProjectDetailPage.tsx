import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Code2,
  CheckCircle2,
  AlertTriangle,
  Server,
} from 'lucide-react';
import { projectsData } from '../data/projects';
import { KineticText } from '../components/ui/KineticText';
import { RevealWrapper } from '../components/ui/RevealWrapper';

export const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Find project by id
  const projectIndex = projectsData.findIndex((p) => p.id === id);
  const project = projectsData[projectIndex];

  // Next & previous projects
  const prevProject = projectIndex > 0 ? projectsData[projectIndex - 1] : projectsData[projectsData.length - 1];
  const nextProject = projectIndex < projectsData.length - 1 ? projectsData[projectIndex + 1] : projectsData[0];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen pt-40 pb-24 px-6 md:px-12 bg-[#050505] text-[#f2f2ee] font-mono flex flex-col items-center justify-center text-center">
        <span className="text-emerald-400 text-sm tracking-widest uppercase mb-4">ERROR 404 // NODE NOT FOUND</span>
        <h1 className="font-display text-5xl md:text-7xl mb-6">PROJECT DOES NOT EXIST</h1>
        <p className="text-[#8a8a86] max-w-md mb-8">
          The requested system architecture or repository slug is not indexed in the active routing table.
        </p>
        <Link
          to="/projects"
          className="px-6 py-3 bg-[#f2f2ee] text-[#050505] font-bold text-xs uppercase tracking-widest rounded hover:bg-emerald-400 transition-colors"
        >
          RETURN TO PROJECT ARCHIVE
        </Link>
      </div>
    );
  }

  const { caseStudy } = project;

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 bg-[#050505] text-[#f2f2ee]">
      <div className="max-w-6xl mx-auto">
        {/* Top Breadcrumb & Return Link */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-6 border-b border-[rgba(242,242,238,0.08)] font-mono text-xs">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-[#8a8a86] hover:text-[#f2f2ee] transition-colors uppercase tracking-widest"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>PROJECTS ARCHIVE</span>
          </Link>

          <div className="flex items-center gap-3 text-[#52524e]">
            <span className="text-emerald-400 font-bold uppercase">{project.category}</span>
            <span>•</span>
            <span>YEAR: {project.year}</span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="mb-14">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 tracking-widest uppercase mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>CASE STUDY &amp; ARCHITECTURE BLUEPRINT</span>
          </div>

          <h1 className="font-display font-light text-5xl sm:text-6xl md:text-7xl lg:text-8xl uppercase tracking-tight text-[#f2f2ee] mb-6 leading-[0.92]">
            <KineticText>{project.title}</KineticText>
          </h1>

          <p className="font-sans text-lg md:text-xl text-[#8a8a86] max-w-3xl font-light leading-relaxed mb-8">
            {project.longDescription || project.description}
          </p>

          {/* Project Metadata Ribbon */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 bg-[#0a0a0a] border border-[rgba(242,242,238,0.1)] rounded-lg font-mono text-xs mb-8">
            <div>
              <span className="text-[#52524e] uppercase block text-[10px] mb-1">ENGINEERING ROLE</span>
              <span className="text-[#f2f2ee] font-semibold">{project.role}</span>
            </div>
            <div>
              <span className="text-[#52524e] uppercase block text-[10px] mb-1">CLIENT / DOMAIN</span>
              <span className="text-[#f2f2ee] font-semibold">{caseStudy?.client || "Enterprise"}</span>
            </div>
            <div>
              <span className="text-[#52524e] uppercase block text-[10px] mb-1">TIMELINE</span>
              <span className="text-[#f2f2ee] font-semibold">{caseStudy?.timeline || project.year}</span>
            </div>
            <div>
              <span className="text-[#52524e] uppercase block text-[10px] mb-1">DEPLOYMENT STATUS</span>
              <span className="text-emerald-400 font-semibold">PRODUCTION ACTIVE</span>
            </div>
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-4 font-mono text-xs">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 border border-[rgba(242,242,238,0.2)] hover:border-[#f2f2ee] text-[#f2f2ee] hover:bg-[#f2f2ee] hover:text-[#050505] transition-all rounded uppercase tracking-wider font-semibold"
              >
                <Code2 className="w-4 h-4" />
                <span>INSPECT REPOSITORY</span>
              </a>
            )}

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 bg-emerald-400 text-[#050505] font-bold hover:bg-emerald-300 transition-colors rounded uppercase tracking-wider"
              >
                <ExternalLink className="w-4 h-4" />
                <span>LAUNCH LIVE INTERFACE</span>
              </a>
            )}
          </div>
        </div>

        {/* Measurable Performance Metrics */}
        {project.metrics && (
          <RevealWrapper delay={0.1}>
            <div className="mb-16">
              <span className="font-mono text-xs text-[#52524e] uppercase tracking-widest block mb-4">
                01 // VERIFIED PRODUCTION METRICS
              </span>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 p-8 bg-[#0a0a0a] border border-[rgba(242,242,238,0.1)] rounded-lg">
                {project.metrics.map((metric) => (
                  <div key={metric.label} className="flex flex-col">
                    <span className="font-mono text-[11px] text-[#8a8a86] uppercase mb-2">
                      {metric.label}
                    </span>
                    <span className="font-display font-light text-4xl sm:text-5xl text-[#f2f2ee] tracking-tight leading-none tabular-nums text-emerald-400">
                      {metric.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </RevealWrapper>
        )}

        {/* Architecture & Topology Blueprint */}
        {caseStudy && (
          <RevealWrapper delay={0.15}>
            <div className="mb-16 p-8 md:p-10 bg-[#0d0d0d] border border-[rgba(242,242,238,0.1)] rounded-lg font-mono">
              <div className="flex items-center justify-between pb-6 border-b border-[rgba(242,242,238,0.08)] mb-8">
                <div className="flex items-center gap-3">
                  <Server className="w-5 h-5 text-emerald-400" />
                  <h2 className="font-display text-3xl text-[#f2f2ee] tracking-wide">
                    SYSTEM TOPOLOGY &amp; DATA FLOW
                  </h2>
                </div>
                <span className="text-[11px] text-[#52524e] hidden sm:inline uppercase">
                  ARCHITECTURE BLUEPRINT
                </span>
              </div>

              <p className="font-sans text-sm text-[#8a8a86] mb-8 leading-relaxed">
                {caseStudy.architecture.summary}
              </p>

              {/* Topology Nodes Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {caseStudy.architecture.nodes.map((node) => (
                  <div
                    key={node.name}
                    className="p-5 bg-[#121212] border border-[rgba(242,242,238,0.08)] rounded-md hover:border-emerald-400/40 transition-colors"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-bold text-[#f2f2ee]">{node.name}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    </div>
                    <span className="text-[11px] text-emerald-400 block mb-1">{node.role}</span>
                    <div className="flex justify-between text-[10px] text-[#52524e] pt-2 border-t border-[rgba(242,242,238,0.04)]">
                      <span>{node.type}</span>
                      <span className="text-[#8a8a86]">{node.status}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Step-by-Step Flow List */}
              <div className="p-6 bg-[#080808] border border-[rgba(242,242,238,0.06)] rounded-md">
                <span className="text-[11px] text-emerald-400 uppercase tracking-widest block mb-4 font-bold">
                  TRANSMISSION SEQUENCE // DATA PATH:
                </span>
                <div className="space-y-3 font-mono text-xs">
                  {caseStudy.architecture.flow.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-[#8a8a86]">
                      <span className="text-emerald-400 font-bold shrink-0">
                        [0{idx + 1}]
                      </span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </RevealWrapper>
        )}

        {/* The Challenge & The Engineering Solution */}
        {caseStudy && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* The Challenge */}
            <RevealWrapper delay={0.2}>
              <div className="h-full p-8 bg-[#0a0a0a] border border-[rgba(242,242,238,0.1)] rounded-lg flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[rgba(242,242,238,0.06)]">
                    <AlertTriangle className="w-5 h-5 text-amber-400" />
                    <h3 className="font-display text-2xl text-[#f2f2ee] tracking-wide">
                      {caseStudy.challenge.title}
                    </h3>
                  </div>

                  <p className="font-sans text-sm text-[#8a8a86] leading-relaxed mb-6">
                    {caseStudy.challenge.description}
                  </p>

                  <div className="space-y-3">
                    {caseStudy.challenge.points.map((pt, i) => (
                      <div key={i} className="flex items-start gap-3 font-sans text-xs text-[#cccccc]">
                        <span className="text-amber-400 font-bold font-mono">✕</span>
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-[rgba(242,242,238,0.06)] font-mono text-[11px] text-[#52524e]">
                  STATUS: BOTTLENECK RESOLVED
                </div>
              </div>
            </RevealWrapper>

            {/* The Solution */}
            <RevealWrapper delay={0.3}>
              <div className="h-full p-8 bg-[#0a0a0a] border border-[rgba(242,242,238,0.1)] rounded-lg flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[rgba(242,242,238,0.06)]">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <h3 className="font-display text-2xl text-[#f2f2ee] tracking-wide">
                      {caseStudy.solution.title}
                    </h3>
                  </div>

                  <p className="font-sans text-sm text-[#8a8a86] leading-relaxed mb-6">
                    {caseStudy.solution.description}
                  </p>

                  <div className="space-y-3">
                    {caseStudy.solution.points.map((pt, i) => (
                      <div key={i} className="flex items-start gap-3 font-sans text-xs text-[#cccccc]">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-[rgba(242,242,238,0.06)] font-mono text-[11px] text-emerald-400">
                  VERIFICATION: PASS (BENCHMARKED)
                </div>
              </div>
            </RevealWrapper>
          </div>
        )}

        {/* Technical Specifications Table */}
        {caseStudy && (
          <RevealWrapper delay={0.25}>
            <div className="mb-16 p-8 bg-[#0a0a0a] border border-[rgba(242,242,238,0.1)] rounded-lg font-mono">
              <span className="text-xs text-emerald-400 uppercase tracking-widest block mb-6 font-bold">
                03 // ENGINEERING SPECIFICATIONS
              </span>

              <div className="divide-y divide-[rgba(242,242,238,0.06)]">
                {caseStudy.specifications.map((spec) => (
                  <div key={spec.label} className="py-3.5 flex flex-col sm:flex-row justify-between text-xs gap-2">
                    <span className="text-[#8a8a86] uppercase tracking-wider">{spec.label}</span>
                    <span className="text-[#f2f2ee] font-semibold">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </RevealWrapper>
        )}

        {/* Key Measurable Results */}
        {caseStudy && (
          <RevealWrapper delay={0.3}>
            <div className="mb-20 p-8 bg-[#0d0d0d] border border-emerald-400/30 rounded-lg font-mono">
              <span className="text-xs text-emerald-400 uppercase tracking-widest block mb-4 font-bold">
                04 // PRODUCTION OUTCOMES &amp; DELIVERABLES
              </span>
              <div className="space-y-3 font-sans text-sm text-[#cccccc]">
                {caseStudy.keyResults.map((res, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{res}</span>
                  </div>
                ))}
              </div>
            </div>
          </RevealWrapper>
        )}

        {/* Bottom Next/Prev Project Navigator */}
        <div className="pt-12 border-t border-[rgba(242,242,238,0.1)] flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-6 font-mono text-xs">
          <Link
            to={`/project/${prevProject.id}`}
            className="group p-5 bg-[#0a0a0a] border border-[rgba(242,242,238,0.08)] hover:border-[rgba(242,242,238,0.3)] rounded-lg flex items-center gap-4 transition-all flex-1"
          >
            <ArrowLeft className="w-5 h-5 text-[#8a8a86] group-hover:-translate-x-1 group-hover:text-emerald-400 transition-transform" />
            <div>
              <span className="text-[10px] text-[#52524e] uppercase block">PREVIOUS PROJECT</span>
              <span className="text-sm text-[#f2f2ee] font-bold group-hover:text-emerald-300 transition-colors">
                {prevProject.title}
              </span>
            </div>
          </Link>

          <Link
            to={`/project/${nextProject.id}`}
            className="group p-5 bg-[#0a0a0a] border border-[rgba(242,242,238,0.08)] hover:border-emerald-400/40 rounded-lg flex items-center justify-between sm:justify-end gap-4 transition-all flex-1 text-right"
          >
            <div>
              <span className="text-[10px] text-emerald-400 uppercase block font-bold">NEXT CASE STUDY</span>
              <span className="text-sm text-[#f2f2ee] font-bold group-hover:text-emerald-300 transition-colors">
                {nextProject.title}
              </span>
            </div>
            <ArrowRight className="w-5 h-5 text-emerald-400 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};
