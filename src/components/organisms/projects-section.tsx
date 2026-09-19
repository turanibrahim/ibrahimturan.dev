import type { ReactElement } from 'react';
import VHeading from '@/components/atoms/v-heading';
import VSection from '@/components/atoms/v-section';
import ProjectCard from '@/components/molecules/project-card';
import { projects } from '@/constants/projects';

export const ProjectsSection = (): ReactElement => (
  <VSection id="projects" ariaLabelledby="projects-heading" background="base-100" paddingY="xl">
    <div className="grid gap-12 lg:grid-cols-[280px_1fr] lg:gap-20">
      <aside>
        <VHeading
          id="projects-heading"
          level="2"
          className="text-4xl leading-[1.05] font-extrabold tracking-[-0.04em] text-base-content sm:text-5xl"
        >
          Selected projects.
        </VHeading>
        <p className="mt-6 text-base leading-relaxed text-base-content-muted">
          Small, focused products that turn practical problems into reliable browser experiences.
        </p>
      </aside>

      <ul className="border-b border-base-300">
        {projects.map((project) => (
          <li key={project.name}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </div>
  </VSection>
);

export default ProjectsSection;
