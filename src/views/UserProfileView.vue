<template>
  <div class="user-profile relative">
    <img
      :src="require('../assets/images/image_background_4.png')"
      class="absolute inset-0 object-cover w-full h-full z-0 opacity-50"
      alt="Background"
    />

    <div class="container relative z-10">
      <h1>User Profile</h1>
      <img
        :src="
          this.authStore.user?.image ||
          'https://i.pinimg.com/236x/3d/5f/ef/3d5fef3bc4efaf73b9236b0a0c66fc2e.jpg'
        "
        alt="User Profile"
        class="profile-image mx-auto"
      />

      <p v-if="this.authStore.user?.username">
        <strong>Username:</strong> {{ this.authStore.user.username }}
      </p>
      <p v-if="this.authStore.user?.email">
        <strong>Email:</strong> {{ this.authStore.user.email }}
      </p>
      <p v-if="this.authStore.user?.firstName">
        <strong>First Name:</strong> {{ this.authStore.user.firstName }}
      </p>
      <p v-if="this.authStore.user?.lastName">
        <strong>Last Name:</strong> {{ this.authStore.user.lastName }}
      </p>
      <p v-if="this.authStore.user?.userGender">
        <strong>Gender:</strong> {{ this.authStore.user.userGender }}
        {{
          this.authStore.user.userGender === "OTHER"
            ? `(${this.authStore.user.otherSpecify})`
            : ""
        }}
      </p>
      <p v-if="this.authStore.user?.phone">
        <strong>Phone:</strong> {{ this.authStore.user.phone }}
      </p>
      <p v-if="this.authStore.user?.country">
        <strong>Country:</strong> {{ this.authStore.user.country }}
      </p>
      <!--<p v.if="this.authStore.user?.image">S
        <strong>Image:</strong>
        <img :src="this.authStore.user.image"/>
      </p>-->
      <p v-if="this.authStore.user?.city">
        <strong>City:</strong> {{ this.authStore.user.city }}
      </p>
      <p v-if="this.authStore.user?.street">
        <strong>Street:</strong> {{ this.authStore.user.street }}
      </p>
      <p v-if="this.authStore.user?.zip">
        <strong>Zip:</strong> {{ this.authStore.user.zip }}
      </p>
      <p v-if="this.authStore.user?.role">
        <strong>Role:</strong> {{ this.authStore.user.role }}
      </p>

      <button @click="editProfile" class="edit-btn">Edit Profile</button>
      <button @click="deleteProfile" class="delete-btn">Delete Profile</button>
    </div>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { useAuthStore } from "@/store/auth";
import { useUserStore } from "@/store/user";

export default {
  name: "UserProfileView",
  data() {
    return {};
  },
  mounted() {
    this.authStore.getMe();
  },
  computed: {
    ...mapStores(useAuthStore, useUserStore),
  },
  methods: {
    editProfile() {
      this.$router.push({
        name: "editUserProfile",
        params: { id: this.authStore.user.id },
      });
    },
    deleteProfile() {
      if (confirm("Are you sure you want to delete your profile?")) {
        this.userStore.deleteUser(this.authStore.user.id);
        this.authStore.logout();
      }
    },
  },
};
</script>

<style scoped>
.user-profile {
  position: relative;
  font-family: Arial, sans-serif;
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.container {
  position: relative;
  z-index: 10;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

img.absolute inset-0 object-cover w-full h-full z-0 opacity-50 {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
  opacity: 0.5;
}

h1 {
  font-size: 1.5em;
  color: #2c3e50;
}

p {
  margin: 5px 0;
}

.edit-btn {
  margin: 50px;
}

.delete-btn {
  margin: 50px;
}

.profile-image {
  width: 100%;
  max-width: 150px;
  max-height: 150px;
  height: auto;
  border-radius: 50%;
  border: 2px solid #42b983;
}

.edit-btn {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  margin-top: 10px;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.edit-btn:hover {
  background-color: #2c3e50;
}

.delete-btn {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  margin-top: 10px;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.delete-btn:hover {
  background-color: #c0392b;
}
</style>
