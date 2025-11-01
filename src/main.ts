import { createApp } from 'vue';
import pinia from '@/plugins/pinia';
import router from './router';
import App from './app.vue';

const app = createApp(App)
  .use(router)
  .use(pinia);

app.mount('#app');
