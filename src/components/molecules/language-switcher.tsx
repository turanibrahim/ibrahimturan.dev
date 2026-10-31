import type { ReactElement } from 'react';
import type { Dictionary } from '@/i18n/dictionary';
import { localeNames, localeShortLabels } from '@/i18n/locale';
import type { Locale } from '@/types/locale';

interface Props {
  current: Locale;
  dictionary: Dictionary;
  paths: Record<Locale, string>;
}

const languages: Locale[] = ['en', 'tr'];

export const LanguageSwitcher = ({ current, dictionary, paths }: Props): ReactElement => (
  <ul
    aria-label={dictionary.language.label}
    className="flex items-center gap-1 font-mono text-xs text-base-content-muted"
  >
    {languages.map((locale) => {
      const isCurrent = locale === current;

      return (
        <li key={locale}>
          <a
            href={paths[locale]}
            hrefLang={locale}
            lang={locale}
            aria-current={isCurrent ? 'true' : undefined}
            aria-label={dictionary.language.switchTo(localeNames[locale])}
            className={[
              'rounded px-1.5 py-1 transition-colors',
              isCurrent
                ? 'text-primary'
                : 'hover:text-base-content focus-visible:text-base-content',
            ].join(' ')}
          >
            {localeShortLabels[locale]}
          </a>
        </li>
      );
    })}
  </ul>
);

export default LanguageSwitcher;
