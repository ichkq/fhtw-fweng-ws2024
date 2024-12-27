<template>
  <div
    class="relative min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-12 px-4 sm:px-6 lg:px-8"
  >
    <img
      src="../../assets/images/image_background_4.png"
      class="absolute inset-0 object-cover w-full h-full z-0 opacity-30"
      alt="Background"
    />
    <div class="relative z-10 max-w-7xl mx-auto">
      <h1
        class="text-center text-4xl font-extrabold text-gray-900 mb-10 tracking-tight"
      >
        Discover Our Products
      </h1>

      <div class="bg-white bg-opacity-90 rounded-xl shadow-2xl p-6">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-if="this.productStore.products.length === 0" class="text-center text-gray-500">
            No products found.
          </div>
          <div
            v-else
            v-for="product in this.productStore.products" :key="product.id"
            class="product-item group bg-white rounded-lg shadow-md overflow-hidden">
            <ProductItem :product="product" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { useProductStore } from "@/store/product";
import ProductItem from "../molecules/ProductItem.vue";


export default {
  components: {
    ProductItem,
  },
  data() {
    return {};
  },
  computed: {
    ...mapStores(useProductStore),
  },
  created() {
    if (this.$route.params.categoryName)
      this.productStore.fetchProductsByCategory(
        this.$route.params.categoryName
      );
    else this.productStore.fetchProducts();
  },
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
