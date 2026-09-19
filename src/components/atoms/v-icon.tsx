import type { CSSProperties, ReactElement } from 'react';
import { FaAws, FaDev, FaFeather, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import type { IconType } from 'react-icons';
import {
  SiAlpinedotjs,
  SiAstro,
  SiDocker,
  SiDrizzle,
  SiExpress,
  SiFastapi,
  SiGithubactions,
  SiHono,
  SiJavascript,
  SiLit,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiNuxt,
  SiPinia,
  SiPostgresql,
  SiReact,
  SiRedis,
  SiRedux,
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
  'fa-feather': FaFeather,
  'si-docker': SiDocker,
  'si-alpinedotjs': SiAlpinedotjs,
  'si-astro': SiAstro,
  'si-express': SiExpress,
  'si-drizzle': SiDrizzle,
  'si-githubactions': SiGithubactions,
  'si-fastapi': SiFastapi,
  'si-javascript': SiJavascript,
  'si-hono': SiHono,
  'si-nextdotjs': SiNextdotjs,
  'si-lit': SiLit,
  'si-mongodb': SiMongodb,
  'si-nodedotjs': SiNodedotjs,
  'si-nuxtdotjs': SiNuxt,
  'si-pinia': SiPinia,
  'si-postgresql': SiPostgresql,
  'si-react': SiReact,
  'si-redis': SiRedis,
  'si-redux': SiRedux,
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
