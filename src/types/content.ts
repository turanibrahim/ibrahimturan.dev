import type { Experience } from '@/types/experience';
import type { Locale } from '@/types/locale';
import type { PortableTextBlock } from '@/types/portable-text';
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
  bodyPortableText: readonly PortableTextBlock[];
  tags: readonly string[];
  publishedAt: string;
  readingTimeMinutes: number;
  language: Locale;
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

export interface SiteContent {
  defaultLocale: Locale;
  locales: readonly Locale[];
  content: Record<Locale, PortfolioContent>;
}
