export interface Certificate {
  id: string;
  title: string;
  subtitle: string;
  issuer: string;
  credentialId: string;
  issueDate: string;
  expiryDate?: string;
  status: 'VERIFIED' | 'ACTIVE';
  category: string;
  filePath: string;
  fileType: 'image' | 'pdf';
  skills: string[];
  description: string;
  badgeCode: string;
  accentColor: string;
}

export const certificatesData: Certificate[] = [
  {
    id: 'cisco-ccna',
    title: 'Cisco Certified Network Associate',
    subtitle: 'CCNA Enterprise Core & Routing',
    issuer: 'Cisco Systems, Inc.',
    credentialId: '478915238',
    issueDate: '2024',
    status: 'VERIFIED',
    category: 'ROUTING & SWITCHING',
    filePath: '/certificates/cisco-ccna.jpg',
    fileType: 'image',
    skills: ['BGP Routing', 'OSPF Multi-Area', 'VLAN Trunking (802.1Q)', 'STP/RSTP', 'IPv4/IPv6 Subnetting', 'ACLs & NAT'],
    description: 'Validates comprehensive capability to install, configure, operate, and troubleshoot medium-to-large scale enterprise routed and switched networks.',
    badgeCode: 'CCNA // CISCO-200-301',
    accentColor: '#00bceb',
  },
  {
    id: 'mikrotik-mtcre',
    title: 'MikroTik Certified Routing Engineer',
    subtitle: 'MTCRE Enterprise Routing Specialist',
    issuer: 'MikroTik SIA (Latvia)',
    credentialId: '2302RE3845',
    issueDate: '2024',
    status: 'VERIFIED',
    category: 'ROUTEROS ARCHITECTURE',
    filePath: '/certificates/mikrotik-mtcre.pdf',
    fileType: 'pdf',
    skills: ['OSPF Interior Routing', 'BGP Exterior Peering', 'Policy Based Routing (PBR)', 'EoIP & IPIP Tunnels', 'VLANs over Bonding'],
    description: 'Expert-level verification for planning, implementing, and debugging complex routing topologies, dynamic failover routes, and multi-ISP routing schemes.',
    badgeCode: 'MTCRE // MIKROTIK-RE',
    accentColor: '#e02424',
  },
  {
    id: 'mikrotik-mtcna',
    title: 'MikroTik Certified Network Associate',
    subtitle: 'MTCNA Foundation & RouterOS Security',
    issuer: 'MikroTik SIA (Latvia)',
    credentialId: '2404NA1557',
    issueDate: '2024',
    status: 'VERIFIED',
    category: 'SYSTEM ADMINISTRATION',
    filePath: '/certificates/mikrotik-mtcna.pdf',
    fileType: 'pdf',
    skills: ['RouterOS v7 CLI/WinBox', 'Stateful Firewall Filters', 'NAT & Connection Tracking', 'Simple & Tree Queues (QoS)', 'WireGuard VPN'],
    description: 'Demonstrates in-depth mastery of RouterOS administration, security hardening, bandwidth management, and edge client infrastructure deployment.',
    badgeCode: 'MTCNA // MIKROTIK-NA',
    accentColor: '#f05252',
  },
  {
    id: 'fortinet-fca',
    title: 'Fortinet Certified Associate',
    subtitle: 'FCA Network Security & Threat Defense',
    issuer: 'Fortinet NSE Training Institute',
    credentialId: '2338830402MI',
    issueDate: '2024',
    status: 'VERIFIED',
    category: 'CYBERSECURITY & FIREWALL',
    filePath: '/certificates/cisco-ccna.jpg',
    fileType: 'image',
    skills: ['FortiGate OS', 'Security Fabric', 'UTM Inspection', 'Intrusion Prevention (IPS)', 'IPsec VPN Tunnels', 'Web & DNS Filtering'],
    description: 'Validates operational mastery in managing FortiGate next-generation firewalls, enforcing zero-trust network boundaries, and defending against zero-day exploits.',
    badgeCode: 'FCA // FORTINET-NSE',
    accentColor: '#ee3124',
  },
  {
    id: 'fortinet-fcf',
    title: 'Fortinet Certified Fundamentals',
    subtitle: 'FCF Threat Intelligence & Cyber Architecture',
    issuer: 'Fortinet NSE Training Institute',
    credentialId: '9586998811MI',
    issueDate: '2023',
    status: 'VERIFIED',
    category: 'CYBERSECURITY ESSENTIALS',
    filePath: '/certificates/cisco-ccna.jpg',
    fileType: 'image',
    skills: ['Threat Landscape Analysis', 'Zero Trust Network Access (ZTNA)', 'SOC Operations', 'Cloud Security Integration'],
    description: 'Comprehensive foundation in the modern enterprise threat landscape, attack vectors, and multi-layered cyber defense architectures.',
    badgeCode: 'FCF // FORTINET-FUND',
    accentColor: '#ff5a5f',
  },
  {
    id: 'ielts-academic',
    title: 'IELTS Academic English Proficiency',
    subtitle: 'International Technical Communication',
    issuer: 'British Council / IDP IELTS Australia',
    credentialId: 'IELTS-ACAD-2024',
    issueDate: '2024',
    status: 'VERIFIED',
    category: 'GLOBAL COMMUNICATION',
    filePath: '/certificates/ielts-score.pdf',
    fileType: 'pdf',
    skills: ['Technical Documentation', 'RFC Standard Drafting', 'Cross-Border Collaboration', 'English Proficiency'],
    description: 'Certified capability to communicate, lead technical reviews, and collaborate effectively with international engineering teams across global infrastructure projects.',
    badgeCode: 'IELTS // PROFICIENCY',
    accentColor: '#059669',
  },
];
