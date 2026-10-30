import React, { useState } from 'react';
import { ExternalLink, Code2, ArrowUpRight, Search, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { projectsData } from '../data/projects';
import type { Project } from '../data/types';
import { KineticText } from '../components/ui/KineticText';
import { RevealWrapper } from '../components/ui/RevealWrapper';

export const ProjectsPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = ['ALL', 'Network Engineering', 'Web Development', 'DevOps & Cloud'];

  const filteredProjects = projectsData.filter((p) => {
    const matchesCategory = activeFilter === 'ALL' || p.category === activeFilter;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

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
          <span className="font-mono text-xs tracking-widest uppercase text-emerald-400 mb-3 block">
            ARCHIVE // 0{projectsData.length} TOTAL REPOSITORIES
          </span>
          <h1 className="font-display font-light text-6xl md:text-8xl uppercase text-[#f2f2ee] tracking-tight">
            <KineticText>PROJECT INDEX</KineticText> <br />
            <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#f2f2ee] via-emerald-300 to-[#8a8a86]">
              <KineticText delay={0.15}>&amp; CASE STUDIES</KineticText>
            </span>
          </h1>
          <p className="mt-4 font-sans text-base text-[#8a8a86] max-w-2xl leading-relaxed">
            Every system built end-to-end, ranging from multi-tenant datacenter telemetry to high-performance web applications.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-12 pb-6 border-b border-[rgba(242,242,238,0.08)] font-mono text-xs">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 rounded transition-all tracking-wider uppercase ${
                  activeFilter === cat
                    ? 'bg-[#f2f2ee] text-[#050505] font-bold'
                    : 'text-[#8a8a86] hover:text-[#f2f2ee] hover:bg-[rgba(242,242,238,0.05)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-[#52524e] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search protocol or tech (e.g. BGP, React)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#0f0f0f] border border-[rgba(242,242,238,0.1)] focus:border-emerald-400 pl-9 pr-4 py-2 rounded text-xs text-[#f2f2ee] outline-none w-full md:w-72 font-mono transition-colors"
            />
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, idx) => (
            <RevealWrapper key={project.id} delay={idx * 0.1}>
              <div
                data-cursor="CASE STUDY"
                className="group h-full p-8 md:p-10 bg-[#0a0a0a] border border-[rgba(242,242,238,0.1)] hover:border-emerald-400/40 hover:-translate-y-1 transition-all duration-300 rounded-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-[#8a8a86] mb-4">
                    <span className="text-emerald-400 font-bold">{project.year}</span>
                    <span className="px-2 py-0.5 rounded bg-[rgba(242,242,238,0.04)] border border-[rgba(242,242,238,0.08)]">
                      {project.category}
                    </span>
                  </div>

                  <Link to={`/project/${project.id}`}>
                    <h2 className="font-display text-3xl md:text-4xl text-[#f2f2ee] tracking-wide mb-2 group-hover:text-emerald-300 transition-colors">
                      {project.title}
                    </h2>
                  </Link>
                  <p className="font-mono text-xs text-[#52524e] mb-4 uppercase tracking-wider">
                    ROLE: {project.role}
                  </p>

                  <p className="font-sans text-sm text-[#8a8a86] leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {project.metrics && (
                    <div className="grid grid-cols-2 gap-3 mb-6 p-3 bg-[#111111] rounded border border-[rgba(242,242,238,0.06)] font-mono text-xs">
                      {project.metrics.map((m) => (
                        <div key={m.label}>
                          <span className="text-[10px] text-[#52524e] uppercase block">{m.label}</span>
                          <span className="text-emerald-400 font-semibold">{m.value}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 mb-8 font-mono text-[11px]">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 bg-[rgba(242,242,238,0.04)] text-[#8a8a86] border border-[rgba(242,242,238,0.06)] rounded-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[rgba(242,242,238,0.06)] flex items-center justify-between font-mono text-xs">
                  <div className="flex items-center gap-4">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-[#8a8a86] hover:text-[#f2f2ee] transition-colors"
                      >
                        <Code2 className="w-3.5 h-3.5" />
                        <span>SOURCE</span>
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
                        <span>LIVE</span>
                      </a>
                    )}
                  </div>

                  <Link
                    to={`/project/${project.id}`}
                    className="flex items-center gap-1 text-[#8a8a86] hover:text-[#f2f2ee] transition-colors"
                  >
                    <span>CASE STUDY</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
                  </Link>
                </div>
              </div>
            </RevealWrapper>
          ))}
        </div>

        {/* Project Detail Modal */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-[#0e0e0e] border border-[rgba(242,242,238,0.2)] rounded-lg max-w-2xl w-full p-8 font-mono relative shadow-2xl">
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 text-[#8a8a86] hover:text-[#f2f2ee] text-xs uppercase tracking-wider"
              >
                [CLOSE ×]
              </button>

              <span className="text-xs text-emerald-400 tracking-widest uppercase block mb-1">
                {selectedProject.category} // {selectedProject.year}
              </span>
              <h2 className="font-display text-4xl text-[#f2f2ee] mb-4">
                {selectedProject.title}
              </h2>

              <div className="text-sm font-sans text-[#8a8a86] leading-relaxed space-y-4 mb-6">
                <p>{selectedProject.longDescription || selectedProject.description}</p>
              </div>

              {selectedProject.metrics && (
                <div className="grid grid-cols-2 gap-4 p-4 bg-[#141414] rounded border border-[rgba(242,242,238,0.08)] mb-6 text-xs">
                  {selectedProject.metrics.map((m) => (
                    <div key={m.label}>
                      <span className="text-[#52524e] uppercase block text-[10px]">{m.label}</span>
                      <span className="text-emerald-400 text-sm font-semibold">{m.value}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProject.tags.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2.5 py-1 bg-[rgba(242,242,238,0.05)] text-[#f2f2ee] border border-[rgba(242,242,238,0.1)] rounded"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex justify-end gap-4 text-xs pt-4 border-t border-[rgba(242,242,238,0.08)]">
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 border border-[rgba(242,242,238,0.2)] text-[#f2f2ee] hover:bg-[#f2f2ee] hover:text-[#050505] transition-all rounded uppercase tracking-wider"
                  >
                    VIEW CODE
                  </a>
                )}
                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-emerald-400 text-[#050505] font-bold hover:bg-emerald-300 transition-all rounded uppercase tracking-wider"
                  >
                    LAUNCH DEMO
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
