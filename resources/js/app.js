require('./bootstrap');

import { createApp } from 'vue';
import AppComponent from './components/App.vue'

let app = createApp({
    components: {
        AppComponent 
    }
});


app.mount('#app');


