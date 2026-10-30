import type { ExperienceItem } from './types';

/**
 * FILE RIWAYAT PENGALAMAN & KARIR - MUHAMMAD IHSAN MALARANGENG
 */
export const experienceData: ExperienceItem[] = [
  {
    period: "JUNE 2024 — JUNE 2025",
    role: "Network & Security Engineering Intern",
    company: "PT Adhi Tekno Solusindo",
    type: "Internship",
    location: "Indonesia",
    description: "Maintained enterprise network security appliances, deployed SIEM log telemetry, and managed virtualized Linux server services.",
    achievements: [
      "Configured and managed Fortinet FortiGate appliances: firmware upgrades, license compliance, firewall policies, and FortiView monitoring.",
      "Deployed and integrated Wazuh SIEM on Windows Server for security event monitoring and automated endpoint threat detection.",
      "Installed and configured Zimbra Mail Server in a virtualized Linux environment with DNS MX records and mail queue optimization.",
      "Earned Google Cloud Platform completion badges through #JuaraGCP Season 9 and Season 10."
    ],
    technologies: ["Fortinet FortiGate", "Wazuh SIEM", "Zimbra Mail Server", "Linux Virtualization", "GCP", "DevSecOps"]
  },
  {
    period: "MARCH 2024",
    role: "Network Engineer (Wi-Fi & Dual-WAN Infrastructure)",
    company: "An-Nahl Islamic School",
    type: "Contract / Project",
    location: "Bogor, Indonesia",
    description: "Designed, integrated, and optimized campus-wide wireless networking infrastructure and dual-ISP automated redundancy.",
    achievements: [
      "Integrated and configured two independent ISPs on MikroTik RouterOS to establish fault-tolerant failover and load balancing.",
      "Engineered bandwidth management using MikroTik Queue Tree with PCQ to prevent network congestion during peak school hours.",
      "Developed a custom-branded captive portal login page with tiered user profiles for teachers and staff.",
      "Deployed TP-Link managed access points with VLAN isolation and Layer 7 firewall security filtering rules."
    ],
    technologies: ["MikroTik RouterOS", "Dual-ISP Failover", "Queue Tree QoS", "Captive Portal HTML", "TP-Link AP", "Firewall Mangle"]
  },
  {
    period: "2022 — 2024",
    role: "Certified MikroTik MTCNA & MTCRE Instructor",
    company: "SMKN 1 Cileungsi, SMKN 1 & 6 & 3 Balikpapan",
    type: "Professional Instructor",
    location: "Balikpapan & Cileungsi, Indonesia",
    description: "Delivered hands-on professional network engineering and certification preparation courses for hundreds of students and teachers.",
    achievements: [
      "Conducted MTCNA (Associate) and MTCRE (Routing Engineer) bootcamps covering OSPF, BGP, Tunneling, and Traffic Engineering.",
      "Constructed virtualized lab topologies using PNETLab VM to simulate complex multi-router enterprise topologies.",
      "Authored 5 comprehensive technical textbooks (Cisco CCNA/CCNP, MikroTik MTCNA/MTCRE, AWS) adopted in student training."
    ],
    technologies: ["MikroTik MTCRE", "MikroTik MTCNA", "OSPF Multi-Area", "VPN Tunneling", "PNETLab VM", "Curriculum Design"]
  },
  {
    period: "2024 — PRESENT",
    role: "Computer Engineering Student & Technology Staff",
    company: "Institut Teknologi Sepuluh Nopember (ITS)",
    type: "Academic & Campus Organization",
    location: "Surabaya, Indonesia",
    description: "Active in technical event coordination, data management, and computer engineering campus operations.",
    achievements: [
      "Rank 6 Compfest Capture The Flag (CTF) at Universitas Indonesia (2026).",
      "5th Finalist ITFEST (IT Network System Administration) at Institut Pertanian Bogor (2026).",
      "Contributed to data management & liaison coordination for Mage 11 & Mage 12 and Computer Engineering Expo at ITS."
    ],
    technologies: ["Network Administration", "Capture The Flag", "Data Management", "Public Speaking", "Team Leadership"]
  }
];
