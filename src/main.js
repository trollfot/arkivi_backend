import Vue from 'vue'
import App from './App.vue'
import Login from './components/Login.vue'
import Spectacles from './components/Spectacles.vue'
import Spectacle from './components/Spectacle.vue'
import Agenda from './components/Agenda.vue'
import Files from './components/Files.vue'
import Gallery from './components/Gallery.vue'
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
]

export const router = new VueRouter({
  routes
})

// Check the users auth status when the app starts
auth.checkAuth()

Vue.filter('formatSize', function (size) {
    if (size > 1024 * 1024 * 1024 * 1024) {
        return (size / 1024 / 1024 / 1024 / 1024).toFixed(2) + ' TB'
    } else if (size > 1024 * 1024 * 1024) {
        return (size / 1024 / 1024 / 1024).toFixed(2) + ' GB'
    } else if (size > 1024 * 1024) {
        return (size / 1024 / 1024).toFixed(2) + ' MB'
    } else if (size > 1024) {
        return (size / 1024).toFixed(2) + ' KB'
    }
    return size.toString() + ' B'
})

new Vue({
    render: h => h(App),
    router: router
}).$mount('#app')
