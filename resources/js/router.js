import { createRouter, createWebHistory } from 'vue-router';

//Components Import

import App from './components/App.vue';

import MainLayout from './components/Layouts/MainLayout.vue'


const router = new createRouter({
    history: createWebHistory(),
    routes: [
        {path:'/',component:App,name:'home',children:[
        ]}
    ]
});


export default router;
