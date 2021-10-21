import { createRouter, createWebHistory } from 'vue-router';

//Components Import

import App from './components/App.vue';
import AppLayout from './components/Layouts/MainLayout.vue'
import discover from './components/Pages/discover.vue'


const router = new createRouter({
    history: createWebHistory(),
    routes: [
        {path:'',component:App,children:[
            {path:'',component:AppLayout,children:[
                {path: '',component:discover,name:'discover'}
            ]}
        ]}
    ]
});


export default router;
