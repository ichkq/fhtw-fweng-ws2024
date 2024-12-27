<template>
  <div class="relative w-full h-full">
    <img
      :src="require('../../assets/images/image_background_4.png')"
      class="absolute inset-0 object-cover w-full h-full z-0 opacity-50"
      alt="Background"
    />
    <div class="relative z-10 admin-dashboard">
      <h1>Admin Dashboard</h1>

      <div class="tabs">
        <button
          :class="{ active: activeTab === 'users' }"
          @click="activeTab = 'users'"
        >
          Users Management
        </button>
        <button
          :class="{ active: activeTab === 'products' }"
          @click="activeTab = 'products'"
        >
          Products Management
        </button>
      </div>

      <!-- Tab Content -->
      <!-- Users Management Tab -->
      <div v-if="activeTab === 'users'" class="tab-content">
        <h2>Users Management</h2>
        <div v-if="this.userStore.users.length === 0">No other users found</div>
        <div v-else>
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in this.userStore.users" :key="user.id">
                <td>{{ user.username }}</td>
                <td>{{ user.email }}</td>
                <td class="actions">
                  <button class="btn-edit" @click="editUser(user.id)">
                    Edit
                  </button>
                  <button class="btn-delete" @click="deleteUser(user.id)">
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Products Management Tab -->
      <div v-if="activeTab === 'products'" class="tab-content">
        <h2>Products Management</h2>
        <div v-if="this.productStore.products.length === 0">
          No products found
        </div>
        <div v-else>
          <table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="product in this.productStore.products"
                :key="product.id"
              >
                <td>{{ product.name }}</td>
                <td>{{ product.category }}</td>
                <td class="actions">
                  <button class="btn-edit" @click="editProduct(product.id)">
                    Edit
                  </button>
                  <button class="btn-delete" @click="deleteProduct(product.id)">
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "@/store/auth";
import { useProductStore } from "@/store/product";
import { useUserStore } from "@/store/user";
import { mapStores } from "pinia";

export default {
  name: "AdminDashboardView",
  data() {
    return {
      activeTab: "users",
    };
  },
  computed: {
    ...mapStores(useUserStore, useProductStore, useAuthStore),
  },
  created() {
    this.userStore.fetchUsers();
    this.productStore.fetchProducts();
  },
  methods: {
    editUser(id) {
      this.$router.push({ name: "editUserProfile", params: { id } });
    },
    deleteUser(id) {
      if (confirm("Are you sure you want to delete this user?")) {
        this.userStore.deleteUser(id).then(() => {
          if (id === this.authStore.user.id) {
            this.authStore.logout();
            this.$router.push({ name: "login" });
          }
        });
      }
    },
    editProduct() {
      alert("Edit product not implemented yet");
    },
    deleteProduct(id) {
      if (confirm("Are you sure you want to delete this product?")) {
        this.productStore.deleteProduct(id).then(() => {
          //update the new list of products
          this.productStore.fetchProducts();
        });
      }
    },
  },
};
</script>

<style scoped>
.admin-dashboard {
  font-family: Arial, sans-serif;
  padding: 20px;
  max-width: 100%;
  margin: 0 auto;
  text-align: center;
}

h1 {
  font-size: 1.5em;
  color: #2c3e50;
}

.tabs {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.tabs button {
  background-color: #ecf0f1;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-weight: bold;
  color: #2c3e50;
  border-radius: 4px;
  margin: 0 5px;
  transition: background-color 0.3s;
}

.tabs button:hover {
  background-color: #bdc3c7;
}

.tabs button.active {
  background-color: #42b983;
  color: white;
}

.tab-content {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th,
td {
  padding: 12px 15px;
  text-align: left;
  border: 1px solid #ddd;
}

th {
  background-color: #f4f4f4;
  font-weight: bold;
}

.actions {
  display: flex;
  gap: 10px;
}

.btn-delete,
.btn-edit {
  padding: 5px 10px;
  font-size: 0.9rem;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.btn-delete {
  background-color: #e74c3c;
  color: white;
}

.btn-delete:hover {
  background-color: #c0392b;
}

.btn-edit {
  background-color: #3498db;
  color: white;
}

.btn-edit:hover {
  background-color: #2980b9;
}

img {
  filter: brightness(0.7);
  object-fit: cover;
}
</style>
