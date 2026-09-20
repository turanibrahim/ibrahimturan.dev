import type { Experience } from '@/types/experience';
import type { Project } from '@/types/project';
import type { Technology } from '@/types/technology';
import type { UserInfo } from '@/types/user';

export interface ContentImage {
  url: string;
  alt: string;
  mimeType: string;
  width: number;
  height: number;
}

export interface Post {
  title: string;
  slug: string;
  excerpt: string;
  bodyMarkdown: string;
  tags: readonly string[];
  publishedAt: string;
  readingTimeMinutes: number;
  language: string;
  image: ContentImage;
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
