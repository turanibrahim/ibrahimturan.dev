import contentData from '@/data/cms-content.json';
import type { Locale, PortfolioContent, SiteContent } from '@/types/content';

const snapshot = contentData as SiteContent;
const { content, defaultLocale, locales } = snapshot;

export { defaultLocale, locales };

export const getContent = (locale: Locale = defaultLocale): PortfolioContent =>
  content[locale] ?? content[defaultLocale];

export const { experiences, posts, profile, projects, technologies } = getContent();
