/* Routing
*/
import VueRouter from 'vue-router'

import Login from './components/Login.vue'
import Spectacles from './components/Spectacles.vue'
import Spectacle from './components/Spectacle.vue'
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
        path: '/spectacles',
        component: Spectacles,
        children: [
            {
                name: 'spectacle',
                path: ':id',
                component: Spectacle,
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
    console.log('I need stuff !')
    next(vm => {
        if (authRequired && !vm.$auth.user.authenticated) {
            return '/login';
        }
        return
    })
});


export { router };
