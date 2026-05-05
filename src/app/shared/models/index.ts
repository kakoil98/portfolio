export interface Project {
  id: string;
  title: string;
  description: string;
  tech_stack: string[];
  url?: string;
  github_url?: string;
  image_url?: string;
  featured: boolean;
  display_order: number;
  created_at: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  start_date: string;
  end_date?: string;
  description: string;
  tech_stack: string[];
  display_order: number;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  display_order: number;
}

export interface SiteSettings {
  id: string;
  bio: string;
  headline: string;
  email?: string;
  github_url?: string;
  linkedin_url?: string;
  resume_url?: string;
}
