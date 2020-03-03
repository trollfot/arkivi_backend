import Vue from 'vue'
import App from './App.vue'
import Login from './components/Login.vue'
import Spectacles from './components/Spectacles.vue'
import Spectacle from './components/Spectacle.vue'
import Presentation from './components/Presentation.vue'
import Agenda from './components/Agenda.vue'
import Files from './components/Files.vue'
import Gallery from './components/Gallery.vue'
import VueRouter from 'vue-router'
import auth_service from './auth'
import CKEditor from '@ckeditor/ckeditor5-vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import {
  ValidationObserver,
  ValidationProvider,
  extend,
  localize
} from "vee-validate";
import en from "vee-validate/dist/locale/fr.json";
import * as rules from "vee-validate/dist/rules";
import './assets/custom.scss'
import axios from 'axios'
import spectacles_service from './spectacles'

localize("en", en);

Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
});

const alphanum = new RegExp("^[a-zA-Z0-9]+$");

extend('alphanum', (value) => {
    if (alphanum.test(value)) {
        return true;
    }
    return 'Ce champ ne peut contenir que des chiffres et des lettres';
});

// Install VeeValidate components globally
Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(CKEditor);
Vue.use(VueRouter)
Vue.config.productionTip = false


const configElement = document.getElementById('config');
const config = JSON.parse(configElement.innerHTML);

auth_service.api_url = config.api;
spectacles_service.api_url = config.api;
spectacles_service.static_url = config.static;
spectacles_service.web_url = config.web;


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
]

export const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
    const publicPages = ['/login'];
    const authRequired = !publicPages.includes(to.path);

    if (authRequired && !auth_service.user.authenticated) {
        next('/login');
    } else {
        next();
    }
});

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

axios.interceptors.response.use(
    (response) => {
        return response
    },
    (result) => {
        if (result.response === undefined) {
            console.log('Network error.');
            throw 'This needs to fail'
        } else {
            console.log(result.response);
            if (result.response.status === 401) {
                auth_service.logout();
                router.push('/');
            }
        }
        return result
    }
)

auth_service.checkAuth()


new Vue({
    render: h => h(App),
    router: router
}).$mount('#app')
