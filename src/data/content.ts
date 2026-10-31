import contentData from '@/data/cms-content.json';
import type { PortfolioContent, SiteContent } from '@/types/content';
import type { Locale } from '@/types/locale';

const snapshot = contentData as SiteContent;
const { content, defaultLocale, locales } = snapshot;

export { defaultLocale, locales };

export const getContent = (locale: Locale = defaultLocale): PortfolioContent =>
  content[locale] ?? content[defaultLocale];
