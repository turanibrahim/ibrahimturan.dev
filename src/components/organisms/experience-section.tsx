import type { ReactElement } from 'react';
import VBadge from '@/components/atoms/v-badge';
import VCompanyLogo from '@/components/atoms/v-company-logo';
import VHeading from '@/components/atoms/v-heading';
import VSection from '@/components/atoms/v-section';
import experiencesData from '@/data/experiences.json';
import type { Experience } from '@/types/experience';

const experiences = experiencesData.experiences as Experience[];
const earliestExperience = experiences.at(-1);
const totalYears = earliestExperience
  ? new Date().getFullYear() - new Date(earliestExperience.startDate).getFullYear()
  : 0;

export const ExperienceSection = (): ReactElement => (
  <VSection id="experience" ariaLabelledby="experience-heading" background="base-100" paddingY="xl">
    <div className="grid gap-12 lg:grid-cols-[280px_1fr] lg:gap-20">
      <aside className="experience-aside">
        <p className="font-mono text-xs text-primary">work</p>
        <VHeading
          id="experience-heading"
          level="2"
          className="mt-4 text-4xl leading-[1.05] font-extrabold tracking-[-0.04em] text-base-content sm:text-5xl"
        >
          Six years of product engineering.
        </VHeading>
        <p className="mt-6 text-base text-base-content-muted">
          Building web and mobile products across startups and enterprise — frontend, backend, and
          the seams in between.
        </p>
        <div className="mt-8 flex items-baseline gap-3 border-t border-base-300 pt-6">
          <span className="font-mono text-5xl font-black tracking-[-0.06em] text-primary">
            {totalYears}+
          </span>
          <span className="text-sm text-base-content-muted">
            years shipping
            <br />
            production products
          </span>
        </div>
        <div className="mt-6 flex flex-wrap gap-2 font-mono text-xs text-base-content-muted">
          <span className="rounded border border-base-300 px-2 py-1">Product</span>
          <span className="rounded border border-base-300 px-2 py-1">React</span>
          <span className="rounded border border-base-300 px-2 py-1">Vue</span>
          <span className="rounded border border-base-300 px-2 py-1">Node.js</span>
        </div>
      </aside>

      <ol className="experience-timeline relative space-y-0 before:absolute before:top-0 before:bottom-0 before:left-[31px] before:w-px before:bg-base-300 before:content-[''] sm:before:left-[47px]">
        {experiences.map((experience, index) => {
          const current = !experience.endDate;
          return (
            <li
              key={`${experience.company}-${experience.startDate}`}
              className="group grid grid-cols-[64px_1fr] gap-4 border-t border-base-300 py-7 first:border-t-0 first:pt-0 last:border-b sm:grid-cols-[96px_1fr] sm:gap-8 sm:py-9"
            >
              <div className="relative">
                <span
                  className={[
                    'block font-mono text-2xl leading-none font-bold tracking-tight group-hover:text-primary sm:text-3xl',
                    current ? 'text-primary' : 'text-base-content',
                  ].join(' ')}
                >
                  {new Date(experience.startDate).getFullYear()}
                </span>
                <span
                  className={[
                    'absolute -left-[7px] top-1 h-3 w-3 rounded-full border-2 border-base-100',
                    current
                      ? 'bg-primary ring-4 ring-primary/20'
                      : 'bg-base-300 group-hover:bg-primary',
                  ].join(' ')}
                  aria-hidden="true"
                />
                {index === 0 && (
                  <span
                    className="absolute -left-[5px] top-5 h-[calc(100%+1.75rem)] w-px bg-base-300"
                    aria-hidden="true"
                  />
                )}
              </div>

              <div className="space-y-3">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-xs text-base-content-muted">
                      {new Date(experience.startDate).toLocaleString('en-US', { month: 'short' })} —{' '}
                      {experience.endDate ? (
                        new Date(experience.endDate).getFullYear()
                      ) : (
                        <span className="text-primary">Now</span>
                      )}
                    </p>
                    <h3 className="mt-1 text-2xl font-bold tracking-[-0.025em] text-base-content sm:text-[1.65rem]">
                      {experience.title} <span className="text-base-content-muted">·</span>{' '}
                      <a
                        href={experience.companyUrl || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary transition-colors hover:text-primary/80"
                      >
                        {experience.company}
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-base-content-muted">{experience.location}</p>
                  </div>
                  <VCompanyLogo
                    src={experience.companyLogo}
                    alt={`${experience.company} logo`}
                    className="shrink-0"
                  />
                </div>

                <p className="max-w-2xl text-base leading-relaxed text-base-content">
                  {experience.summary}
                </p>

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  {current && (
                    <VBadge variant="soft" color="primary" size="sm">
                      Currently here
                    </VBadge>
                  )}
                  {experience.tech.map((technology) => (
                    <span
                      key={technology}
                      className="rounded border border-base-300 bg-base-200 px-2 py-1 font-mono text-xs text-secondary"
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  </VSection>
);

export default ExperienceSection;
