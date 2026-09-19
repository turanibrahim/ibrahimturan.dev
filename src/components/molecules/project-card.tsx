import type { ReactElement } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import type { Project } from '@/types/project';

interface Props {
  index: number;
  project: Project;
}

export const ProjectCard = ({ index, project }: Props): ReactElement => (
  <article className="border-t border-base-300">
    <details className="group">
      <summary className="grid cursor-pointer list-none grid-cols-[40px_minmax(0,1fr)] gap-x-4 gap-y-4 py-7 transition-colors hover:bg-base-300/20 sm:grid-cols-[48px_minmax(0,1fr)_auto] sm:gap-x-6 lg:py-9 [&::-webkit-details-marker]:hidden">
        <span className="pt-1 font-mono text-xs tabular-nums text-primary">
          {index.toString().padStart(2, '0')}
        </span>

        <div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <h3 className="text-2xl font-bold tracking-[-0.025em] text-base-content">
              {project.name}
            </h3>
            {project.engagement === 'Freelance' && (
              <span className="rounded border border-base-300 bg-base-200 px-2 py-1 font-mono text-xs text-secondary">
                {project.engagement}
              </span>
            )}
          </div>
          <p className="mt-3 font-mono text-xs leading-relaxed text-primary">{project.ownership}</p>
          <p className="mt-4 text-base leading-relaxed text-base-content-muted">
            {project.summary}
          </p>
        </div>

        <span
          data-print-hidden
          className="col-start-2 inline-flex min-h-11 items-center gap-2 self-start font-mono text-xs text-primary sm:col-start-3 sm:row-start-1"
        >
          <span className="group-open:hidden">View details</span>
          <span className="hidden group-open:inline">Hide details</span>
          <FiChevronDown
            aria-hidden="true"
            className="text-base transition-transform group-open:rotate-180"
          />
        </span>
      </summary>

      <div className="project-details grid gap-8 pb-9 pl-14 sm:grid-cols-[minmax(0,1fr)_minmax(220px,0.55fr)] sm:pl-[72px]">
        <div>
          <h4 className="font-semibold text-base-content">Principal contributions</h4>
          <ul className="mt-4 space-y-3 text-base leading-relaxed text-base-content-muted">
            {project.contributions.map((contribution) => (
              <li key={contribution} className="flex gap-3">
                <span aria-hidden="true" className="mt-[0.7em] h-px w-4 shrink-0 bg-primary" />
                <span>{contribution}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col items-start gap-7">
          <div>
            <h4 className="font-semibold text-base-content">Technology stack</h4>
            <ul
              aria-label={`${project.name} technology stack`}
              className="mt-4 flex flex-wrap gap-2"
            >
              {project.stack.map((technology) => (
                <li
                  key={technology}
                  className="rounded border border-base-300 bg-base-200 px-2 py-1 font-mono text-xs text-secondary"
                >
                  {technology}
                </li>
              ))}
            </ul>
          </div>

          {project.links.length > 0 && (
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
          )}
        </div>
      </div>
    </details>
  </article>
);

export default ProjectCard;
