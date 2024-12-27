<template>
    <div class="order-item">
      <div class="item-details">
        <h3>{{ item.name }}</h3>
        <p>Price: ${{ item.price.toFixed(2) }}</p>
        <p>Quantity: {{ item.quantity }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "OrderItem",
    props: {
      item: {
        type: Object,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  .order-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-bottom: 10px;
  }
  .item-details h3 {
    margin: 0;
  }
  </style>
  