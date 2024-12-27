import axios from "axios";
import { defineStore } from "pinia";

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null,
        users: []
    }),
    actions: {
        async fetchUsers() {
            await axios.get('http://localhost:8080/users',
                {
                    headers: {
                        Content_Type: 'application/json',
                        Authorization: 'Bearer ' + sessionStorage.getItem('token')
                    }
                }
            ).then(response => {
                this.users = response.data;
            });
        },
        async fetchUser(id) {
            await axios.get('http://localhost:8080/users/' + id,
                {
                    headers: {
                        Content_Type: 'application/json',
                        Authorization: 'Bearer ' + sessionStorage.getItem('token')
                    }
                }
            ).then(response => {
                this.user = response.data;
            });
        },
        async postUser(payload) {
            await axios.post('http://localhost:8080/users', payload,
                {
                  headers: {
                    Content_Type: 'application/json',
                  }
                }
              ).then(() => {
                this.$router.push('/login');
              });
        },
        async updateUserInfo(id, payload) {
            await axios.put("http://localhost:8080/users/" + id, payload, {
                headers: {
                    Content_Type: 'application/json',
                    Authorization: 'Bearer ' + sessionStorage.getItem('token')
                }
            })
            this.$router.go(-1);
        },
        async updateUserPassword(id, payload) {
            await axios.put("http://localhost:8080/users/"+ id + "/password", payload, {
                headers: {
                    Content_Type: 'application/json',
                    Authorization: 'Bearer ' + sessionStorage.getItem('token')
                }
            })
            this.$router.go(-1);
        },
        async deleteUser(id) {
            await axios.delete("http://localhost:8080/users/" + id, {
                headers: {
                    Content_Type: 'application/json',
                    Authorization: 'Bearer ' + sessionStorage.getItem('token')
                }
            })
        }
    },
    getters: {
        getUser() {
            return this.user; 
        },
        getUsers() {
            return this.users;
        }
    }
});   