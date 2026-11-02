import React from 'react';
import { Award, ArrowUpRight, FileCheck, CheckCircle2 } from 'lucide-react';
import { certificatesData } from '../../data/certificates';
import type { Certificate } from '../../data/certificates';
import { MaskedHeading } from '../ui/MaskedHeading';

interface CertificatesSectionProps {
  onSelectCertificate: (cert: Certificate) => void;
}

export const CertificatesSection: React.FC<CertificatesSectionProps> = ({ onSelectCertificate }) => {
  return (
    <section id="certifications" className="relative py-24 px-6 md:px-12 border-b border-[rgba(242,242,238,0.1)] bg-[#050505] font-mono select-none">
      {/* Background Subtle Radial Lighting Gradient (Matching Reference Aesthetic) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59, 130, 246,0.05)_0%,rgba(5,5,5,0)_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-dots opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs tracking-widest uppercase text-blue-400 mb-3">
              <Award className="w-4 h-4" />
              <span>05 // INDUSTRY CERTIFICATIONS &amp; LICENSES</span>
            </div>
            <MaskedHeading
              as="h2"
              className="font-display font-light text-5xl md:text-7xl uppercase text-[#f2f2ee] tracking-tight block"
            >
              VERIFIED CREDENTIALS
            </MaskedHeading>
            <div className="font-display font-extrabold text-5xl md:text-7xl uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#f2f2ee] via-blue-300 to-[#8a8a86] tracking-tight">
              &amp; ENGINEERING LICENSES
            </div>
          </div>

          <div className="flex flex-col items-start md:items-end gap-2 text-xs text-[#8a8a86]">
            <span className="px-2.5 py-1 bg-[rgba(242,242,238,0.05)] border border-[rgba(242,242,238,0.1)] rounded text-blue-400 font-bold">
              LICENSES · 0{certificatesData.length}
            </span>
            <span className="text-[11px] text-[#52524e]">
              CLICK ANY CERTIFICATE FOR OFFICIAL VERIFICATION
            </span>
          </div>
        </div>

        {/* 6-Box Bento Grid of Official Certificates */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-l border-t border-[rgba(242,242,238,0.12)]">
          {certificatesData.map((cert, idx) => (
            <div
              key={cert.id}
              onClick={() => onSelectCertificate(cert)}
              data-cursor="VIEW CERT"
              className="crosshair relative p-7 sm:p-8 border-r border-b border-[rgba(242,242,238,0.12)] bg-[#070707] hover:bg-[#0c0c0c] transition-all duration-300 group cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Header: Category & Index */}
                <div className="flex items-center justify-between text-xs text-[#8a8a86] mb-5">
                  <span className="text-[10px] text-blue-400 font-bold tracking-widest uppercase">
                    0{idx + 1} // {cert.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-[10px] text-blue-400 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                    <span>{cert.status}</span>
                  </div>
                </div>

                {/* Issuer Badge Box */}
                <div className="mb-3 inline-block px-2.5 py-1 bg-[rgba(242,242,238,0.03)] border border-[rgba(242,242,238,0.08)] group-hover:border-blue-400/40 rounded text-[11px] text-[#8a8a86] transition-colors">
                  {cert.issuer}
                </div>

                {/* Title */}
                <h3 className="font-display text-2xl sm:text-3xl text-[#f2f2ee] tracking-wide mb-2 group-hover:text-blue-300 transition-colors">
                  {cert.title}
                </h3>
                <p className="text-xs text-[#8a8a86] mb-5 font-sans leading-relaxed">
                  {cert.description}
                </p>

                {/* Technical Skills Chips */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {cert.skills.slice(0, 4).map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded text-[10px] bg-[rgba(242,242,238,0.04)] text-[#8a8a86] border border-[rgba(242,242,238,0.06)]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Card Footer with Credential ID & Action Arrow */}
              <div className="pt-4 border-t border-[rgba(242,242,238,0.06)] flex items-center justify-between text-xs text-[#52524e] group-hover:text-[#8a8a86]">
                <div className="flex items-center gap-1.5 font-bold text-[11px] text-[#f2f2ee]">
                  <FileCheck className="w-3.5 h-3.5 text-blue-400" />
                  <span>ID: {cert.credentialId}</span>
                </div>
                <div className="flex items-center gap-1 text-blue-400 group-hover:translate-x-1 transition-transform font-bold text-[11px]">
                  <span>INSPECT</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Assurance Note */}
        <div className="mt-8 pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#52524e]">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-400" />
            <span>ALL CERTIFICATIONS ISSUED POST COMPREHENSIVE PROCTORED INDUSTRY EXAMINATIONS</span>
          </div>
          <span className="text-[#8a8a86] text-[11px]">
            CISCO SYSTEMS • MIKROTIK SIA • FORTINET NSE
          </span>
        </div>
      </div>
    </section>
  );
};
