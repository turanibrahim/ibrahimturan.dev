import type { Locale } from '@/types/locale';

export const defaultLocale: Locale = 'en';

export const dateLocales: Record<Locale, string> = {
  en: 'en-US',
  tr: 'tr-TR',
};

export const localeNames: Record<Locale, string> = {
  en: 'English',
  tr: 'Türkçe',
};

export const localeShortLabels: Record<Locale, string> = {
  en: 'EN',
  tr: 'TR',
};

export const localePath = ({ locale, path }: { locale: Locale; path: string }): string => {
  const normalizedPath = path === '/' || path.endsWith('/') ? path : `${path}/`;

  if (locale === defaultLocale) {
    return normalizedPath;
  }

  return normalizedPath === '/' ? `/${locale}/` : `/${locale}${normalizedPath}`;
};

export const getHomePath = (locale: Locale): string => localePath({ locale, path: '/' });

export const getBlogPath = (locale: Locale): string => localePath({ locale, path: '/blog' });

export const getPostPath = ({ locale, slug }: { locale: Locale; slug: string }): string =>
  localePath({ locale, path: `/blog/${slug}` });
