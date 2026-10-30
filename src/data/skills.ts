import type { SkillCategory } from './types';

/**
 * FILE DAFTAR KEAHLIAN TEKNIS - MUHAMMAD IHSAN MALARANGENG
 */
export const skillsData: SkillCategory[] = [
  {
    title: "Cisco Routing & Switching",
    icon: "Network",
    skills: [
      {
        name: "Enterprise Dynamic Routing",
        level: "Advanced (CCNA / CCNP Level)",
        tags: ["BGP Peering", "BGP Route Reflector", "OSPF Multi-Area", "EIGRP Redistribution", "BGP Community"]
      },
      {
        name: "Advanced L2/L3 Switching",
        level: "Expert",
        tags: ["VLAN & Inter-VLAN", "802.1Q Trunking", "STP / RSTP", "Etherchannel (LACP/PAgP)", "Port Security"]
      },
      {
        name: "Gateway Redundancy & NAT",
        level: "Advanced",
        tags: ["HSRP", "VRRP", "GLBP", "NAT Static/Dynamic/Overload", "GRE Tunnels"]
      },
      {
        name: "Access Control & Filtering",
        level: "Advanced",
        tags: ["Standard & Extended ACL", "Prefix Lists", "Route Maps", "Distribute Lists", "MD5 Authentication"]
      }
    ]
  },
  {
    title: "MikroTik RouterOS",
    icon: "Server",
    skills: [
      {
        name: "Routing & Multi-WAN Failover",
        level: "Certified MTCRE",
        tags: ["OSPF Routing", "BGP", "Check Gateway Failover", "PCC Load Balancing", "Routing Mark"]
      },
      {
        name: "Bandwidth Management & QoS",
        level: "Expert",
        tags: ["Queue Tree", "Simple Queue with Burst", "PCQ (Per Connection Queue)", "Packet Mangle"]
      },
      {
        name: "Firewall & Security Filtering",
        level: "Advanced",
        tags: ["Filter Rules", "NAT", "Layer 7 Protocol", "Transparent DNS", "Walled Garden", "Address Lists"]
      },
      {
        name: "VPN, Tunnels & Hotspots",
        level: "Certified MTCNA",
        tags: ["EoIP", "GRE", "L2TP / IPsec", "PPPoE Server", "Hotspot Captive Portal", "User Manager"]
      }
    ]
  },
  {
    title: "Fortinet & Network Security",
    icon: "Shield",
    skills: [
      {
        name: "FortiGate Firewall Administration",
        level: "Certified FCA / FCF",
        tags: ["Security Fabric", "Firewall Policies", "High Availability (HA)", "FortiView", "Session Monitoring"]
      },
      {
        name: "Secure SD-WAN & Remote Access",
        level: "Proficient",
        tags: ["SD-WAN Deployment", "IPsec VPN", "SSL VPN", "User Authentication", "Zero Trust Access"]
      },
      {
        name: "SIEM & Threat Monitoring",
        level: "Hands-on Experience",
        tags: ["Wazuh SIEM (Windows Server)", "FortiAnalyzer", "IPS & Application Control", "Antivirus / Web Filter"]
      },
      {
        name: "Cybersecurity & CTF",
        level: "Top 6 Compfest CTF",
        tags: ["Classical Cryptography", "Threat Intelligence", "Ethical Hacking", "Merdeka Siber"]
      }
    ]
  },
  {
    title: "Systems, Cloud & Tools",
    icon: "Activity",
    skills: [
      {
        name: "Linux Administration & Mail Server",
        level: "Experienced",
        tags: ["Debian / Ubuntu", "Zimbra Mail Server (Virtual Linux)", "Bash Scripting", "System Services"]
      },
      {
        name: "Cloud Platforms & DevOps",
        level: "JuaraGCP Season 9 & 10",
        tags: ["Google Cloud Platform (GCP)", "AWS Cloud", "Docker Containers", "DevOps Fundamentals"]
      },
      {
        name: "Network Simulation & Lab Topology",
        level: "Expert",
        tags: ["PNETLab VM", "Cisco Packet Tracer", "GNS3", "Wireshark Packet Analysis"]
      },
      {
        name: "Technical Authoring & Training",
        level: "Author of 5 Books",
        tags: ["Published Author", "Classroom Instructor", "Technical Curriculum Design", "Public Speaking"]
      }
    ]
  }
];
