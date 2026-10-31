import type { ReactElement } from 'react';
import VIcon from '@/components/atoms/v-icon';
import type { Dictionary } from '@/i18n/dictionary';
import type { UserInfo } from '@/types/user';

interface Props {
  className?: string;
  labels: Dictionary['social'];
  profile: UserInfo;
}

const socialNetworks = ['github', 'linkedin', 'devto', 'twitter'] as const;

const socialIcons: Record<(typeof socialNetworks)[number], string> = {
  devto: 'fa-dev',
  github: 'fa-github',
  linkedin: 'fa-linkedin',
  twitter: 'fa-twitter',
};

export const SocialLinks = ({ className, labels, profile }: Props): ReactElement => (
  <div className={['flex items-center gap-2', className].filter(Boolean).join(' ')}>
    {socialNetworks.map((network) => (
      <a
        key={network}
        href={profile[network]}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={labels[network]}
        className="btn btn-circle btn-ghost"
      >
        <VIcon name={socialIcons[network]} className="h-5 w-5" />
      </a>
    ))}
  </div>
);

export default SocialLinks;
