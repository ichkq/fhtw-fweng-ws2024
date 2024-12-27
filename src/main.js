import { createApp, markRaw } from 'vue';
import App from './App.vue';
import router from './router';

import './assets/style.css';
import { createPinia } from 'pinia';

const pinia = createPinia();

pinia.use(({store}) => {
    store.$router = markRaw(router);
});

createApp(App)
    .use(pinia)
    .use(router)
    .mount('#app');