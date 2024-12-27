<template>
    <div class="cart-item">
      <div class="item-details">
        <h3>{{ item.name }}</h3>
        <p>Price: ${{ item.price.toFixed(2) }}</p>
        <p>Quantity: {{ item.quantity }}</p>
      </div>
      <button class="btn-remove" @click="$emit('remove', item.id)">Remove</button>
    </div>
  </template>
  
  <script>
  export default {
    name: "CartItem",
    props: {
      item: {
        type: Object,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  .cart-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
  
  .item-details h3 {
    margin: 0;
  }
  
  .btn-remove {
    background-color: #e74c3c;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 5px;
  }
  
  .btn-remove:hover {
    background-color: #c0392b;
  }
  </style>
  