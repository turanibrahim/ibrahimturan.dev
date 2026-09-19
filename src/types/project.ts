export type ProjectEngagement = 'Company' | 'Internal' | 'Freelance';

export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  name: string;
  engagement: ProjectEngagement;
  ownership: string;
  summary: string;
  contributions: readonly string[];
  stack: readonly string[];
  links: readonly ProjectLink[];
}
