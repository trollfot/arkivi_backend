/* Routing
*/
import VueRouter from 'vue-router'

import Login from './components/Login.vue'
import Shows from './components/Shows.vue'
import Show from './components/Show.vue'
import Presentation from './components/Presentation.vue'
import Agenda from './components/Agenda.vue'
import Files from './components/Files.vue'
import Gallery from './components/Gallery.vue'


const router = new VueRouter({
    routes : [
    {
        path: '/login',
        component: Login
    },
    {
        path: '/shows',
        component: Shows,
        children: [
            {
                name: 'show',
                path: ':id',
                component: Show,
                children: [
                    {
                        name: 'presentation',
                        path: 'presentation',
                        component: Presentation,
                        props: true
                    },
                    {
                        name: 'agenda',
                        path: 'agenda',
                        component: Agenda
                    },
                    {
                        name: 'gallery',
                        path: 'gallery',
                        component: Gallery
                    },
                    {
                        name: 'files',
                        path: 'files',
                        component: Files
                    },
                ]
            }
        ]
    }
]});

router.beforeEach((to, from, next) => {
    const publicPages = ['/login'];
    const authRequired = !publicPages.includes(to.path);
    next(vm => {
        if (authRequired && !vm.$auth.user.authenticated) {
            return '/login';
        }
        return
    })
});


export { router };
