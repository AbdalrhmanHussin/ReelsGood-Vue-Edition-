import { createApp } from 'vue';
import router from './router.js';
import store  from './store.js';
import plugin from './collectors.js';


import AppComponent from './components/App.vue'
let app = createApp({
    components: {
        AppComponent,
    },
});

app.use(router)
   .use(plugin)
   .use(store)
   .mount("#app")