import Vue from 'vue'
import App from './App.vue'
import Login from './components/Login.vue'
import VueRouter from 'vue-router'
import auth from './auth'


// Check the users auth status when the app starts
auth.checkAuth()


Vue.use(VueRouter)
Vue.config.productionTip = false

const routes = [
    { path: '/login', component: Login },
]

export const router = new VueRouter({
  routes
})


new Vue({
    render: h => h(App),
    router: router
}).$mount('#app')
