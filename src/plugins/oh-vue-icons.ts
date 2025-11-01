import { OhVueIcon, addIcons } from 'oh-vue-icons';
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaDev,
} from 'oh-vue-icons/icons/fa';
import type { App } from 'vue';

addIcons(FaGithub, FaLinkedin, FaTwitter, FaDev);

export default {
  install: (app: App) => {
    app.component('v-icon', OhVueIcon);
  },
};
