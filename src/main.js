import { createApp } from 'vue';
import pinia from '@/plugins/pinia';
import router from './router';
import App from './App.vue';
import '@/assets/styles/main.scss';
import '@/plugins/firebase';

const app = createApp(App)
  .use(router)
  .use(pinia);

app.mount('#app');
