export const locales = ['en', 'tr'] as const;

export type Locale = (typeof locales)[number];

export interface LocalizedPath {
  locale: Locale;
  path: string;
}
