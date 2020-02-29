import Vue from 'vue'
import App from './App.vue'
import Login from './components/Login.vue'
import Spectacles from './components/Spectacles.vue'
import Spectacle from './components/Spectacle.vue'
import Agenda from './components/Agenda.vue'
import Presentation from './components/Presentation.vue'
import VueRouter from 'vue-router'
import auth from './auth'
import CKEditor from '@ckeditor/ckeditor5-vue';


Vue.use(CKEditor);
Vue.use(VueRouter)
Vue.config.productionTip = false

const routes = [
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
                        path: '',
                        component: Presentation
                    },
                    {
                        name: 'agenda',
                        path: 'agenda',
                        component: Agenda
                    }
                ]
            }
        ]
    }
]

export const router = new VueRouter({
  routes
})

// Check the users auth status when the app starts
auth.checkAuth()

new Vue({
    render: h => h(App),
    router: router
}).$mount('#app')
