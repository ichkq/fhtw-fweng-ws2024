import axios from "axios";
import { defineStore } from "pinia";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: null,
        user: null,
    }),
    actions: {
        async login(payload) {
            await axios.post('http://localhost:8080/auth/token', payload,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            ).then(response => {
                this.token = response.data.token;
                this.user = response.data.user;
                sessionStorage.setItem('token', this.token);
                this.$router.push('/');
            });
        },
        logout() {
            //delete the "user logined"
            this.token = null;
            this.user = null;
            sessionStorage.removeItem('token');
            this.$router.push({ name: 'login' });
        },
        async getMe() {
            await axios.get("http://localhost:8080/users/" + this.user.id, {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            })
            .then(response => {
                this.user = response.data;
            });
        }
    },
    getters: {
        isAuthenticated() {
//return true if we autenticathe the user, or false if we didn't do the login

//convert the null into a boolean value
            return !!this.token;
        },
        isAdmin() {
            return this.user.role === 'ROLE_ADMIN';
        },
        getToken() {
            return this.token;
        },
        getUser() {
            return this.user;
        }
    },
});