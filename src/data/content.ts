import contentData from '@/data/cms-content.json';
import type { PortfolioContent } from '@/types/content';

const content = contentData as PortfolioContent;

export const { experiences, profile, projects, technologies, posts } = content;
