import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { SmoothScroll } from './components/layout/SmoothScroll';
import { Preloader } from './components/layout/Preloader';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { TerminalModal } from './components/ui/TerminalModal';
import { CommandPalette } from './components/ui/CommandPalette';
import { CustomCursor } from './components/ui/CustomCursor';
import { ScrollToTop } from './components/layout/ScrollToTop';
import { FloatingBackToTop } from './components/ui/FloatingBackToTop';
import { useDynamicTabTitle } from './hooks/useDynamicTabTitle';

import { HomePage } from './pages/HomePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { LabPage } from './pages/LabPage';
import { CvPage } from './pages/CvPage';

export const App: React.FC = () => {
  useDynamicTabTitle();
  const [loading, setLoading] = useState(true);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  // Global Ctrl+K / Cmd+K shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <LanguageProvider>
      <BrowserRouter>
        <ScrollToTop />
        <CustomCursor />
        {loading && <Preloader onComplete={() => setLoading(false)} />}

        <SmoothScroll>
          <div className="grain-overlay" aria-hidden="true" />
          <div className="min-h-screen bg-[#050505] text-[#f2f2ee] selection:bg-[#f2f2ee] selection:text-[#050505] relative overflow-hidden flex flex-col justify-between">
            <Navbar
              onOpenTerminal={() => setTerminalOpen(true)}
              onOpenCommandPalette={() => setCommandPaletteOpen(true)}
            />

            <main className="flex-1">
              <Routes>
                <Route
                  path="/"
                  element={<HomePage onOpenTerminal={() => setTerminalOpen(true)} />}
                />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/project/:id" element={<ProjectDetailPage />} />
                <Route
                  path="/lab"
                  element={<LabPage onOpenTerminal={() => setTerminalOpen(true)} />}
                />
                <Route path="/cv" element={<CvPage />} />
              </Routes>
            </main>

            <Footer />

            {/* Interactive Terminal Modal */}
            <TerminalModal
              isOpen={terminalOpen}
              onClose={() => setTerminalOpen(false)}
            />

            {/* Command Palette (Ctrl+K) */}
            <CommandPalette
              isOpen={commandPaletteOpen}
              onClose={() => setCommandPaletteOpen(false)}
              onOpenTerminal={() => setTerminalOpen(true)}
            />

            {/* Floating Back To Top Button [↑] */}
            <FloatingBackToTop />
          </div>
        </SmoothScroll>
      </BrowserRouter>
    </LanguageProvider>
  );
};

export default App;
