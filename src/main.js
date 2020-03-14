import axios from 'axios'
import Vue from 'vue'
import VueRouter from 'vue-router'
import CKEditor from '@ckeditor/ckeditor5-vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(CKEditor);
Vue.use(VueRouter)

import './filter'
import './validation'
import './assets/custom.scss'
import App from './App.vue'
import { router } from './router'
import { store } from './store'
import AuthService from './auth'
import Flash from './flash'

const configElement = document.getElementById('config');
const config = JSON.parse(configElement.innerHTML);
const $http = axios.create({
    baseURL: config.api_url
});

export { $http };

Vue.use(AuthService, { $http })
Vue.use(Flash, { store })
Vue.config.productionTip = false

new Vue({
    store,
    render: h => h(App),
    router: router,
}).$mount('#app')
