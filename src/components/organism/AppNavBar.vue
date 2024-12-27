<template>
  <nav class="navbar">
    <div class="navbar-content">
      <router-link to="/" class="flex items-center space-x-2">
        <div class="logo-section">
          <img
            src="../../assets/images/logo_2.jpg"
            alt="Logo"
            class="logo-img"
          />
          <h1 class="logo-text">HAKart</h1>
        </div>
      </router-link>
      <ul class="nav-links">
        <li>
          <router-link to="/">Home</router-link>
        </li>
        <li>
          <router-link to="/categories">Categories</router-link>
        </li>
        <li>
          <router-link to="/cart">Cart</router-link>
        </li>
        <li>
          <router-link to="/orders">Orders</router-link> <!-- Added link to Orders -->
        </li>
        <li v-if="this.authStore.isAuthenticated && this.authStore.isAdmin">
          <router-link to="/admin">Admin Dashboard</router-link>
        </li>
        <li v-if="this.authStore.isAuthenticated">
          <router-link to="/profile">Profile</router-link>
        </li>
        <li v-if="!this.authStore.isAuthenticated">
          <router-link to="/login">Login</router-link>
        </li>
        <li v-if="!this.authStore.isAuthenticated">
          <router-link to="/register">Register</router-link>
        </li>
        <li v-if="this.authStore.isAuthenticated">
          <a @click="this.authStore.logout">Logout</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { useAuthStore } from "@/store/auth";
import { mapStores } from "pinia";

export default {
  name: "AppNavBar",
  computed: {
    ...mapStores(useAuthStore),
  },
};
</script>

<style scoped>
.navbar {
  background-color: #2c3e50;
  padding: 1rem;
}

.navbar-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
}

@media (max-width: 768px) {
  .navbar-content {
    flex-direction: column;
    gap: 1rem;
  }
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.logo-img {
  width: 2.5rem;
  height: 2.5rem;
}

.logo-text {
  color: #ecf0f1;
  font-size: 1.5rem;
}

.nav-links {
  list-style-type: none;
  display: flex;
  gap: 1.5rem;
}

.nav-links li {
  color: #ecf0f1;
}

.nav-links a {
  color: #ecf0f1;
  text-decoration: none;
}

.nav-links a:hover {
  text-decoration: underline;
}

nav a.router-link-exact-active {
  color: #5ac494;
}
</style>
