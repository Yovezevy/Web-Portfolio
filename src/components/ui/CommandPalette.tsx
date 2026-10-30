import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  ArrowRight,
  Terminal,
  Languages,
  Eye,
  Printer,
  Copy,
  Check,
  BookOpen,
  Server,
  Layers
} from 'lucide-react';
import { projectsData } from '../../data/projects';
import { profileData } from '../../data/profile';
import { useLanguage } from '../../context/LanguageContext';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenTerminal: () => void;
}

interface CommandItem {
  id: string;
  category: 'PAGES' | 'CASE STUDIES' | 'TECHNICAL BOOKS' | 'ACTIONS';
  title: string;
  subtitle?: string;
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onOpenTerminal,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { lang, setLang } = useLanguage();

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const toggleLanguage = () => {
    setLang(lang === 'en' ? 'id' : 'en');
    onClose();
  };

  const toggleInvertMode = () => {
    document.body.classList.toggle('inverted');
    onClose();
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.email);
    setCopiedEmail(true);
    setTimeout(() => {
      setCopiedEmail(false);
      onClose();
    }, 1200);
  };

  const handlePrintCv = () => {
    navigate('/cv');
    onClose();
    setTimeout(() => window.print(), 300);
  };

  // Compile all searchable commands
  const allCommands: CommandItem[] = [
    // Pages
    {
      id: 'page-home',
      category: 'PAGES',
      title: 'Home // Overview',
      subtitle: 'Hero 3D Sphere, Philosophy, Topologies & Contact',
      icon: Layers,
      action: () => { navigate('/'); onClose(); },
    },
    {
      id: 'page-projects',
      category: 'PAGES',
      title: 'Projects Archive',
      subtitle: 'Comprehensive repository and system index',
      icon: Server,
      action: () => { navigate('/projects'); onClose(); },
    },
    {
      id: 'page-lab',
      category: 'PAGES',
      title: 'The Lab & Experiments',
      subtitle: 'Topology visualizer, component dissections & ping diagnostics',
      icon: Terminal,
      action: () => { navigate('/lab'); onClose(); },
    },
    {
      id: 'page-cv',
      category: 'PAGES',
      title: 'Curriculum Vitae / Resume',
      subtitle: 'Formal education, certifications & publications',
      icon: BookOpen,
      action: () => { navigate('/cv'); onClose(); },
    },

    // Case Studies
    ...projectsData.map((project) => ({
      id: `case-study-${project.id}`,
      category: 'CASE STUDIES' as const,
      title: project.title,
      subtitle: `${project.category} • ${project.year} • ${project.role}`,
      icon: ArrowRight,
      action: () => { navigate(`/project/${project.id}`); onClose(); },
    })),

    // Technical Books
    {
      id: 'book-cisco-ccnp',
      category: 'TECHNICAL BOOKS',
      title: 'Path Of Cisco #2 - CCNP (254 Pages)',
      subtitle: 'Authored by Muhammad Ihsan • Dec 2023 • Advanced BGP & Enterprise Routing',
      icon: BookOpen,
      action: () => { navigate('/project/published-technical-books'); onClose(); },
    },
    {
      id: 'book-cisco-ccna',
      category: 'TECHNICAL BOOKS',
      title: 'Path Of Cisco - CCNA (117 Pages)',
      subtitle: 'Authored by Muhammad Ihsan • June 2023 • Switching, VLAN, OSPF',
      icon: BookOpen,
      action: () => { navigate('/project/published-technical-books'); onClose(); },
    },
    {
      id: 'book-mikrotik-mtcre',
      category: 'TECHNICAL BOOKS',
      title: 'Path Of MikroTik #2 - MTCRE (77 Pages)',
      subtitle: 'Authored by Muhammad Ihsan • Nov 2022 • RouterOS Advanced Routing',
      icon: BookOpen,
      action: () => { navigate('/project/published-technical-books'); onClose(); },
    },
    {
      id: 'book-mikrotik-mtcna',
      category: 'TECHNICAL BOOKS',
      title: 'Path Of MikroTik - MTCNA (199 Pages)',
      subtitle: 'Authored by Muhammad Ihsan • Nov 2022 • Complete RouterOS Guide',
      icon: BookOpen,
      action: () => { navigate('/project/published-technical-books'); onClose(); },
    },
    {
      id: 'book-aws-cloud',
      category: 'TECHNICAL BOOKS',
      title: 'Amazon With Saturn - AWS (125 Pages)',
      subtitle: 'Authored by Muhammad Ihsan • April 2024 • Cloud Architecture',
      icon: BookOpen,
      action: () => { navigate('/project/published-technical-books'); onClose(); },
    },

    // Quick Actions
    {
      id: 'action-cli',
      category: 'ACTIONS',
      title: 'Launch Interactive CLI Terminal',
      subtitle: 'Access pseudo-bash shell (ping, traceroute, status)',
      icon: Terminal,
      action: () => { onClose(); onOpenTerminal(); },
    },
    {
      id: 'action-lang',
      category: 'ACTIONS',
      title: `Switch Language to ${lang === 'en' ? 'Bahasa Indonesia' : 'English'}`,
      subtitle: `Current: ${lang.toUpperCase()}`,
      icon: Languages,
      action: toggleLanguage,
    },
    {
      id: 'action-invert',
      category: 'ACTIONS',
      title: 'Toggle Negative / Invert Mode Easter Egg',
      subtitle: 'Invert website contrast palette',
      icon: Eye,
      action: toggleInvertMode,
    },
    {
      id: 'action-print-cv',
      category: 'ACTIONS',
      title: 'Print / Download Official CV (PDF)',
      subtitle: 'Opens printable layout and triggers print dialogue',
      icon: Printer,
      action: handlePrintCv,
    },
    {
      id: 'action-copy-email',
      category: 'ACTIONS',
      title: copiedEmail ? 'Email Copied!' : 'Copy Direct Email Address',
      subtitle: profileData.email,
      icon: copiedEmail ? Check : Copy,
      action: handleCopyEmail,
    },
  ];

  // Filter commands by search query
  const filteredCommands = allCommands.filter((cmd) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      cmd.title.toLowerCase().includes(q) ||
      cmd.category.toLowerCase().includes(q) ||
      (cmd.subtitle && cmd.subtitle.toLowerCase().includes(q))
    );
  });

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
        }
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, filteredCommands, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:px-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-150 font-mono"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-[#0c0c0c] border border-[rgba(242,242,238,0.2)] rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[75vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[rgba(242,242,238,0.1)] bg-[#111111]">
          <Search className="w-5 h-5 text-emerald-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command, project, book, or protocol (e.g. BGP, Fortinet, CV)..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            className="w-full bg-transparent border-none outline-none text-sm text-[#f2f2ee] font-mono placeholder:text-[#52524e]"
            spellCheck={false}
          />
          <button
            onClick={onClose}
            className="text-[#8a8a86] hover:text-[#f2f2ee] p-1 text-xs tracking-widest uppercase"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-3 space-y-1 text-xs">
          {filteredCommands.length === 0 ? (
            <div className="p-8 text-center text-[#52524e]">
              <p>NO MATCHING DIRECTORY ENTRIES</p>
              <p className="text-[11px] mt-1">Try searching for 'Cisco', 'MikroTik', 'CV', or 'Lang'</p>
            </div>
          ) : (
            filteredCommands.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={item.action}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`p-3 rounded-md flex items-center justify-between cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-emerald-400/15 border border-emerald-400/40 text-[#f2f2ee]'
                      : 'hover:bg-[rgba(242,242,238,0.04)] text-[#8a8a86] border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded ${
                        isSelected ? 'bg-emerald-400 text-[#050505]' : 'bg-[rgba(242,242,238,0.05)] text-[#8a8a86]'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#f2f2ee]">{item.title}</span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-[rgba(242,242,238,0.05)] text-[#52524e] uppercase">
                          {item.category}
                        </span>
                      </div>
                      {item.subtitle && (
                        <p className="text-[11px] text-[#52524e] mt-0.5">{item.subtitle}</p>
                      )}
                    </div>
                  </div>

                  {isSelected && (
                    <span className="text-[10px] text-emerald-400 uppercase tracking-widest font-bold hidden sm:inline">
                      SELECT ↵
                    </span>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Bottom Bar Help Guide */}
        <div className="px-5 py-2.5 bg-[#080808] border-t border-[rgba(242,242,238,0.06)] flex items-center justify-between text-[11px] text-[#52524e]">
          <div className="flex items-center gap-4">
            <span>↑↓ NAVIGATE</span>
            <span>↵ EXECUTE</span>
            <span>ESC DISMISS</span>
          </div>
          <span>TOTAL: {filteredCommands.length} COMMANDS</span>
        </div>
      </div>
    </div>
  );
};
