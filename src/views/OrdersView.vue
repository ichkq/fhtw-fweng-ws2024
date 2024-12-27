<template>
    <div class="orders-view">
      <h1>Your Orders</h1>
      <div v-if="orders.length === 0" class="no-orders">
        <p>No orders found. Add items to the cart and place an order!</p>
      </div>
      <div v-else class="order-list">
        <div class="order-item" v-for="(order, index) in orders" :key="order.id">
          <h3>Order #{{ index + 1 }}</h3>
          <div v-for="item in order.items" :key="item.id" class="order-item-details">
            <p><strong>{{ item.name }}</strong></p>
            <p>Price: ${{ item.price.toFixed(2) }}</p>
            <p>Quantity: {{ item.quantity }}</p>
          </div>
          <p><strong>Total: ${{ order.totalPrice.toFixed(2) }}</strong></p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { useCartStore } from '@/store/cart';
  
  export default {
    name: 'OrdersView',
    setup() {
      const cartStore = useCartStore();
      const orders = cartStore.orders;
  
      return { orders };
    },
  };
  </script>
  
  <style scoped>
  .orders-view {
    padding: 20px;
  }
  .no-orders {
    text-align: center;
    font-size: 1.2em;
    color: #555;
  }
  .order-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .order-item {
    border: 1px solid #ddd;
    padding: 10px;
    border-radius: 5px;
    background: #f9f9f9;
  }
  .order-item-details {
    margin-left: 10px;
  }
  </style>
  