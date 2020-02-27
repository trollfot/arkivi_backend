import { router } from './main';
import axios from 'axios'


const API_URL = 'http://kraft.novareto.de:9999/'
const LOGIN_URL = API_URL + 'admin/login'


export default {
    login_url: LOGIN_URL,

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
    },

    checkAuth() {
        let jwt = localStorage.getItem('token')
        this.user.authenticated = jwt ? true: false;
    },

    getAuthHeader() {
        return {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    }
}
