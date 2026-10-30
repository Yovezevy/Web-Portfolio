import React from 'react';
import { ArrowLeft, Printer, Mail, Globe, MapPin, CheckCircle, ShieldCheck, BookOpen, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { profileData } from '../data/profile';
import { experienceData } from '../data/experience';
import { skillsData } from '../data/skills';

export const CvPage: React.FC = () => {
  const handlePrint = () => {
    window.print();
  };

  const certifications = [
    { title: "Cisco Certified Network Associate (CCNA 200-301)", issuer: "Cisco Systems", id: "#478915238", period: "2024 — 2027" },
    { title: "Fortinet Certified Associate (FCA)", issuer: "Fortinet", id: "#2338830402MI", period: "2024 — 2026" },
    { title: "Fortinet Certified Fundamental (FCF)", issuer: "Fortinet", id: "#9586998811MI", period: "2024 — 2026" },
    { title: "MikroTik Certified Routing Engineer (MTCRE)", issuer: "MikroTik", id: "#2302RE3845", period: "2023 — 2026" },
    { title: "MikroTik Certified Network Associate (MTCNA)", issuer: "MikroTik", id: "#2404NA1557", period: "2024 — 2027" },
    { title: "Network Security Expert 2 (NSE 2)", issuer: "Fortinet", id: "#6KFdl9tbu1", period: "2023 — 2025" },
    { title: "Network Security Expert 1 (NSE 1)", issuer: "Fortinet", id: "Verified", period: "2023 — 2025" },
  ];

  const publishedBooks = [
    { title: "Path Of Cisco #2 - CCNP", pages: "254 Pages", date: "December 2023", focus: "Enterprise Routing, BGP, Redistribution" },
    { title: "Path Of Cisco - CCNA", pages: "117 Pages", date: "June 2023", focus: "Switching, VLAN, OSPF, Routing Fundamentals" },
    { title: "Path Of MikroTik #2 - MTCRE", pages: "77 Pages", date: "November 2022", focus: "RouterOS Advanced Routing & Tunneling" },
    { title: "Path Of MikroTik - MTCNA", pages: "199 Pages", date: "November 2022", focus: "RouterOS, Queue Tree QoS, Firewall, Wireless" },
    { title: "Amazon With Saturn - AWS", pages: "125 Pages", date: "April 2024", focus: "AWS Cloud Infrastructure & Services" },
  ];

  const competitions = [
    { title: "Compfest Capture The Flag (CTF) — Rank 6", organizer: "Universitas Indonesia (UI)", year: "2026" },
    { title: "ITFEST (IT Network System Administration) — 5th Finalist", organizer: "Institut Pertanian Bogor (IPB)", year: "2026" },
    { title: "NETCOMP 4.0 (Networking Competition) — Finalist", organizer: "Universitas Gadjah Mada (UGM)", year: "2025" },
    { title: "E-Time (Network Competition) — 5th Finalist", organizer: "Politeknik Negeri Jakarta (PNJ)", year: "2023" },
    { title: "Politeknik Negeri Bali IT #15 (Networking) — 4th Finalist", organizer: "Politeknik Negeri Bali", year: "2023" },
    { title: "Politeknik Negeri Bali IT #14 (Networking) — 4th Finalist", organizer: "Politeknik Negeri Bali", year: "2022" },
  ];

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 bg-[#050505] text-[#f2f2ee]">
      <div className="max-w-5xl mx-auto">
        {/* Navigation & Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10 print:hidden">
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-mono text-xs text-[#8a8a86] hover:text-[#f2f2ee] transition-colors uppercase tracking-widest"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>RETURN TO OVERVIEW</span>
          </Link>

          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#f2f2ee] text-[#050505] hover:bg-emerald-400 font-mono text-xs font-bold transition-all rounded uppercase tracking-wider"
          >
            <Printer className="w-4 h-4" />
            <span>PRINT / SAVE AS PDF</span>
          </button>
        </div>

        {/* Printable Resume Container */}
        <div className="p-8 md:p-14 bg-[#0a0a0a] border border-[rgba(242,242,238,0.12)] rounded-lg font-mono print:bg-white print:text-black print:border-none print:p-0">
          {/* Header */}
          <div className="pb-8 border-b border-[rgba(242,242,238,0.1)] mb-8">
            <span className="text-xs text-emerald-400 uppercase tracking-widest block mb-2 font-bold">
              CURRICULUM VITAE // VERIFIED PROFILE
            </span>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-[#f2f2ee] uppercase mb-2 print:text-black">
              {profileData.name}
            </h1>
            <p className="font-mono text-base text-emerald-400 font-semibold mb-4">
              {profileData.role}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-xs text-[#8a8a86] print:text-gray-700">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                {profileData.location}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                {profileData.email}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
                its.id/Portofolio_Ihsan
              </span>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="mb-10">
            <h2 className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-3">
              01 // EXECUTIVE SUMMARY
            </h2>
            <p className="font-sans text-sm md:text-base text-[#8a8a86] leading-relaxed print:text-gray-800">
              {profileData.bio[0]} {profileData.bio[1]}
            </p>
          </div>

          {/* Formal Education */}
          <div className="mb-10">
            <h2 className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-4">
              02 // FORMAL EDUCATION
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-[#111111] border border-[rgba(242,242,238,0.06)] rounded print:bg-gray-100 print:border-gray-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1 text-xs">
                  <h3 className="font-bold text-[#f2f2ee] print:text-black">
                    Institut Teknologi Sepuluh Nopember (ITS)
                  </h3>
                  <span className="text-[#8a8a86] print:text-gray-600">2024 — Present</span>
                </div>
                <p className="text-xs text-emerald-400">Bachelor of Computer Engineering (Teknik Komputer)</p>
                <p className="text-[11px] text-[#52524e] mt-1 print:text-gray-600">
                  Specializing in Computer Systems, Network Architectures &amp; Distributed Systems.
                </p>
              </div>

              <div className="p-4 bg-[#111111] border border-[rgba(242,242,238,0.06)] rounded print:bg-gray-100 print:border-gray-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1 text-xs">
                  <h3 className="font-bold text-[#f2f2ee] print:text-black">
                    IDN Boarding School Bogor
                  </h3>
                  <span className="text-[#8a8a86] print:text-gray-600">June 2022 — 2024</span>
                </div>
                <p className="text-xs text-emerald-400">Vocational High School — Computer &amp; Network Engineering</p>
                <p className="text-[11px] text-[#52524e] mt-1 print:text-gray-600">
                  Focus on Cisco CCNA/CCNP, MikroTik MTCNA/MTCRE certification curriculum and network labs.
                </p>
              </div>
            </div>
          </div>

          {/* Official Certifications */}
          <div className="mb-10">
            <h2 className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-4">
              03 // VENDOR CERTIFICATIONS
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {certifications.map((cert) => (
                <div
                  key={cert.title}
                  className="p-3.5 bg-[#111111] border border-[rgba(242,242,238,0.06)] rounded flex items-start gap-3 print:bg-gray-100 print:border-gray-300"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-xs font-bold text-[#f2f2ee] print:text-black">
                      {cert.title}
                    </h3>
                    <p className="text-[11px] text-[#8a8a86] print:text-gray-600">
                      {cert.issuer} • <span className="text-emerald-400 font-mono">{cert.id}</span>
                    </p>
                    <p className="text-[10px] text-[#52524e] print:text-gray-500">Validity: {cert.period}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Published Technical Books */}
          <div className="mb-10">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-widest mb-4">
              <BookOpen className="w-4 h-4" />
              <span>04 // PUBLISHED TECHNICAL BOOKS (5 TITLES • 772 PAGES)</span>
            </div>
            <div className="space-y-3">
              {publishedBooks.map((book) => (
                <div
                  key={book.title}
                  className="p-4 bg-[#111111] border border-[rgba(242,242,238,0.06)] rounded flex flex-col sm:flex-row sm:items-center justify-between gap-2 print:bg-gray-100 print:border-gray-300"
                >
                  <div>
                    <h3 className="text-xs font-bold text-[#f2f2ee] print:text-black">{book.title}</h3>
                    <p className="text-[11px] text-[#8a8a86] print:text-gray-600">{book.focus}</p>
                  </div>
                  <div className="text-left sm:text-right text-[11px] font-mono shrink-0">
                    <span className="text-emerald-400 font-semibold">{book.pages}</span>
                    <span className="text-[#52524e] block print:text-gray-500">{book.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Professional Experience */}
          <div className="mb-10">
            <h2 className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-6">
              05 // WORK &amp; TEACHING EXPERIENCE
            </h2>
            <div className="space-y-8">
              {experienceData.map((exp) => (
                <div
                  key={exp.period + exp.company}
                  className="pb-6 border-b border-[rgba(242,242,238,0.06)] last:border-none print:border-gray-200"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                    <h3 className="text-sm font-bold text-[#f2f2ee] print:text-black">
                      {exp.role} <span className="text-emerald-400 font-normal">@ {exp.company}</span>
                    </h3>
                    <span className="text-xs text-[#8a8a86] print:text-gray-600">
                      {exp.period}
                    </span>
                  </div>

                  <p className="font-sans text-xs md:text-sm text-[#8a8a86] mb-3 print:text-gray-800">
                    {exp.description}
                  </p>

                  <div className="space-y-1.5 mb-3">
                    {exp.achievements.map((ach, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs font-sans text-[#cccccc] print:text-gray-700">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{ach}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {exp.technologies.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] px-2 py-0.5 bg-[rgba(242,242,238,0.04)] text-[#8a8a86] border border-[rgba(242,242,238,0.06)] rounded print:border-gray-300 print:text-gray-700"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Competitions & Accolades */}
          <div className="mb-10">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-widest mb-4">
              <Trophy className="w-4 h-4" />
              <span>06 // COMPETITIVE ACCOLADES &amp; AWARDS</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {competitions.map((comp) => (
                <div
                  key={comp.title}
                  className="p-3.5 bg-[#111111] border border-[rgba(242,242,238,0.06)] rounded print:bg-gray-100 print:border-gray-300"
                >
                  <h3 className="text-xs font-bold text-[#f2f2ee] print:text-black">{comp.title}</h3>
                  <p className="text-[11px] text-[#8a8a86] print:text-gray-600">{comp.organizer}</p>
                  <span className="text-[10px] text-emerald-400 block mt-1">{comp.year}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Protocol Matrix */}
          <div className="mb-10">
            <h2 className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-4">
              07 // TECHNICAL PROTOCOL CAPABILITIES
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {skillsData.map((cat) => (
                <div
                  key={cat.title}
                  className="p-4 bg-[#111111] border border-[rgba(242,242,238,0.06)] rounded print:bg-gray-100 print:border-gray-300"
                >
                  <h3 className="font-bold text-[#f2f2ee] mb-2 print:text-black">{cat.title}:</h3>
                  <p className="text-[11px] text-[#8a8a86] print:text-gray-700">
                    {cat.skills.map((s) => s.name).join(' • ')}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div>
            <h2 className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-3">
              08 // LANGUAGE PROFICIENCY
            </h2>
            <div className="flex flex-wrap gap-6 text-xs text-[#8a8a86] print:text-gray-800">
              <div>
                <span className="font-bold text-[#f2f2ee] print:text-black">Indonesian:</span> Native (UKBI: 689)
              </div>
              <div>
                <span className="font-bold text-[#f2f2ee] print:text-black">English:</span> Professional (TEFL: 520 • IELTS: 6.5)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
