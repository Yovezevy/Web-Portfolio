import type { ProfileData } from './types';

/**
 * FILE KONFIGURASI PROFIL - MUHAMMAD IHSAN MALARANGENG
 */
export const profileData: ProfileData = {
  name: "MUHAMMAD IHSAN MALARANGENG",
  tagline: "ARCHITECTING RESILIENT NETWORKS. SECURING ENTERPRISE INFRASTRUCTURE.",
  role: "Junior Network Engineer & Computer Engineering Student",
  location: "Surabaya & Balikpapan, Indonesia",
  coordinates: "-7.2797; 112.7974", // Institut Teknologi Sepuluh Nopember (ITS)
  availability: "AVAILABLE FOR CONTRACT, CONSULTING & FULL-TIME",
  bio: [
    "Computer Engineering student at Institut Teknologi Sepuluh Nopember (ITS) with deep expertise in enterprise networking, multi-vendor routing & switching (Cisco, MikroTik, Fortinet), and cybersecurity systems.",
    "Certified Cisco CCNA, MikroTik MTCRE & MTCNA, and Fortinet FCA/FCF with hands-on experience deploying dual-ISP redundant architectures, enterprise Wazuh SIEM, and authoring 5 published technical books on Cisco, MikroTik, and AWS."
  ],
  metrics: [
    { label: "PUBLISHED BOOKS", value: "5 BOOKS", detail: "Cisco CCNA/CCNP, MikroTik, AWS" },
    { label: "VENDOR CERTS", value: "7 CERTS", detail: "Cisco, MikroTik, Fortinet" },
    { label: "NATIONAL AWARDS", value: "8+ WINS", detail: "Compfest CTF, ITFEST IPB, UGM" },
    { label: "STUDENTS TRAINED", value: "500+", detail: "MTCNA & MTCRE Certified Trainer" }
  ],
  socials: [
    { label: "PORTFOLIO", url: "https://its.id/Portofolio_Ihsan", iconName: "Globe" },
    { label: "LINKEDIN", url: "https://linkedin.com", iconName: "Linkedin" },
    { label: "GITHUB", url: "https://github.com", iconName: "Github" },
    { label: "EMAIL", url: "mailto:sann252101@gmail.com", iconName: "Mail" }
  ],
  email: "sann252101@gmail.com"
};
