import type { ReactElement } from 'react';
import VIcon from '@/components/atoms/v-icon';
import { profile } from '@/data/content';

interface Props {
  className?: string;
}

const userInfo = profile;
const socialLinks = [
  { name: 'github', label: 'GitHub profile', url: userInfo.github, icon: 'fa-github' },
  { name: 'linkedin', label: 'LinkedIn profile', url: userInfo.linkedin, icon: 'fa-linkedin' },
  { name: 'devto', label: 'Dev.to profile', url: userInfo.devto, icon: 'fa-dev' },
  { name: 'twitter', label: 'X (Twitter) profile', url: userInfo.twitter, icon: 'fa-twitter' },
];

export const SocialLinks = ({ className }: Props): ReactElement => (
  <div className={['flex items-center gap-2', className].filter(Boolean).join(' ')}>
    {socialLinks.map((link) => (
      <a
        key={link.name}
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={link.label}
        className="btn btn-circle btn-ghost"
      >
        <VIcon name={link.icon} className="h-5 w-5" />
      </a>
    ))}
  </div>
);

export default SocialLinks;
