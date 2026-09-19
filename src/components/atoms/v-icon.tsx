import type { CSSProperties, ReactElement } from 'react';
import { FaAws, FaDev, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import type { IconType } from 'react-icons';
import {
  SiDocker,
  SiExpress,
  SiGithubactions,
  SiJavascript,
  SiNextdotjs,
  SiNodedotjs,
  SiNuxt,
  SiPostgresql,
  SiReact,
  SiRedis,
  SiTailwindcss,
  SiTypescript,
  SiVite,
  SiVuedotjs,
} from 'react-icons/si';
import type { VIconProps } from '@/types/v-icon';

interface Props extends VIconProps {
  className?: string;
}

const icons: Record<string, IconType> = {
  'fa-dev': FaDev,
  'fa-github': FaGithub,
  'fa-linkedin': FaLinkedin,
  'fa-twitter': FaTwitter,
  'si-amazonaws': FaAws,
  'si-docker': SiDocker,
  'si-express': SiExpress,
  'si-githubactions': SiGithubactions,
  'si-javascript': SiJavascript,
  'si-nextdotjs': SiNextdotjs,
  'si-nodedotjs': SiNodedotjs,
  'si-nuxtdotjs': SiNuxt,
  'si-postgresql': SiPostgresql,
  'si-react': SiReact,
  'si-redis': SiRedis,
  'si-tailwindcss': SiTailwindcss,
  'si-typescript': SiTypescript,
  'si-vite': SiVite,
  'si-vuedotjs': SiVuedotjs,
};

const flipTransforms = {
  horizontal: 'scaleX(-1)',
  vertical: 'scaleY(-1)',
  both: 'scale(-1)',
};

export const VIcon = ({
  name,
  scale = 1,
  animation,
  flip,
  label,
  className,
}: Props): ReactElement => {
  const Icon = icons[name];

  if (!Icon) {
    throw new Error(`Unknown icon: ${name}`);
  }

  const style: CSSProperties | undefined = flip ? { transform: flipTransforms[flip] } : undefined;

  return (
    <Icon
      size={`${scale}em`}
      className={['v-icon', animation && `v-icon-${animation}`, className]
        .filter(Boolean)
        .join(' ')}
      style={style}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
    />
  );
};

export default VIcon;
