import { router } from './main';
import axios from 'axios'


class Service {

    constructor(api_url='') {
        this.api_url = api_url;
        this.user = {
            authenticated: false
        }
    }

    login(context, creds, redirect) {
        axios.post(`${this.api_url}/login`, creds, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
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
    }

    logout() {
        localStorage.removeItem('token')
        this.user.authenticated = false
        delete axios.defaults.headers.common['Authorization'];
    }

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
    }

    getAuthHeader() {
        return {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    }
}


export default new Service()
