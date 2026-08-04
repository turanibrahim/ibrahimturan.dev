import { OhVueIcon, addIcons } from 'oh-vue-icons';
import { FaGithub, FaLinkedin, FaTwitter, FaDev } from 'oh-vue-icons/icons/fa';
import {
  SiJavascript,
  SiTypescript,
  SiVuedotjs,
  SiNuxtdotjs,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiVite,
  SiNodedotjs,
  SiExpress,
  SiPostgresql,
  SiRedis,
  SiDocker,
  SiAmazonaws,
  SiGithubactions,
} from 'oh-vue-icons/icons/si';
import type { App } from 'vue';

addIcons(
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaDev,
  SiJavascript,
  SiTypescript,
  SiVuedotjs,
  SiNuxtdotjs,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiVite,
  SiNodedotjs,
  SiExpress,
  SiPostgresql,
  SiRedis,
  SiDocker,
  SiAmazonaws,
  SiGithubactions,
);

export default {
  install: (app: App) => {
    app.component('VIcon', OhVueIcon);
  },
};
