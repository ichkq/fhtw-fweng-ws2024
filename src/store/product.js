import axios from "axios";
import { defineStore } from "pinia";

export const useProductStore = defineStore('product', {
    state: () => ({
        products: []
    }),
    actions: {
        async fetchProducts() {
            await axios.get("http://localhost:8080/products")
            .then(response => {
                this.products = response.data;
            });
        },
        async fetchProductsByCategory(category) {
            await axios.get("http://localhost:8080/products?category=" + category)
            .then(response => {
                this.products = response.data;
            });
        },
        async addProduct(payload) {
            await axios.post("http://localhost:8080/products", payload, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        async updateProduct(payload) {
            await axios.put("http://localhost:8080/products/" + payload.id, payload, {
                headers: {
                    Content_Type: 'application/json',
                    Authorization: 'Bearer ' + sessionStorage.getItem('token')
                }
            });
        },
        async deleteProduct(id) {
            await axios.delete("http://localhost:8080/products/" + id, {
                headers: {
                    Content_Type: 'application/json',
                    Authorization: 'Bearer ' + sessionStorage.getItem('token')
                }
            });
        }
    },
    getters: {
        getProducts() {
            return this.products;
        }
    },
});