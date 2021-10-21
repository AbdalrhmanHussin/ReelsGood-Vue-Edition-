import { createApp } from 'vue';
import router from './router.js';
import store  from './store.js';
import plugin from './collectors.js';
import VueSplide from '@splidejs/vue-splide';
import '@splidejs/splide/dist/css/themes/splide-skyblue.min.css';




import AppComponent from './components/App.vue'
let app = createApp({
    components: {
        AppComponent,
    },
});

app.use(router)
   .use(plugin)
   .use(store)
   .use(VueSplide)
   .mount("#app")