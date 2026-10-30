import type { SkillCategory } from './types';

export interface SkillGridCategory {
  title: string;
  titleEn: string;
  chips: string[];
}

/**
 * 6 Kategori Keahlian Teknis - Tampilan Bento Grid (Identik Christen Dijoux)
 */
export const skillsGridData: SkillGridCategory[] = [
  {
    title: "ROUTING & SWITCHING",
    titleEn: "Routing & Switching",
    chips: [
      "BGP PEERING",
      "BGP ROUTE REFLECTOR",
      "OSPF MULTI-AREA",
      "EIGRP REDISTRIBUTION",
      "VLAN & INTER-VLAN",
      "802.1Q TRUNKING",
      "STP / RSTP",
      "ETHERCHANNEL (LACP)",
      "HSRP / VRRP",
      "EXTENDED ACL",
      "ROUTE MAPS",
      "GRE TUNNELS",
      "NAT OVERLOAD",
      "PREFIX LISTS"
    ]
  },
  {
    title: "MIKROTIK ROUTEROS",
    titleEn: "MikroTik RouterOS",
    chips: [
      "MTCRE CERTIFIED",
      "MTCNA CERTIFIED",
      "OSPF ROUTING",
      "CHECK GATEWAY FAILOVER",
      "PCC LOAD BALANCING",
      "QUEUE TREE QOS",
      "SIMPLE QUEUE BURST",
      "PCQ (PER CONNECTION)",
      "FIREWALL FILTER",
      "LAYER 7 PROTOCOL",
      "L2TP / IPSEC",
      "EOIP TUNNELS",
      "HOTSPOT CAPTIVE PORTAL",
      "ROUTING MARK"
    ]
  },
  {
    title: "CYBERSECURITY & FIREWALL",
    titleEn: "Cybersecurity & Firewall",
    chips: [
      "FORTIGATE UTM",
      "FCA & FCF CERTIFIED",
      "SECURITY FABRIC",
      "HIGH AVAILABILITY (HA)",
      "SECURE SD-WAN",
      "IPSEC VPN",
      "SSL VPN",
      "WAZUH SIEM",
      "WINDOWS SERVER SIEM",
      "CTF TOP 6 WINNER",
      "CLASSICAL CRYPTOGRAPHY",
      "THREAT ISOLATION",
      "IPS & APP CONTROL"
    ]
  },
  {
    title: "CLOUD & DEVOPS",
    titleEn: "Cloud & DevOps",
    chips: [
      "GOOGLE CLOUD (GCP)",
      "#JUARAGCP (S9 & S10)",
      "AWS CLOUD",
      "DOCKER CONTAINERS",
      "LINUX DEBIAN / UBUNTU",
      "ZIMBRA MAIL SERVER",
      "BASH SCRIPTING",
      "VIRTUALBOX / PROXMOX",
      "CI/CD PIPELINES",
      "GITHUB ACTIONS",
      "DNS MANAGEMENT",
      "SSL / TLS"
    ]
  },
  {
    title: "OBSERVABILITY & TOOLS",
    titleEn: "Observability & Tools",
    chips: [
      "WIRESHARK ANALYSIS",
      "CISCO PACKET TRACER",
      "GNS3 / EVE-NG",
      "WINBOX",
      "NETFLOW / SFLOW",
      "SNMP MONITORING",
      "WAZUH AGENT TELEMETRY",
      "ICMP EDGE PROBING",
      "SPEEDTEST CLI",
      "VLSM SUBNETTING"
    ]
  },
  {
    title: "WEB & CODE RUNTIMES",
    titleEn: "Web & Code Runtimes",
    chips: [
      "REACT",
      "TYPESCRIPT",
      "NEXT.JS",
      "NODE.JS",
      "TAILWIND CSS",
      "JAVASCRIPT ES6+",
      "PYTHON",
      "REST API",
      "THREE.JS & WEBGL",
      "GIT / GITHUB",
      "HTML5 & CSS3",
      "LINUX RUNTIMES"
    ]
  }
];

/**
 * Backward-compatible data for CvPage.tsx and other consumers
 */
export const skillsData: SkillCategory[] = skillsGridData.map((grid) => ({
  title: grid.title,
  icon: "Network",
  skills: grid.chips.map((chip) => ({
    name: chip,
    level: "Advanced",
    tags: [chip]
  }))
}));
