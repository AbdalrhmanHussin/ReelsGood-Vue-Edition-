import { createRouter, createWebHistory } from 'vue-router';

//Components Import

import App from './components/App.vue';
import AppLayout from './components/Layouts/MainLayout.vue'
import discover from './components/Pages/discover.vue'
import show from './components/Pages/show.vue';
import notFound from './components/Pages/404.vue';
import person from './components/Pages/person.vue';
import display from './components/Pages/display.vue';



const router = new createRouter({
    history: createWebHistory(),
    routes: [
        {path:'',redirect:'/discover'},
        {path:'',component:App,children:[
            {path:'',component:AppLayout,children:[
                {path: '/discover',component:discover,name:'discover'},
                {path: '/person/:id',component:person,name:'person',props:true},
                {path: '/discover/:type/:id?',component:display,name:'display',props:true},
                {path: '/:type/:id',component:show,name:'show',props:true},
                {path: "*",component:notFound,name:'notfound'}
            ]},
            { path: "*", component:notFound }
        ], 
        meta: {
            progress: {
              func: [
                { call: "color", modifier: "temp", argument: "#00dc89" },
                { call: "fail", modifier: "temp", argument: "#6e0000" },
                { call: "location", modifier: "temp", argument: "top" },
                {
                  call: "transition",
                  modifier: "temp",
                  argument: { speed: "1.5s", opacity: "0.6s", termination: 400 },
                },
              ],
            },
        },}
    ]
});

router.afterEach(() => {
  window.scrollTo({
    top: 10
})
 window.scrollTo({
    top: 0
})
})


export default router;
