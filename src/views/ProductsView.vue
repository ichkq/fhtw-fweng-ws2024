<template>
  <div class="product">
    <ProductsList />
  </div>
</template>

<script>
import ProductsList from "../components/organism/ProductsList.vue";

export default {
  components: {
    ProductsList,
  },
};
</script>

<style scoped>
.product {
  background-color: #ffffff;
  border-radius: 0.375rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
</style>
