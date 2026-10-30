import React, { createContext, useContext, useState } from 'react';

export type Language = 'en' | 'id';

interface Translations {
  [key: string]: {
    en: string;
    id: string;
  };
}

export const translations: Translations = {
  // Navigation
  navOverview: { en: "01 // OVERVIEW", id: "01 // BERANDA" },
  navProjects: { en: "02 // PROJECTS", id: "02 // PROYEK" },
  navLab: { en: "03 // THE LAB", id: "03 // LABORATORIUM" },
  navStack: { en: "04 // STACK", id: "04 // KEAHLIAN" },
  navExperience: { en: "05 // EXPERIENCE", id: "05 // KARIR" },
  navCv: { en: "04 // CV", id: "04 // CV" },
  navContact: { en: "07 // CONTACT", id: "07 // KONTAK" },
  navOnline: { en: "ONLINE", id: "AKTIF" },

  // Hero
  heroTagline: {
    en: "NETWORK ENGINEER & WEB DEVELOPER",
    id: "NETWORK ENGINEER & PENGEMBANG WEB",
  },
  heroTitle1: { en: "ARCHITECTING", id: "MERANCANG" },
  heroTitle2: { en: "NETWORKS", id: "JARINGAN" },
  heroTitle3: { en: "& WEB INTERFACES.", id: "& TAMPILAN WEB." },
  heroDesc: {
    en: "I bridge the gap between deep systems infrastructure and modern high-performance web applications. From designing fault-tolerant BGP routing and enterprise VPN topologies to building reactive web interfaces with React and TypeScript.",
    id: "Menjembatani infrastruktur sistem jaringan tingkat lanjut dengan aplikasi web modern berkinerja tinggi. Dari perancangan routing BGP berkeandalan tinggi dan topologi VPN perusahaan, hingga antarmuka web reaktif dengan React dan TypeScript.",
  },
  heroExplore: { en: "EXPLORE WORK", id: "LIHAT KARYA" },
  heroCli: { en: "LAUNCH CLI TERMINAL", id: "BUKA TERMINAL CLI" },
  heroScroll: { en: "SCROLL TO DISCOVER", id: "GULIR KE BAWAH" },
  heroStatus: { en: "AVAILABLE FOR CONTRACT & FULL-TIME", id: "TERSEDIA UNTUK KONTRAK & FULL-TIME" },

  // Metrics
  metricUptime: { en: "NETWORK UPTIME", id: "UPTIME JARINGAN" },
  metricLatency: { en: "LATENCY TARGET", id: "TARGET LATENSI" },
  metricSystems: { en: "SYSTEMS DEPLOYED", id: "SISTEM TERPASANG" },
  metricAudits: { en: "SECURITY AUDITS", id: "AUDIT KEAMANAN" },

  // Projects
  projTag: { en: "02 // SELECTED WORK", id: "02 // KARYA PILIHAN" },
  projTitle1: { en: "SYSTEMS, NETWORKS", id: "SISTEM, JARINGAN" },
  projTitle2: { en: "& WEB APPS", id: "& APLIKASI WEB" },
  projDesc: {
    en: "Production-grade infrastructures, automated VPN meshes, and high-performance web applications deployed end-to-end.",
    id: "Infrastruktur kelas produksi, jaringan mesh VPN otomatis, dan aplikasi web performa tinggi dari hulu ke hilir.",
  },
  allProjectsBtn: { en: "VIEW ALL PROJECTS →", id: "LIHAT SEMUA PROYEK →" },

  // The Lab
  labTag: { en: "03 // THE LAB & EXPERIMENTS", id: "03 // LAB & EKSPERIMEN" },
  labTitle1: { en: "SYSTEMS DISSECTED", id: "BEDAH SISTEM" },
  labTitle2: { en: "LIVE IN THE BROWSER", id: "LANGSUNG DI BROWSER" },
  labDesc: {
    en: "Interactive prototypes, network topology simulators, and honest component autopsies inspired by creative coding.",
    id: "Prototipe interaktif, simulator topologi jaringan, dan bedah komponen terbuka berjiwa creative coding.",
  },
  exploreLabBtn: { en: "ENTER THE FULL LAB →", id: "MASUK KE LAB LENGKAP →" },

  // Skills
  skillsTag: { en: "04 // TECHNICAL SPECIFICATIONS", id: "04 // SPESIFIKASI TEKNIS" },
  skillsTitle1: { en: "ROUTING PROTOCOLS", id: "PROTOKOL ROUTING" },
  skillsTitle2: { en: "& CODE RUNTIMES", id: "& RUNTIME KODE" },

  // Experience
  expTag: { en: "05 // TRACK RECORD", id: "05 // REKAM JEJAK" },
  expTitle1: { en: "CAREER JOURNEY", id: "PERJALANAN KARIR" },
  expTitle2: { en: "& RESPONSIBILITIES", id: "& TANGGUNG JAWAB" },

  // Contact
  contactTag: { en: "07 // ESTABLISH CONNECTION", id: "07 // BANGUN KONEKSI" },
  contactTitle1: { en: "LET'S WORK", id: "MARI KERJA" },
  contactTitle2: { en: "TOGETHER.", id: "SAMA." },
  contactCopy: { en: "COPY EMAIL", id: "SALIN EMAIL" },
  contactCopied: { en: "COPIED!", id: "TERSALIN!" },
  contactSend: { en: "SEND TRANSMISSION", id: "KIRIM PESAN" },
  contactSent: { en: "MESSAGE TRANSMITTED!", id: "PESAN TERKIRIM!" },
};

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  setLang: () => {},
  t: (key: string) => key,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem('portfolio_lang');
    return (saved === 'id' || saved === 'en') ? saved : 'en';
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('portfolio_lang', newLang);
  };

  const t = (key: string): string => {
    if (translations[key]) {
      return translations[key][lang] || translations[key].en;
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
