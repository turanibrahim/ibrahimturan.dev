import { createApp } from 'vue';
import pinia from '@/plugins/pinia';
import ohVueIcons from '@/plugins/oh-vue-icons';
import router from './router';
import App from './app.vue';

const app = createApp(App).use(router).use(pinia).use(ohVueIcons);

app.mount('#app');
