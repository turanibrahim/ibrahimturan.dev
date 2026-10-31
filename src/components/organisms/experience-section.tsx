import type { ReactElement } from 'react';
import VBadge from '@/components/atoms/v-badge';
import VCompanyLogo from '@/components/atoms/v-company-logo';
import VHeading from '@/components/atoms/v-heading';
import VSection from '@/components/atoms/v-section';
import type { Dictionary } from '@/i18n/dictionary';
import { dateLocales } from '@/i18n/locale';
import type { Experience } from '@/types/experience';
import type { Locale } from '@/types/locale';
import { formatMonthYear, getCalendarYear, getCurrentYear } from '@/utils/date';

interface Props {
  dictionary: Dictionary;
  experiences: readonly Experience[];
  locale: Locale;
}

const disciplines = ['Product', 'React', 'Vue', 'Node.js'];

export const ExperienceSection = ({ dictionary, experiences, locale }: Props): ReactElement => {
  const earliestExperience = experiences.at(-1);
  const totalYears = earliestExperience
    ? getCurrentYear() - getCalendarYear(earliestExperience.startDate)
    : 0;

  return (
    <VSection id="work" ariaLabelledby="experience-heading" background="base-100" paddingY="xl">
      <div className="border-b border-base-300 pb-12 lg:pb-16 xl:grid xl:grid-cols-12 xl:gap-x-8">
        <VHeading
          id="experience-heading"
          level="2"
          className="max-w-4xl text-5xl leading-[0.98] font-black tracking-[-0.04em] text-base-content sm:text-6xl xl:col-span-7"
        >
          {dictionary.experience.heading}
        </VHeading>

        <div className="mt-10 grid gap-8 sm:grid-cols-[auto_1fr] sm:items-end xl:col-span-5 xl:col-start-8 xl:mt-0">
          <div className="flex items-end gap-3">
            <span className="font-mono text-5xl leading-none font-black tracking-[-0.04em] text-primary">
              {totalYears}+
            </span>
            <span className="pb-1 text-sm leading-snug text-base-content-muted">
              {dictionary.experience.yearsUnit}
              <br />
              {dictionary.experience.yearsSubject}
            </span>
          </div>

          <div>
            <p className="text-base leading-relaxed text-base-content-muted">
              {dictionary.experience.intro}
            </p>
            <ul
              className="mt-5 flex flex-wrap gap-2 font-mono text-xs text-base-content-muted"
              aria-label={dictionary.experience.disciplinesLabel}
            >
              {disciplines.map((technology) => (
                <li key={technology} className="rounded border border-base-300 px-2 py-1">
                  {technology}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <ol className="divide-y divide-base-300">
        {experiences.map((experience) => {
          const current = !experience.endDate;
          const startYear = getCalendarYear(experience.startDate);
          const startLabel = formatMonthYear({
            locale: dateLocales[locale],
            value: experience.startDate,
          });
          const endLabel = experience.endDate
            ? formatMonthYear({ locale: dateLocales[locale], value: experience.endDate })
            : null;

          return (
            <li
              key={`${experience.company}-${experience.startDate}`}
              aria-current={current ? 'true' : undefined}
              className="group grid max-w-none grid-cols-[72px_minmax(0,1fr)] gap-x-5 gap-y-6 py-8 sm:grid-cols-[104px_minmax(0,1fr)] sm:gap-x-8 sm:py-10 xl:grid-cols-12 xl:py-12"
            >
              <div className="xl:col-span-2">
                <time
                  dateTime={experience.startDate}
                  className={[
                    'block font-mono text-2xl leading-none font-bold tracking-tight tabular-nums transition-colors group-hover:text-primary sm:text-3xl',
                    current ? 'text-primary' : 'text-base-content',
                  ].join(' ')}
                >
                  {startYear}
                </time>
                <p className="mt-3 font-mono text-xs leading-relaxed text-base-content-muted">
                  {startLabel}
                  <br />
                  {endLabel ? (
                    dictionary.experience.until(endLabel)
                  ) : (
                    <span className="text-primary">{dictionary.experience.present}</span>
                  )}
                </p>
              </div>

              <div className="min-w-0 xl:col-span-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="text-2xl leading-tight font-bold tracking-[-0.025em] text-base-content">
                      {experience.title}
                    </h3>
                    {experience.companyUrl ? (
                      <a
                        href={experience.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-block text-base font-semibold text-primary underline-offset-4 transition-colors hover:text-primary/80 hover:underline"
                      >
                        {experience.company}
                      </a>
                    ) : (
                      <p className="mt-2 text-base font-semibold text-primary">
                        {experience.company}
                      </p>
                    )}
                    <p className="mt-1 text-sm text-base-content-muted">{experience.location}</p>
                  </div>
                  <VCompanyLogo
                    src={experience.companyLogo}
                    alt={`${experience.company} logo`}
                    size="sm"
                    className="shrink-0"
                  />
                </div>
              </div>

              <div className="col-start-2 min-w-0 xl:col-span-6 xl:col-start-auto">
                <p className="max-w-3xl text-base leading-relaxed text-base-content">
                  {experience.summary}
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-2">
                  {current && (
                    <VBadge variant="soft" color="primary" size="sm">
                      {dictionary.experience.current}
                    </VBadge>
                  )}
                  <ul
                    className="flex flex-wrap gap-2"
                    aria-label={dictionary.experience.techLabel(experience.company)}
                  >
                    {experience.tech.map((technology) => (
                      <li
                        key={technology}
                        className="rounded border border-base-300 bg-base-200 px-2 py-1 font-mono text-xs text-secondary"
                      >
                        {technology}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </VSection>
  );
};

export default ExperienceSection;
