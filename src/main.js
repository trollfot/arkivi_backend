import Vue from 'vue'

import VueRouter from 'vue-router'
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

import axios from 'axios'

import './assets/custom.scss'
import App from './App.vue'
import { router } from './router'
import AuthService from './auth'


const configElement = document.getElementById('config');
const config = JSON.parse(configElement.innerHTML);
const $http = axios.create({
    baseURL: config.api_url
});

// Vee-Validate configuration
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

Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(CKEditor);
Vue.use(VueRouter)

Vue.use(AuthService, { $http })

Vue.config.productionTip = false

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
    router: router,
}).$mount('#app')


export { $http };
