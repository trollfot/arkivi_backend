import { router } from './main';
import axios from 'axios'


const API_URL = 'http://kraft.novareto.de:9999/'
const LOGIN_URL = API_URL + 'admin/login'


export default {
    url_root: LOGIN_URL,

    user: {
        authenticated: false
    },

    login(context, creds, redirect) {
        axios.post(LOGIN_URL, creds, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            console.log(response.data);
            localStorage.setItem('token', response.data.token)
            axios.defaults.headers.common['Authorization'] = (
                `Bearer ${response.data.token}`)

            this.user.authenticated = true
            if(redirect) {
                router.push(redirect)
            }
        }, (response) => {
            console.log(response);
        })
    },

    logout() {
        localStorage.removeItem('token')
        this.user.authenticated = false
        delete axios.defaults.headers.common['Authorization'];
    },

    checkAuth() {
        let jwt = localStorage.getItem('token')
        if (jwt) {
            this.user.authenticated = true;
            axios.defaults.headers.common['Authorization'] = (
                `Bearer ${jwt}`)
        } else {
            this.user.authenticated = false;
            delete axios.defaults.headers.common['Authorization'];
        }
    },

    getAuthHeader() {
        return {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    }
}
