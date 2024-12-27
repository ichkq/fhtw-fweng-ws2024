import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartItems: [],
  }),
  getters: {
    totalPrice(state) {
      return state.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    },
    orders() {
      // Retrieve orders from localStorage and return them
      const storedOrders = localStorage.getItem('orders');
      return storedOrders ? JSON.parse(storedOrders) : [];
    },
  },
  actions: {
    addToCart(product) {
      const existingItem = this.cartItems.find((item) => item.id === product.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        this.cartItems.push({ ...product, quantity: 1 });
      }
    },
    removeFromCart(productId) {
      this.cartItems = this.cartItems.filter((item) => item.id !== productId);
    },
    clearCart() {
      this.cartItems = [];
    },
    checkout() {
      if (this.cartItems.length === 0) {
        alert('Your cart is empty. Please add items before checkout.');
        return;
      }

      const order = {
        id: new Date().getTime(), // Unique order ID
        items: [...this.cartItems],
        totalPrice: this.totalPrice,
      };

      // Save order to localStorage
      const orders = JSON.parse(localStorage.getItem('orders')) || [];
      orders.push(order);
      localStorage.setItem('orders', JSON.stringify(orders));

      alert('Checkout successful! Your order has been placed.');
      this.clearCart();
    },
  },
});
