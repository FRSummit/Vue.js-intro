import Vue from 'vue';
import Router from 'vue-router';

import About from './views/About.vue';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [                   //this is an array
        {                       //this array will have object, each one have a path
            path: '/',          //this is for home page
            component: Home     //this is for home component
        },
        {
            path: '/about',
            component: About
        }
    ]
})