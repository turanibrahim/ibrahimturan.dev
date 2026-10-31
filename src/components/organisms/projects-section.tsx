import type { ReactElement } from 'react';
import VHeading from '@/components/atoms/v-heading';
import VSection from '@/components/atoms/v-section';
import ProjectCard from '@/components/molecules/project-card';
import type { Dictionary } from '@/i18n/dictionary';
import type { Project } from '@/types/project';

interface Props {
  dictionary: Dictionary;
  projects: readonly Project[];
}

export const ProjectsSection = ({ dictionary, projects }: Props): ReactElement => (
  <VSection id="projects" ariaLabelledby="projects-heading" background="base-100" paddingY="xl">
    <div className="grid gap-12 lg:grid-cols-[280px_1fr] lg:gap-20">
      <aside className="lg:sticky lg:top-12 lg:self-start">
        <VHeading
          id="projects-heading"
          level="2"
          className="text-4xl leading-[1.05] font-extrabold tracking-[-0.04em] text-base-content sm:text-5xl"
        >
          {dictionary.projects.heading}
        </VHeading>
      </aside>

      <ol className="border-b border-base-300">
        {projects.map((project, index) => (
          <li key={project.name} className="max-w-none">
            <ProjectCard dictionary={dictionary} index={index + 1} project={project} />
          </li>
        ))}
      </ol>
    </div>
  </VSection>
);

export default ProjectsSection;
