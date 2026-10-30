export interface SocialLink {
  label: string;
  url: string;
  iconName: string;
}

export interface ProfileData {
  name: string;
  tagline: string;
  role: string;
  location: string;
  coordinates: string;
  availability: string;
  bio: string[];
  metrics: {
    label: string;
    value: string;
    detail: string;
  }[];
  socials: SocialLink[];
  email: string;
}

export interface ProjectArchitectureNode {
  name: string;
  role: string;
  type: string;
  status: string;
}

export interface ProjectCaseStudy {
  client?: string;
  timeline?: string;
  challenge: {
    title: string;
    description: string;
    points: string[];
  };
  solution: {
    title: string;
    description: string;
    points: string[];
  };
  architecture: {
    summary: string;
    nodes: ProjectArchitectureNode[];
    flow: string[];
  };
  keyResults: string[];
  specifications: { label: string; value: string }[];
}

export interface Project {
  id: string;
  title: string;
  category: 'Network Engineering' | 'Web Development' | 'DevOps & Cloud';
  year: string;
  role: string;
  description: string;
  longDescription?: string;
  tags: string[];
  metrics?: { label: string; value: string }[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  caseStudy?: ProjectCaseStudy;
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: {
    name: string;
    level: string;
    tags?: string[];
  }[];
}

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  type: string;
  location: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface LabExperiment {
  id: string;
  title: string;
  type: 'Shader' | 'Network Tool' | 'Interactive Canvas' | 'System Architecture';
  description: string;
  verdict: string;
  component: string;
}
