import type { ReactElement } from 'react';
import VHeading from '@/components/atoms/v-heading';
import VIcon from '@/components/atoms/v-icon';
import VSection from '@/components/atoms/v-section';
import type { Dictionary } from '@/i18n/dictionary';
import type { TechCategory, Technology } from '@/types/technology';

interface Props {
  dictionary: Dictionary;
  technologies: readonly Technology[];
}

const categoryOrder: TechCategory[] = ['frontend', 'mobile', 'backend', 'tooling'];

const levelStyles: Record<Technology['level'], string> = {
  familiar: 'border-base-300 bg-transparent text-base-content-muted',
  primary: 'border-primary/40 bg-primary/10 text-base-content',
  working: 'border-base-300 bg-base-100 text-base-content',
};

const groupTechnologies = (technologies: readonly Technology[]) =>
  technologies.reduce(
    (accumulator, technology) => {
      accumulator[technology.category].push(technology);
      return accumulator;
    },
    { backend: [], frontend: [], mobile: [], tooling: [] } as Record<TechCategory, Technology[]>,
  );

export const TechnologiesSection = ({ dictionary, technologies }: Props): ReactElement => {
  const grouped = groupTechnologies(technologies);

  return (
    <VSection
      id="technologies"
      ariaLabelledby="technologies-heading"
      paddingY="xl"
      background="base-200"
    >
      <div className="grid gap-12 lg:grid-cols-[280px_1fr] lg:gap-20">
        <aside className="tech-aside">
          <p className="font-mono text-xs text-primary">{dictionary.technologies.kicker}</p>
          <VHeading
            id="technologies-heading"
            level="2"
            className="mt-4 text-4xl leading-[1.05] font-extrabold tracking-[-0.04em] text-base-content sm:text-5xl"
          >
            {dictionary.technologies.heading}
          </VHeading>
          <p className="mt-6 text-base text-base-content-muted">{dictionary.technologies.intro}</p>
          <div className="mt-8 border-t border-base-300 pt-6">
            <p className="font-mono text-xs text-base-content-muted">
              {dictionary.technologies.shipping}
            </p>
            <p className="mt-2 text-2xl font-bold tracking-[-0.02em] text-base-content">
              {dictionary.technologies.shippingStack}
            </p>
          </div>
        </aside>

        <div className="tech-grid space-y-10">
          {categoryOrder.map((category) => (
            <div key={category} className="tech-group">
              <div className="mb-4 flex items-baseline justify-between gap-3">
                <h3 className="text-lg font-bold tracking-[-0.02em] text-base-content">
                  {dictionary.technologies.groups[category].label}
                </h3>
                <span className="font-mono text-xs text-base-content-muted">
                  {dictionary.technologies.groups[category].blurb}
                </span>
              </div>
              <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
                {grouped[category].map((technology) => (
                  <li
                    key={technology.id}
                    className={[
                      'flex items-center gap-3 rounded-md border px-3 py-2.5 transition-colors hover:border-primary',
                      levelStyles[technology.level],
                    ].join(' ')}
                  >
                    {technology.icon && (
                      <VIcon name={technology.icon} className="shrink-0 text-base" />
                    )}
                    <p className="min-w-0 flex-1 truncate text-sm leading-tight font-semibold">
                      {technology.name}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </VSection>
  );
};

export default TechnologiesSection;
