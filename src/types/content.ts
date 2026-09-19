import type { Experience } from '@/types/experience';
import type { Project } from '@/types/project';
import type { Technology } from '@/types/technology';
import type { UserInfo } from '@/types/user';

export interface PortfolioContent {
  profile: UserInfo;
  experiences: Experience[];
  projects: Project[];
  technologies: Technology[];
}
