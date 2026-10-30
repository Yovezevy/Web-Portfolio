import type { Project } from './types';

/**
 * FILE DAFTAR PROYEK & STUDI KASUS NYATA - MUHAMMAD IHSAN MALARANGENG
 */
export const projectsData: Project[] = [
  {
    id: "dual-isp-redundant-network",
    title: "Dual-ISP Redundancy & Campus Wi-Fi Infrastructure",
    category: "Network Engineering",
    year: "2024",
    role: "Lead Network Infrastructure Engineer",
    description: "Multi-ISP automated failover, Queue Tree bandwidth allocation, and customized captive portal deployment across school campus infrastructure.",
    longDescription: "Architected a high-reliability dual-WAN network infrastructure for An-Nahl Islamic School. Integrated two distinct ISP uplinks on MikroTik RouterOS with automated health check failover, engineered hierarchical Queue Tree QoS with PCQ to eliminate student bandwidth hogging, and developed a branded captive portal login system with role-based employee access.",
    tags: ["MikroTik RouterOS", "Dual-ISP Failover", "Queue Tree QoS", "PCQ", "Layer 7 Firewall", "TP-Link AP", "Captive Portal"],
    metrics: [
      { label: "Failover Time", value: "< 2.5s" },
      { label: "Bandwidth QoS", value: "100% Fair PCQ" },
      { label: "Uplink ISP", value: "Dual Redundant" },
      { label: "Uptime SLA", value: "99.98%" }
    ],
    githubUrl: "https://its.id/Portofolio_Ihsan",
    liveUrl: "https://its.id/Portofolio_Ihsan",
    featured: true,
    caseStudy: {
      client: "An-Nahl Islamic School Campus",
      timeline: "March 2024 (Design & Deployment)",
      challenge: {
        title: "Campus Connectivity Disruptions & Bandwidth Monopolization",
        description: "The school suffered from frequent single-ISP outages that brought administrative and teaching operations to a halt. Additionally, unmanaged wireless access led to severe bandwidth hogging, buffering, and unauthorized network probing.",
        points: [
          "Single ISP dependency created full campus network blackouts during provider fiber cuts.",
          "Lack of bandwidth QoS allowed single users downloading large media files to choke administrative operations.",
          "Open Wi-Fi access lacked user authentication, presenting security and auditing vulnerabilities."
        ]
      },
      solution: {
        title: "Resilient Dual-WAN Failover & Hierarchical QoS Engine",
        description: "Deployed a centralized MikroTik RouterOS gateway integrating two diverse ISPs with Check Gateway recursive routing. Configured Queue Tree QoS with PCQ algorithms, combined with a custom-developed captive portal and TP-Link managed wireless access points.",
        points: [
          "Configured recursive route check gateway on MikroTik for sub-3 second automated ISP failover.",
          "Constructed hierarchical Queue Tree QoS with PCQ (Per Connection Queue) ensuring equal bandwidth distribution.",
          "Developed custom HTML/CSS responsive captive portal login page with tiered employee profiles.",
          "Hardened perimeter with Layer 7 firewall rules blocking malicious domains and unauthorized peer-to-peer traffic."
        ]
      },
      architecture: {
        summary: "Dual-WAN multi-ISP topology with centralized MikroTik routing and managed AP distribution.",
        nodes: [
          { name: "ISP_UPLINK_01", role: "Primary Fiber Optical Transit", type: "External WAN", status: "Active • Low Latency" },
          { name: "ISP_UPLINK_02", role: "Secondary Redundant Provider", type: "External WAN", status: "Standby • Auto-Failover" },
          { name: "MIKROTIK_CORE_ROUTER", role: "Dual-WAN Gateway & QoS Controller", type: "MikroTik RouterOS", status: "Active • Recursive Routing" },
          { name: "QUEUE_TREE_ENGINE", role: "PCQ Dynamic Bandwidth Shaper", type: "QoS Management", status: "Active • Anti-Congestion" },
          { name: "TP_LINK_MANAGED_APS", role: "Campus Wi-Fi Distribution", type: "Wireless AP Mesh", status: "Active • Multi-SSID" }
        ],
        flow: [
          "Core MikroTik gateway monitors primary ISP health via continuous recursive ping to 8.8.8.8 and 1.1.1.1",
          "If primary link packets drop, routing table metric switches traffic to secondary ISP in under 2.5 seconds",
          "Client devices connecting to Wi-Fi are intercepted by captive portal for role verification",
          "Mangle rules tag packet streams and assign appropriate parent/child Queue Tree priority",
          "Bandwidth is dynamically divided equally among active connected clients via PCQ"
        ]
      },
      keyResults: [
        "Zero unscheduled school downtime experienced following automated failover deployment.",
        "Eliminated video buffering for faculty staff through strict administrative bandwidth prioritization.",
        "Secured network access across campus with credentialed employee profiles and firewall isolation."
      ],
      specifications: [
        { label: "ROUTER PLATFORM", value: "MikroTik RouterOS v7" },
        { label: "FAILOVER ALGORITHM", value: "Recursive Route Check Gateway with Scope Targets" },
        { label: "BANDWIDTH SHAPER", value: "Hierarchical Queue Tree + PCQ (Per Connection Queue)" },
        { label: "FIREWALL POLICIES", value: "Layer 7 Filter, Transparent DNS, Mangle Tagging" },
        { label: "WIRELESS HARDWARE", value: "TP-Link Managed Access Points with VLAN Trunking" }
      ]
    }
  },
  {
    id: "enterprise-fortinet-siem",
    title: "Enterprise FortiGate Hardening & Wazuh SIEM Deployment",
    category: "DevOps & Cloud",
    year: "2024 — 2025",
    role: "Network & Security Engineering Intern",
    description: "Enterprise Fortinet firewall management, Wazuh SIEM threat detection on Windows Server, and virtualized Zimbra Linux mail infrastructure.",
    longDescription: "Maintained and secured enterprise network infrastructure at PT Adhi Tekno Solusindo. Handled Fortinet FortiGate appliances including firmware updates, licensing compliance, and security fabric policies. Deployed Wazuh SIEM on Windows Server for continuous log analysis and anomaly alerts, configured Zimbra mail services in virtualized Linux, and earned Google Cloud completion credentials.",
    tags: ["Fortinet FortiGate", "Wazuh SIEM", "Windows Server", "Zimbra Mail", "Linux Virtualization", "GCP", "Security Fabric"],
    metrics: [
      { label: "Security SIEM", value: "Wazuh Active" },
      { label: "FortiGate", value: "HA Redundant" },
      { label: "Cloud Badge", value: "#JuaraGCP S9 & S10" },
      { label: "Threat Response", value: "Real-Time Alert" }
    ],
    githubUrl: "https://its.id/Portofolio_Ihsan",
    featured: true,
    caseStudy: {
      client: "PT Adhi Tekno Solusindo (Enterprise IT Services)",
      timeline: "June 2024 — June 2025",
      challenge: {
        title: "Enterprise Security Blind Spots & Threat Surface",
        description: "Enterprises required centralized security visibility across disparate infrastructure nodes without unified log intelligence, while firewalls needed continuous compliance, license audits, and firmware lifecycle management.",
        points: [
          "Decentralized system logs made early detection of brute-force and privilege escalation attacks difficult.",
          "Complex firewall policies on FortiGate appliances required systematic audits and firmware upgrades.",
          "Need for dependable internal mail services and private virtualized server administration."
        ]
      },
      solution: {
        title: "Fortinet Security Fabric & Unified Wazuh SIEM Pipeline",
        description: "Implemented a multi-tier defense architecture: hardened FortiGate perimeter firewalls with FortiView monitoring, deployed Wazuh SIEM agent-manager architecture on Windows Server to collect telemetry, and configured a virtualized Zimbra mail server in Linux.",
        points: [
          "Maintained Fortinet FortiGate appliances, applying firmware patches, license verifications, and IPS policies.",
          "Installed and configured Wazuh SIEM Manager and agents on Windows Server for real-time security events.",
          "Deployed Zimbra Collaboration Suite mail server in virtualized Linux environment with DNS MX hardening.",
          "Completed cloud architecture labs via Google Cloud Platform (#JuaraGCP Season 9 & 10)."
        ]
      },
      architecture: {
        summary: "Perimeter Fortinet defense linked with centralized Wazuh SIEM and virtualized Linux mail cluster.",
        nodes: [
          { name: "FORTINET_FORTIGATE", role: "Perimeter Security & UTM Gateway", type: "Hardware Firewall", status: "Active • Security Fabric" },
          { name: "WAZUH_SIEM_SERVER", role: "Security Event & Log Intelligence", type: "Windows Server Host", status: "Active • Real-time Monitoring" },
          { name: "ZIMBRA_MAIL_SERVER", role: "Corporate Email Communications", type: "Virtual Linux (KVM)", status: "Active • Postfix/Amavis" },
          { name: "GCP_CLOUD_SERVICES", role: "Hybrid Cloud Architecture", type: "Google Cloud Platform", status: "Active • #JuaraGCP S9/S10" }
        ],
        flow: [
          "Network traffic enters via Fortinet FortiGate with deep packet inspection and IPS filters",
          "Server endpoints and firewalls forward syslog and event telemetry to Wazuh SIEM Manager",
          "Wazuh decoders parse authentication logs, file integrity changes, and anomalous traffic bursts",
          "Immediate alerts trigger when brute-force attempts or policy violations occur",
          "Zimbra mail server processes encrypted corporate communications with SPF/DKIM verification"
        ]
      },
      keyResults: [
        "100% license compliance and zero downtime across all serviced Fortinet enterprise firewalls.",
        "Successful deployment of Wazuh SIEM providing complete visibility over endpoint security events.",
        "Earned #JuaraGCP Season 9 & Season 10 Google Cloud badges demonstrating hybrid cloud proficiency."
      ],
      specifications: [
        { label: "FIREWALL PLATFORM", value: "Fortinet FortiGate (FortiOS 7.x)" },
        { label: "SIEM ENGINE", value: "Wazuh 4.x on Windows Server" },
        { label: "MAIL SERVER", value: "Zimbra Collaboration Suite on Linux" },
        { label: "SECURITY CERTIFICATIONS", value: "Fortinet FCA & FCF Certified, NSE 1 & 2" },
        { label: "CLOUD COMPETENCY", value: "Google Cloud Platform (#JuaraGCP)" }
      ]
    }
  },
  {
    id: "published-technical-books",
    title: "5 Published Network Engineering Textbooks",
    category: "Web Development",
    year: "2022 — 2024",
    role: "Author & Technical Publisher",
    description: "Authored 5 comprehensive textbooks on Cisco CCNA/CCNP, MikroTik MTCNA/MTCRE, and AWS Cloud totaling over 770 pages of technical guides.",
    longDescription: "Authored and published 5 comprehensive, lab-driven networking textbooks designed for students, engineers, and certification candidates. Topics cover enterprise routing & switching, dynamic routing protocols (BGP, OSPF, EIGRP), MikroTik RouterOS engineering, tunneling, and cloud architectures on AWS.",
    tags: ["Technical Author", "Cisco CCNA", "Cisco CCNP", "MikroTik MTCNA", "MikroTik MTCRE", "AWS Cloud", "Curriculum"],
    metrics: [
      { label: "Books Published", value: "5 Books" },
      { label: "Total Pages", value: "772 Pages" },
      { label: "Coverage", value: "Cisco, MikroTik, AWS" },
      { label: "Adoption", value: "National Schools" }
    ],
    githubUrl: "https://its.id/Portofolio_Ihsan",
    liveUrl: "https://its.id/Portofolio_Ihsan",
    featured: true,
    caseStudy: {
      client: "Students, Vocational Educators & Engineering Candidates",
      timeline: "2022 — 2024 (5 Publications)",
      challenge: {
        title: "Gap Between Theory and Real-World Network Engineering",
        description: "Many official vendor documentations are overly theoretical and lack hands-on, step-by-step visual topology guides tailored for Indonesian students and certification candidates preparing for Cisco CCNA/CCNP and MikroTik MTCNA/MTCRE exams.",
        points: [
          "Shortage of structured, indepth Indonesian technical books covering enterprise BGP, OSPF, and VPN tunneling.",
          "High failure rates in international vendor certification exams due to insufficient hands-on lab practice.",
          "Need for unified reference manuals combining command syntax, topology diagrams, and packet-level verification."
        ]
      },
      solution: {
        title: "Practical, Lab-Centric Engineering Compendiums",
        description: "Researched, compiled, and authored 5 comprehensive books with detailed PNETLab and physical hardware lab walkthroughs, command-by-command explanations, and Wireshark packet capture verifications.",
        points: [
          "Authored 'Path Of Cisco #2 - CCNP' (254 pages) covering advanced enterprise routing, BGP communities, and redistributions.",
          "Authored 'Path Of Cisco - CCNA' (117 pages) covering VLANs, trunking, STP, Etherchannel, and OSPF fundamentals.",
          "Authored 'Path Of MikroTik' series (MTCNA 199 pages & MTCRE 77 pages) on RouterOS, Queue Tree, and tunnels.",
          "Authored 'Amazon With Saturn - AWS' (125 pages) on cloud architecture, VPCs, and serverless infrastructure."
        ]
      },
      architecture: {
        summary: "Comprehensive multi-volume technical publication catalogue.",
        nodes: [
          { name: "PATH_OF_CISCO_CCNP", role: "Advanced Enterprise Routing (254 Pages)", type: "Published Book", status: "Dec 2023 • Decisive Guide" },
          { name: "PATH_OF_CISCO_CCNA", role: "Routing & Switching Fundamentals (117 Pages)", type: "Published Book", status: "June 2023 • CCNA Core" },
          { name: "PATH_OF_MIKROTIK_MTCNA", role: "RouterOS Associate Manual (199 Pages)", type: "Published Book", status: "Nov 2022 • Complete Guide" },
          { name: "PATH_OF_MIKROTIK_MTCRE", role: "Advanced Routing & Tunnels (77 Pages)", type: "Published Book", status: "Nov 2022 • MTCRE Lab" },
          { name: "AMAZON_WITH_SATURN_AWS", role: "AWS Cloud Foundations (125 Pages)", type: "Published Book", status: "April 2024 • Cloud Guide" }
        ],
        flow: [
          "Theoretical architecture and RFC protocol specifications breakdown",
          "Topology design and IP addressing plan formulated in PNETLab / Packet Tracer",
          "Step-by-step CLI configuration on Cisco IOS, MikroTik RouterOS, and AWS Console",
          "Verification commands (show ip route, ping, traceroute, packet captures)",
          "Common troubleshooting scenarios, error logs, and mitigation blueprints"
        ]
      },
      keyResults: [
        "772 pages of authoritative network engineering knowledge authored and published.",
        "Directly utilized in training hundreds of vocational high school students across Cileungsi and Balikpapan.",
        "Demonstrated rare dual mastery: enterprise execution and pedagogical technical communication."
      ],
      specifications: [
        { label: "TOTAL PUBLICATIONS", value: "5 Technical Books" },
        { label: "PAGE COUNT", value: "772 Total Written Pages" },
        { label: "VENDOR PROTOCOLS", value: "Cisco IOS, MikroTik RouterOS, AWS Cloud" },
        { label: "TOPOLOGY PLATFORMS", value: "PNETLab VM, Cisco Packet Tracer, Physical Routers" },
        { label: "AUDIENCE", value: "CCNA, CCNP, MTCNA, MTCRE Candidates & Engineers" }
      ]
    }
  },
  {
    id: "cisco-enterprise-routing-backbone",
    title: "Multi-Area OSPF & BGP Enterprise Routing Simulation",
    category: "Network Engineering",
    year: "2023 — 2024",
    role: "Network Systems Architect",
    description: "Enterprise Cisco backbone topology featuring Multi-Area OSPF, BGP Peering with Route Reflectors, EIGRP redistribution, and gateway redundancy.",
    longDescription: "Engineered and verified complex multi-vendor routing backbones simulating enterprise transit topologies. Implemented Multi-Area OSPF with stub areas and virtual links, configured BGP peering with Route Reflectors and BGP Communities for path selection, and secured edge transitions with HSRP/VRRP redundancy and GRE over IPsec tunnels.",
    tags: ["Cisco IOS", "BGP Peering", "Route Reflector", "OSPF Multi-Area", "EIGRP Redistribution", "HSRP", "VRRP", "GRE Tunnel"],
    metrics: [
      { label: "Routing Nodes", value: "15+ Core Routers" },
      { label: "BGP Peering", value: "AS65001 - AS65003" },
      { label: "Gateway Protocol", value: "HSRP & VRRP" },
      { label: "Route Convergence", value: "Sub-Second" }
    ],
    githubUrl: "https://its.id/Portofolio_Ihsan",
    featured: false,
    caseStudy: {
      client: "Enterprise Backbone Engineering Lab",
      timeline: "Research & Development (2023 — 2024)",
      challenge: {
        title: "Enterprise Multi-Site Scale & Route Loops",
        description: "Large corporate networks spanning multiple regional branch offices experience routing loops, suboptimal WAN path selection, and catastrophic gateway failure if dynamic routing and gateway redundancies are not properly architected.",
        points: [
          "BGP full mesh scalability limits: n*(n-1)/2 peering sessions create excessive routing overhead.",
          "Mutual route redistribution between OSPF and EIGRP risks metric translation loops and blackholes.",
          "Single default gateway failure leaves hundreds of LAN workstations disconnected."
        ]
      },
      solution: {
        title: "Hierarchical Core Architecture with BGP Route Reflectors",
        description: "Implemented a hierarchical Cisco routing core utilizing BGP Route Reflectors to eliminate full-mesh peering limits, applied route-tags and prefix-lists to prevent redistribution loops, and configured HSRP/VRRP for seamless first-hop gateway failover.",
        points: [
          "Configured BGP Route Reflector (RR) clusters and client relationships, reducing BGP peering sessions by 70%.",
          "Employed BGP attributes (Local Preference, AS-PATH Prepend, MED, Communities) for deterministic traffic steering.",
          "Implemented OSPF Multi-Area with Area 0 backbone, Totally Stubby Areas, and GRE tunnel virtual links.",
          "Configured HSRP and VRRP virtual gateways ensuring continuous default-gateway availability."
        ]
      },
      architecture: {
        summary: "Hierarchical Core, Distribution, and Edge topology with redundant transit peering.",
        nodes: [
          { name: "CORE_ROUTER_01", role: "BGP Route Reflector (AS65001)", type: "Cisco IOS Core", status: "Active • Backbone" },
          { name: "CORE_ROUTER_02", role: "Redundant BGP Route Reflector", type: "Cisco IOS Core", status: "Active • Backup RR" },
          { name: "DISTRIBUTION_SW1", role: "L3 Multi-Layer Switch (HSRP Active)", type: "Cisco Catalyst", status: "Active • VIP Gateway" },
          { name: "DISTRIBUTION_SW2", role: "L3 Multi-Layer Switch (HSRP Standby)", type: "Cisco Catalyst", status: "Standby • Virtual Gateway" },
          { name: "BRANCH_WAN_EDGE", role: "Remote Office Gateway via GRE/IPsec", type: "Edge Router", status: "Active • Encrypted Transit" }
        ],
        flow: [
          "Core routers exchange internal BGP (iBGP) routes through designated Route Reflectors",
          "BGP Communities tag routes based on regional origin and customer SLA tier",
          "Distribution layer redistributes routes into OSPF Area 0 with administrative distance filtering",
          "Workstation traffic routes to virtual HSRP IP; if master switch fails, standby assumes VIP in <1s",
          "Inter-site traffic traverses GRE tunnels with IPsec encryption over public transport"
        ]
      },
      keyResults: [
        "Sub-second convergence achieved during simulated core link severance tests.",
        "Eliminated routing loops through strict route-tagging and route-map prefix filters.",
        "Demonstrated mastery of CCNA and CCNP enterprise infrastructure requirements."
      ],
      specifications: [
        { label: "ROUTING PROTOCOLS", value: "BGP (RFC 4271), OSPFv2 (RFC 2328), EIGRP" },
        { label: "BGP ARCHITECTURE", value: "iBGP Route Reflector Clusters with Community Tagging" },
        { label: "FIRST HOP REDUNDANCY", value: "HSRP (Hot Standby Router Protocol) & VRRP" },
        { label: "ENCRYPTION / TUNNELING", value: "GRE Over IPsec (AES-256 / SHA-256)" },
        { label: "SIMULATION PLATFORM", value: "PNETLab Enterprise & Cisco IOS Images" }
      ]
    }
  },
  {
    id: "mtcna-mtcre-academy-trainer",
    title: "MikroTik Certified Network Academy & Training Programs",
    category: "Network Engineering",
    year: "2022 — 2024",
    role: "Certified MTCNA & MTCRE Instructor",
    description: "Professional certification training delivered to 500+ vocational students and educators across SMKN 1 Cileungsi and SMKN 1, 3, 6 Balikpapan.",
    longDescription: "Designed and delivered structured vocational training bootcamps preparing candidates for MikroTik Certified Network Associate (MTCNA) and MikroTik Certified Routing Engineer (MTCRE) exams. Built comprehensive PNETLab virtualized topology environments and hands-on physical router racks covering dynamic routing, traffic engineering, and network troubleshooting.",
    tags: ["MTCNA Trainer", "MTCRE Trainer", "MikroTik RouterOS", "Vocational Education", "PNETLab", "OSPF", "Tunneling"],
    metrics: [
      { label: "Students Trained", value: "500+ Candidates" },
      { label: "Schools Served", value: "4 Major SMKs" },
      { label: "Certification Prep", value: "MTCNA & MTCRE" },
      { label: "Pass Rate", value: "High Distinction" }
    ],
    githubUrl: "https://its.id/Portofolio_Ihsan",
    liveUrl: "https://its.id/Portofolio_Ihsan",
    featured: false,
    caseStudy: {
      client: "SMKN 1 Cileungsi, SMKN 1 Balikpapan, SMKN 6 Balikpapan, SMKN 3 Balikpapan",
      timeline: "October 2022 — March 2024",
      challenge: {
        title: "Vocational Skills Gap in Practical Network Engineering",
        description: "Vocational high school students faced steep learning curves in mastering MikroTik RouterOS dynamic routing (OSPF, BGP), VPN tunneling, and firewall mangling due to a lack of structured, hands-on lab training.",
        points: [
          "Limited access to physical router hardware for simultaneous multi-student lab classes.",
          "Difficulty in visualizing complex packet flows (mangle, NAT, filter, queue trees).",
          "Need for proven certification preparation that bridges school curriculum with industry standards."
        ]
      },
      solution: {
        title: "Hands-on Hybrid Lab Curriculum & PNETLab Virtualization",
        description: "Created a comprehensive curriculum combining PNETLab virtual machine environments for unlimited topology experimentation with physical router rack practice for real-world cable patching and troubleshooting.",
        points: [
          "Delivered intensive MTCNA and MTCRE training modules covering routing, tunneling, and QoS.",
          "Utilized PNETLab VM to demonstrate multi-router topology setups, packet sniffers, and link failure recovery.",
          "Conducted live troubleshooting sessions where deliberate network faults were injected for student diagnosis."
        ]
      },
      architecture: {
        summary: "Hybrid educational network lab pairing physical MikroTik hardware with virtual PNETLab topologies.",
        nodes: [
          { name: "PHYSICAL_ROUTER_RACK", role: "Real-device Hands-on Hardware", type: "MikroTik RouterBOARD", status: "Active • Physical Lab" },
          { name: "PNETLAB_SERVER", role: "Virtualized Topology Simulator", type: "Bare-Metal KVM Host", status: "Active • Multi-Tenant Labs" },
          { name: "STUDENT_WORKSTATIONS", role: "Client Configuration Terminals", type: "WinBox / WebFig / SSH", status: "Active • 30+ Seats" },
          { name: "TRAINER_GATEWAY", role: "Evaluation & Monitoring Router", type: "MikroTik Core", status: "Active • Supervision" }
        ],
        flow: [
          "Students review theoretical routing algorithms and RFC protocols",
          "PNETLab virtual topologies spun up with pre-configured routing challenges",
          "Students configure OSPF areas, cost metrics, and tunnel interfaces via WinBox/CLI",
          "Trainer tests connectivity, latency, and failover behavior using packet injection",
          "Students transition configuration to physical RouterBOARD devices for final verification"
        ]
      },
      keyResults: [
        "Trained over 500+ vocational students and educators in Cileungsi and Balikpapan.",
        "Achieved high certification pass rates on official MikroTik MTCNA and MTCRE exams.",
        "Fostered practical problem-solving capabilities in real-world network operational scenarios."
      ],
      specifications: [
        { label: "TRAINER CREDENTIALS", value: "MikroTik Certified Network Associate (MTCNA) & Routing Engineer (MTCRE)" },
        { label: "CERTIFICATE CODES", value: "MTCRE #2302RE3845 • MTCNA #2404NA1557" },
        { label: "CORE SUBJECTS", value: "OSPF, Static Routing, VPN Tunneling (EoIP/GRE/IPsec), Firewall, QoS" },
        { label: "LAB PLATFORMS", value: "PNETLab Virtual Machine & MikroTik RouterBOARD Devices" },
        { label: "TOTAL COHORTS", value: "4 Vocational High Schools (SMKs)" }
      ]
    }
  }
];
