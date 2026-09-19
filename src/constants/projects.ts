import type { Project } from '@/types/project';

export const projects = [
  {
    name: 'Underline AI',
    description:
      'Extracts underlined text from screenshots, scans, and photos with Gemini, entirely in the browser.',
    stack: ['Vue 3', 'TypeScript', 'Tailwind CSS', 'Pinia', 'Dexie', 'Gemini API'],
    links: [
      {
        kind: 'live',
        label: 'Open live demo',
        url: 'https://underline-ai.ibrahimturan.com/',
      },
      {
        kind: 'repository',
        label: 'View repository',
        url: 'https://github.com/turanibrahim/underline-ai',
      },
    ],
  },
  {
    name: 'Wheel of Names',
    description:
      'Turns a custom list of names into an animated wheel for quickly choosing a random winner.',
    stack: ['Vue 3', 'TypeScript', 'Tailwind CSS', 'Vite'],
    links: [
      {
        kind: 'live',
        label: 'Open live demo',
        url: 'https://wheel-of-names-9xw.pages.dev/',
      },
      {
        kind: 'repository',
        label: 'View repository',
        url: 'https://github.com/turanibrahim/wheel-of-names',
      },
    ],
  },
  {
    name: 'ibrahimturan.dev',
    description:
      'A static, PWA-ready portfolio that pairs accessible content with a documented design system.',
    stack: ['Astro', 'React', 'TypeScript', 'Tailwind CSS', 'DaisyUI'],
    links: [
      {
        kind: 'live',
        label: 'Visit website',
        url: 'https://ibrahimturan.dev/',
      },
      {
        kind: 'repository',
        label: 'View repository',
        url: 'https://github.com/turanibrahim/ibrahimturan.dev',
      },
    ],
  },
] as const satisfies readonly Project[];
