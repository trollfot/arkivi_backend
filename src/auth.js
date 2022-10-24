import { router } from './router';


class AuthService {

    constructor($http) {
        this.$http = $http
        this.user = {
            authenticated: false
        }
        this.checkAuth();

        // Adding the intercepting of 401 on our HTTP client
        this.$http.interceptors.response.use(
            (response) => {
                return response
            },
            (result) => {
                if (result.response === undefined) {
                    throw 'Fatal network error.'
                } else {
                    console.log(result.response);
                    if (result.response.status === 401) {
                        this.logout();
                        router.push('/');
                    }
                }
                return result
            }
        )
    }

    async login(creds, redirect) {
        let res = await this.$http.post('login', creds, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (res.status == 200) {
            localStorage.setItem('token', res.data.token)
            this.$http.defaults.headers.common['Authorization'] = (
                `Bearer ${res.data.token}`)
            this.user.authenticated = true
            if(redirect) {
                router.push(redirect);
            }
        }
    }

    logout() {
        localStorage.removeItem('token')
        this.user.authenticated = false
        delete this.$http.defaults.headers.common['Authorization'];
        router.push('/login');
    }

    checkAuth() {
        let jwt = localStorage.getItem('token')
        if (jwt) {
            this.user.authenticated = true;
            this.$http.defaults.headers.common['Authorization'] = (
                `Bearer ${jwt}`)
        } else {
            this.user.authenticated = false;
            delete this.$http.defaults.headers.common['Authorization'];
        }
    }

    getAuthHeader() {
        return {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    }
}


export default {
    install (Vue, options) {
        const { $http } = options
        Vue.prototype.$auth = new AuthService($http);
    }
}
