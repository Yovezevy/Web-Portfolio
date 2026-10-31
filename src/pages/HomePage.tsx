import React, { useState } from 'react';
import { HeroSection } from '../components/sections/HeroSection';
import { MetricsBar } from '../components/sections/MetricsBar';
import { ManifestoBand } from '../components/sections/ManifestoBand';
import { AboutSection } from '../components/sections/AboutSection';
import { RadialWarpShowcase } from '../components/sections/RadialWarpShowcase';
import { HorizontalProjectsSection } from '../components/sections/HorizontalProjectsSection';
import { LabSection } from '../components/sections/LabSection';
import { SkillsSection } from '../components/sections/SkillsSection';
import { JourneySection } from '../components/sections/JourneySection';
import { CertificatesSection } from '../components/sections/CertificatesSection';
import { ExperienceSection } from '../components/sections/ExperienceSection';
import { ContactSection } from '../components/sections/ContactSection';
import { CertificateModal } from '../components/ui/CertificateModal';
import type { Certificate } from '../data/certificates';

interface HomePageProps {
  onOpenTerminal: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenTerminal }) => {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

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
      <CertificatesSection onSelectCertificate={(cert) => setSelectedCert(cert)} />
      <ExperienceSection />
      <ContactSection />

      {/* Interactive Official Certificate Lightbox Modal */}
      <CertificateModal
        certificate={selectedCert}
        onClose={() => setSelectedCert(null)}
      />
    </div>
  );
};
