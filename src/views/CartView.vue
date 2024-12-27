<template>
    <div class="cart-view">
      <h1>Your Cart</h1>
      <div v-if="cartItems.length === 0" class="empty-cart">
        <p>Your cart is empty.</p>
        <router-link to="/products">Start Shopping</router-link>
      </div>
      <div v-else>
        <div v-for="item in cartItems" :key="item.id" class="cart-item">
          <CartItem :item="item" @remove="removeFromCart" />
        </div>
        <div class="checkout">
          <h3>Total Price: ${{ totalPrice.toFixed(2) }}</h3>
          <button @click="moveToOrders">Place Order</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { computed } from "vue";
  import { useCartStore } from "@/store/cart";
  import CartItem from '@/components/molecules/CartItem.vue';
  
  export default {
    name: "CartView",
    components: { CartItem },
    setup() {
      const cartStore = useCartStore();
      const cartItems = computed(() => cartStore.cartItems);
      const totalPrice = computed(() => cartStore.totalPrice);
  
      const removeFromCart = (id) => cartStore.removeFromCart(id);
      const moveToOrders = () => cartStore.moveToOrders();
  
      return { cartItems, totalPrice, removeFromCart, moveToOrders };
    },
  };
  </script>
  
  <style scoped>
  .cart-view {
    padding: 20px;
  }
  .cart-item {
    border: 1px solid #ddd;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
  }
  .empty-cart {
    text-align: center;
    margin: 20px 0;
  }
  .checkout {
    margin-top: 20px;
    font-weight: bold;
  }
  button {
    background-color: #3498db;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 5px;
  }
  button:hover {
    background-color: #2980b9;
  }
  </style>
  