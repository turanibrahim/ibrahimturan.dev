import { OhVueIcon, addIcons } from 'oh-vue-icons';
import { FaGithub, FaLinkedin, FaTwitter, FaDev } from 'oh-vue-icons/icons/fa';
import {
  SiJavascript,
  SiVuedotjs,
  SiNuxtdotjs,
  SiVuetify,
  SiReact,
  SiRedux,
  SiDocker,
  SiMongodb,
  SiNginx,
  SiHeroku,
  SiFirebase,
  SiTailwindcss,
  SiVite,
  SiAmazonaws,
} from 'oh-vue-icons/icons/si';
import type { App } from 'vue';

addIcons(
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaDev,
  SiJavascript,
  SiVuedotjs,
  SiNuxtdotjs,
  SiVuetify,
  SiReact,
  SiRedux,
  SiDocker,
  SiMongodb,
  SiNginx,
  SiHeroku,
  SiFirebase,
  SiTailwindcss,
  SiVite,
  SiAmazonaws,
);

export default {
  install: (app: App) => {
    app.component('VIcon', OhVueIcon);
  },
};
