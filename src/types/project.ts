export type ProjectLinkKind = 'repository' | 'live';

export interface ProjectLink {
  kind: ProjectLinkKind;
  label: string;
  url: string;
}

export interface Project {
  name: string;
  description: string;
  stack: readonly string[];
  links: readonly ProjectLink[];
}
