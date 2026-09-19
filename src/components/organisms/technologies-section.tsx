import type { ReactElement } from 'react';
import VHeading from '@/components/atoms/v-heading';
import VIcon from '@/components/atoms/v-icon';
import VSection from '@/components/atoms/v-section';
import technologiesData from '@/data/technologies.json';
import type { TechCategory, TechCategoryGroup, Technology } from '@/types/technology';

const technologies = technologiesData as Technology[];
const groups: TechCategoryGroup[] = [
  {
    key: 'frontend',
    label: 'Frontend',
    blurb: 'Web apps, design systems, and component architecture.',
  },
  { key: 'mobile', label: 'Mobile', blurb: 'Cross-platform product builds.' },
  { key: 'backend', label: 'Backend', blurb: 'APIs, services, and data layers.' },
  { key: 'tooling', label: 'Tooling', blurb: 'Build, test, ship, observe.' },
];
const grouped = technologies.reduce(
  (accumulator, technology) => {
    accumulator[technology.category].push(technology);
    return accumulator;
  },
  { frontend: [], mobile: [], backend: [], tooling: [] } as Record<TechCategory, Technology[]>,
);
const levelStyles: Record<Technology['level'], string> = {
  primary: 'border-primary/40 bg-primary/10 text-base-content',
  working: 'border-base-300 bg-base-100 text-base-content',
  familiar: 'border-base-300 bg-transparent text-base-content-muted',
};

export const TechnologiesSection = (): ReactElement => (
  <VSection
    id="technologies"
    ariaLabelledby="technologies-heading"
    paddingY="xl"
    background="base-200"
  >
    <div className="grid gap-12 lg:grid-cols-[280px_1fr] lg:gap-20">
      <aside className="tech-aside">
        <p className="font-mono text-xs text-primary">stack</p>
        <VHeading
          id="technologies-heading"
          level="2"
          className="mt-4 text-4xl leading-[1.05] font-extrabold tracking-[-0.04em] text-base-content sm:text-5xl"
        >
          Full-stack, frontend-leaning.
        </VHeading>
        <p className="mt-6 text-base text-base-content-muted">
          React, Vue, React Native, and Node.js — paired with the build, test, and deploy systems
          that keep a product moving.
        </p>
        <div className="mt-8 border-t border-base-300 pt-6">
          <p className="font-mono text-xs text-base-content-muted">Currently shipping</p>
          <p className="mt-2 text-2xl font-bold tracking-[-0.02em] text-base-content">
            React · TypeScript · Node.js
          </p>
        </div>
      </aside>

      <div className="tech-grid space-y-10">
        {groups.map((group) => (
          <div key={group.key} className="tech-group">
            <div className="mb-4 flex items-baseline justify-between gap-3">
              <h3 className="text-lg font-bold tracking-[-0.02em] text-base-content">
                {group.label}
              </h3>
              <span className="font-mono text-xs text-base-content-muted">{group.blurb}</span>
            </div>
            <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
              {grouped[group.key].map((technology) => (
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

export default TechnologiesSection;
