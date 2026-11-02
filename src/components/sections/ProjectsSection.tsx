import React, { useState } from 'react';
import { ExternalLink, Code2, ArrowUpRight } from 'lucide-react';
import { projectsData } from '../../data/projects';
import type { Project } from '../../data/types';

export const ProjectsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('ALL');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = ['ALL', 'Network Engineering', 'Web Development', 'DevOps & Cloud'];

  const filteredProjects = activeFilter === 'ALL'
    ? projectsData
    : projectsData.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="py-24 px-6 md:px-12 border-b border-[rgba(242,242,238,0.1)]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="font-mono text-xs tracking-widest uppercase text-blue-400 mb-3 block">
              02 // SELECTED WORK
            </span>
            <h2 className="font-display font-light text-5xl md:text-7xl uppercase text-[#f2f2ee] tracking-tight">
              SYSTEMS, NETWORKS <br />
              <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#f2f2ee] to-[#8a8a86]">
                &amp; WEB APPS
              </span>
            </h2>
          </div>
          <p className="font-mono text-xs md:text-sm text-[#8a8a86] max-w-md">
            Production-grade infrastructures, automated VPN meshes, and high-performance web applications deployed end-to-end.
          </p>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-12 pb-4 border-b border-[rgba(242,242,238,0.08)] font-mono text-xs tracking-widest uppercase">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded transition-all ${
                activeFilter === cat
                  ? 'bg-[#f2f2ee] text-[#050505] font-bold'
                  : 'text-[#8a8a86] hover:text-[#f2f2ee] hover:bg-[rgba(242,242,238,0.05)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group p-8 bg-[#0a0a0a] border border-[rgba(242,242,238,0.1)] hover:border-[rgba(242,242,238,0.3)] transition-all rounded-lg flex flex-col justify-between"
            >
              <div>
                {/* Card Top: Year & Category */}
                <div className="flex items-center justify-between text-xs font-mono text-[#8a8a86] mb-4">
                  <span className="text-blue-400 font-bold">{project.year}</span>
                  <span className="px-2 py-0.5 rounded bg-[rgba(242,242,238,0.05)] border border-[rgba(242,242,238,0.08)]">
                    {project.category}
                  </span>
                </div>

                {/* Title & Role */}
                <h3 className="font-display text-3xl md:text-4xl text-[#f2f2ee] tracking-wide mb-2 group-hover:text-blue-300 transition-colors">
                  {project.title}
                </h3>
                <p className="font-mono text-xs text-[#52524e] mb-4 uppercase tracking-wider">
                  ROLE: {project.role}
                </p>

                {/* Description */}
                <p className="font-sans text-sm text-[#8a8a86] leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Metrics Badges if present */}
                {project.metrics && project.metrics.length > 0 && (
                  <div className="grid grid-cols-2 gap-3 mb-6 p-3 bg-[#111111] rounded border border-[rgba(242,242,238,0.06)] font-mono text-xs">
                    {project.metrics.map((m) => (
                      <div key={m.label}>
                        <span className="text-[10px] text-[#52524e] uppercase block">{m.label}</span>
                        <span className="text-blue-400 font-semibold">{m.value}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Technology Badges */}
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

              {/* Action Links */}
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
                      <span>REPOSITORY</span>
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
                      <span>LIVE DEMO</span>
                    </a>
                  )}
                </div>

                <button
                  onClick={() => setSelectedProject(project)}
                  className="flex items-center gap-1 text-[#8a8a86] hover:text-[#f2f2ee] transition-colors"
                >
                  <span>SPEC</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Project Detail Modal / Drawer */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-[#0e0e0e] border border-[rgba(242,242,238,0.2)] rounded-lg max-w-2xl w-full p-8 font-mono relative shadow-2xl">
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 text-[#8a8a86] hover:text-[#f2f2ee] text-sm"
              >
                [CLOSE ×]
              </button>

              <span className="text-xs text-blue-400 tracking-widest uppercase block mb-1">
                {selectedProject.category} // {selectedProject.year}
              </span>
              <h3 className="font-display text-3xl text-[#f2f2ee] mb-4">
                {selectedProject.title}
              </h3>

              <div className="text-sm font-sans text-[#8a8a86] leading-relaxed space-y-4 mb-6">
                <p>{selectedProject.longDescription || selectedProject.description}</p>
              </div>

              {selectedProject.metrics && (
                <div className="grid grid-cols-2 gap-4 p-4 bg-[#141414] rounded border border-[rgba(242,242,238,0.08)] mb-6 text-xs">
                  {selectedProject.metrics.map((m) => (
                    <div key={m.label}>
                      <span className="text-[#52524e] uppercase block text-[10px]">{m.label}</span>
                      <span className="text-blue-400 text-sm font-semibold">{m.value}</span>
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
                    className="px-4 py-2 border border-[rgba(242,242,238,0.2)] text-[#f2f2ee] hover:bg-[#f2f2ee] hover:text-[#050505] transition-all rounded"
                  >
                    VIEW CODE
                  </a>
                )}
                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-blue-400 text-[#050505] font-bold hover:bg-blue-300 transition-all rounded"
                  >
                    LAUNCH DEMO
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
