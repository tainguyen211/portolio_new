export interface PersonalData {
  name: string;
  email: string;
  phone: string;
  github: string;
  portfolio: string;
  location: {
    en: string;
    vi: string;
  };
  education: {
    university: string;
    degree: {
      en: string;
      vi: string;
    };
    graduationDate: {
      en: string;
      vi: string;
    };
  };
  skills: {
    languages: string[];
    frameworks: string[];
    tools: string[];
  };
}

export interface ExperienceItem {
  company: string;
  position: {
    en: string;
    vi: string;
  };
  period: string;
  location?: {
    en: string;
    vi: string;
  };
  description: {
    en: string;
    vi: string;
  };
  achievements: {
    en: string[];
    vi: string[];
  };
  techStack: string[];
}

export interface ProjectItem {
  title: string;
  description: {
    en: string;
    vi: string;
  };
  features: {
    en: string[];
    vi: string[];
  };
  techStack: string[];
  github: string;
  demo?: string;
  image: string;
}

export interface Translations {
  name: string;
  title: string;
  subtitle: string;
  nav: {
    home: string;
    about: string;
    experience: string;
    projects: string;
    contact: string;
  };
  buttons: {
    getInTouch: string;
    downloadCV: string;
  };
  about: {
    title: string;
    subtitle: string;
    education: string;
    location: string;
  };
  experience: {
    title: string;
    subtitle: string;
  };
  projects: {
    title: string;
    subtitle: string;
    keyFeatures: string;
    buttons: {
      code: string;
      demo: string;
    };
  };
  contact: {
    title: string;
    subtitle: string;
    info: string;
    form: {
      title: string;
      name: string;
      email: string;
      message: string;
      send: string;
      placeholders: {
        name: string;
        email: string;
        message: string;
      };
    };
  };
  footer: {
    description: string;
    rights: string;
  };
  skills: {
    languages: string;
    frameworks: string;
    frameworksLabel: string;
    toolsLabel: string;
  };
}

export type Language = 'en' | 'vi';

export type Theme = 'light' | 'dark';

export interface FormData {
  name: string;
  email: string;
  message: string;
}

export interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export interface ContactInfo {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  value: string;
  href: string;
  gradient: string;
}

export interface SocialLink {
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
}

export interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

export interface LoadingStep {
  text: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}