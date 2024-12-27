<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
    <header class="bg-white shadow-md">
      <div class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <router-link to="/" class="flex items-center space-x-2">
            <div
              class="w-10 h-10 bg-primary rounded-full flex items-center justify-center"
            ></div>
            <span class="text-2xl font-bold text-primary"> </span>
          </router-link>
          <div class="flex-1 max-w-xl mx-4">
            <div class="relative">
              <SearchIcon
                class="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
              />
              <input
                type="search"
                placeholder="Search products..."
                class="pl-10 pr-4 py-2 w-full rounded-full border-2 border-primary focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
          <div></div>
          <!-- <div class="flex items-center space-x-4">
              <button class="text-primary hover:bg-primary hover:text-white transition-colors rounded-full">
                <ShoppingCartIcon class="h-6 w-6" />
              </button>
              <button class="text-primary hover:bg-primary hover:text-white transition-colors rounded-full">
                <UserIcon class="h-6 w-6" />
              </button>
              <button class="text-primary hover:bg-primary hover:text-white transition-colors rounded-full">
                <BellIcon class="h-6 w-6" />
              </button>
            </div>-->
        </div>
      </div>
    </header>

    <main class="container mx-auto px-4 py-8">
      <h1 class="text-4xl font-bold mb-8 text-center text-gray-800">
        Explore Our Product Categories
      </h1>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="category in categories"
          :key="category.name"
          class="group block rounded-xl shadow-lg overflow-hidden transition-all hover:shadow-2xl hover:scale-105"
          :class="category.bgColor"
        >
          <router-link :to="category.link" class="relative h-64 block">
            <div
              :class="`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-80 group-hover:opacity-90 transition-opacity`"
            />
            <div
              class="absolute inset-0 flex flex-col items-center justify-center p-6"
            >
              <component
                :is="category.icon"
                class="w-16 h-16 text-white mb-4"
              />
              <h2 class="text-2xl font-semibold text-white text-center">
                {{ category.name }}
              </h2>
            </div>
          </router-link>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import {
  Laptop,
  Dumbbell,
  Gamepad,
  ShoppingBag,
  Home,
  Shirt,
  Search as SearchIcon,
  ShoppingCart as ShoppingCartIcon,
  User as UserIcon,
  Bell as BellIcon,
} from "lucide-vue-next";

export default defineComponent({
  components: {
    SearchIcon,
    ShoppingCartIcon,
    UserIcon,
    BellIcon,
  },
  data() {
    return {
      categories: [
        {
          name: "Electronic devices",
          icon: Laptop,
          link: "/products/ELECTRONIC_DEVICES",
          gradient: "from-blue-500 to-purple-500",
          bgColor: "bg-blue-100",
        },
        {
          name: "Sports",
          icon: Dumbbell,
          link: "/products/SPORTS",
          gradient: "from-green-500 to-teal-500",
          bgColor: "bg-green-100",
        },
        {
          name: "Video games",
          icon: Gamepad,
          link: "/products/VIDEOGAMES",
          gradient: "from-indigo-500 to-purple-500",
          bgColor: "bg-indigo-100",
        },
        {
          name: "Trainers",
          icon: ShoppingBag,
          link: "/products/TRAINERS",
          gradient: "from-yellow-500 to-orange-500",
          bgColor: "bg-yellow-100",
        },
        {
          name: "Household items",
          icon: Home,
          link: "/products/HOUSEHOLD_STUFF",
          gradient: "from-cyan-500 to-blue-500",
          bgColor: "bg-cyan-100",
        },
        {
          name: "Clothing",
          icon: Shirt,
          link: "/products/CLOTHINGS",
          gradient: "from-pink-500 to-rose-500",
          bgColor: "bg-pink-100",
        },
      ],
    };
  },
});
</script>
