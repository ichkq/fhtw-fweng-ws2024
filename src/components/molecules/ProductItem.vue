<template>
  <div class="relative h-48 sm:h-64">
    <img
      src="https://placehold.co/600x400"
      alt="Product Image"
      class="w-full h-full object-cover"
    />
  </div>
  <div class="p-6">
    <h2 class="text-xl font-semibold text-gray-900 mb-2">{{ product.name }}</h2>
    <p class="text-sm text-gray-600 mb-4 line-clamp-2">
      Description: {{ product.description }}
    </p>
    <div class="flex items-center justify-between">
      <p class="text-2xl font-bold text-primary">
        {{ product.price.toFixed(2) }} €
      </p>
      <div v-if="this.authStore.isAuthenticated">
        <button
          v-on:click="addToCart()"
          class="bg-blue-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-700"
        >
          Add to the Cart
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "@/store/auth";
import { mapStores } from "pinia";

export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapStores(useAuthStore),
  },
  methods: {
    addToCart() {
      alert("Product add to the cart!");
    },
  },
};
</script>

<style scoped></style>
