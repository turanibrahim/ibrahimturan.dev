import type { Experience } from '@/types/experience';
import type { Project } from '@/types/project';
import type { Technology } from '@/types/technology';
import type { UserInfo } from '@/types/user';

export interface Post {
  title: string;
  slug: string;
  excerpt: string;
  bodyMarkdown: string;
  tags: readonly string[];
  publishedAt: string;
  readingTimeMinutes: number;
  language: string;
  imageUrl?: string;
  sourceUrl?: string;
  order: number;
}

export interface PortfolioContent {
  profile: UserInfo;
  experiences: Experience[];
  projects: Project[];
  technologies: Technology[];
  posts: Post[];
}
