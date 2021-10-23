import { createRouter, createWebHistory } from 'vue-router';

//Components Import

import App from './components/App.vue';
import AppLayout from './components/Layouts/MainLayout.vue'
import discover from './components/Pages/discover.vue'
import show from './components/Pages/show.vue';


const router = new createRouter({
    history: createWebHistory(),
    routes: [
        {path:'',component:App,children:[
            {path:'',component:AppLayout,children:[
                {path: '',component:discover,name:'discover'},
                {path: 'show/:id',component:show,name:'show',props:true}
            ]}
        ], meta: {
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


export default router;
