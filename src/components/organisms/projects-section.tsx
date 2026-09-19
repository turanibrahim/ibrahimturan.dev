import type { ReactElement } from 'react';
import VHeading from '@/components/atoms/v-heading';
import VSection from '@/components/atoms/v-section';
import ProjectCard from '@/components/molecules/project-card';
import { projects } from '@/constants/projects';

export const ProjectsSection = (): ReactElement => (
  <VSection id="projects" ariaLabelledby="projects-heading" background="base-100" paddingY="xl">
    <div className="grid gap-12 lg:grid-cols-[280px_1fr] lg:gap-20">
      <aside className="lg:sticky lg:top-12 lg:self-start">
        <VHeading
          id="projects-heading"
          level="2"
          className="text-4xl leading-[1.05] font-extrabold tracking-[-0.04em] text-base-content sm:text-5xl"
        >
          Project history.
        </VHeading>
        <p className="mt-6 text-base leading-relaxed text-base-content-muted">
          A chronological record of company, internal, and freelance work. Open a project for
          responsibilities, outcomes, and its technology stack.
        </p>
      </aside>

      <ol className="border-b border-base-300">
        {projects.map((project, index) => (
          <li key={project.name} className="max-w-none">
            <ProjectCard project={project} index={index + 1} />
          </li>
        ))}
      </ol>
    </div>
  </VSection>
);

export default ProjectsSection;
