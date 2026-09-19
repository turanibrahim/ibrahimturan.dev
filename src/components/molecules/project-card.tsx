import type { ReactElement } from 'react';
import type { Project } from '@/types/project';

interface Props {
  project: Project;
}

export const ProjectCard = ({ project }: Props): ReactElement => (
  <article className="grid gap-8 border-t border-base-300 py-8 transition-colors hover:border-primary/50 sm:grid-cols-[minmax(0,1.35fr)_minmax(220px,0.65fr)] sm:gap-10 lg:py-10">
    <div>
      <h3 className="text-2xl font-bold tracking-[-0.025em] text-base-content">{project.name}</h3>
      <p className="mt-4 text-base leading-relaxed text-base-content-muted">
        {project.description}
      </p>
    </div>

    <div className="flex flex-col items-start gap-6">
      <ul aria-label={`${project.name} technology stack`} className="flex flex-wrap gap-2">
        {project.stack.map((technology) => (
          <li
            key={technology}
            className="rounded border border-base-300 bg-base-200 px-2 py-1 font-mono text-xs text-secondary"
          >
            {technology}
          </li>
        ))}
      </ul>

      <nav aria-label={`${project.name} links`} className="flex flex-wrap gap-x-5 gap-y-3">
        {project.links.map((link) => (
          <a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`${link.label} for ${project.name} (opens in a new tab)`}
            className="inline-flex min-h-11 items-center border-b border-primary/40 font-semibold text-primary underline-offset-4 transition-colors hover:border-primary hover:text-primary/80"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </div>
  </article>
);

export default ProjectCard;
