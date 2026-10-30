import React from 'react';
import { HeroSection } from '../components/sections/HeroSection';
import { MetricsBar } from '../components/sections/MetricsBar';
import { ManifestoBand } from '../components/sections/ManifestoBand';
import { AboutSection } from '../components/sections/AboutSection';
import { RadialWarpShowcase } from '../components/sections/RadialWarpShowcase';
import { HorizontalProjectsSection } from '../components/sections/HorizontalProjectsSection';
import { LabSection } from '../components/sections/LabSection';
import { SkillsSection } from '../components/sections/SkillsSection';
import { JourneySection } from '../components/sections/JourneySection';
import { ExperienceSection } from '../components/sections/ExperienceSection';
import { ContactSection } from '../components/sections/ContactSection';

interface HomePageProps {
  onOpenTerminal: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenTerminal }) => {
  return (
    <div>
      <HeroSection onOpenTerminal={onOpenTerminal} />
      <MetricsBar />
      <ManifestoBand />
      <AboutSection />
      <RadialWarpShowcase />
      <HorizontalProjectsSection />
      <LabSection onOpenTerminal={onOpenTerminal} />
      <JourneySection />
      <SkillsSection />
      <ExperienceSection />
      <ContactSection />
    </div>
  );
};
