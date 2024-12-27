<template>
  <div class="min-h-screen flex items-center justify-center relative bg-gray-100">
    <img
      :src="require('../../assets/images/image_background_4.png')"
      class="absolute inset-0 object-cover w-full h-full z-0 opacity-50"
    />
    <div
      class="login max-w-md w-full p-8 bg-white rounded-lg shadow-lg border border-gray-300 relative z-10"
    >
      <h1 class="text-3xl font-bold text-center mb-8 text-gray-800">Login</h1>
      <form @submit.prevent="submitForm" class="space-y-6">
        <div>
          <label
            for="userOrEmail"
            class="block text-sm font-medium text-gray-700"
            >Username or Email</label
          >
          <div class="relative mt-1">
            <input
              v-model="form.values.userOrEmail"
              type="text"
              id="userOrEmail"
              required
              class="form-input"
              v-on:blur="validate('userOrEmail')"
            />
          </div>
          <p v-if="form.errors.userOrEmail" class="error">
            {{ form.errors.userOrEmail }}
          </p>
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700"
            >Password</label
          >
          <div class="relative mt-1">
            <input
              v-model="form.values.password"
              type="password"
              id="password"
              required
              class="form-input"
              v-on:blur="validate('password')"
            />
          </div>
          <p v-if="form.errors.password" class="error">
            {{ form.errors.password }}
          </p>
        </div>
        <button
          type="submit"
          class="btn btn-primary w-full"
          :disabled="isSubmitting"
        >
          <span v-if="isSubmitting">Logging in...</span>
          <span v-else>Login</span>
        </button>
      </form>
      <p class="text-center text-gray-600 mt-4">
        Don't have an account?
        <router-link to="/register" class="text-blue-500 hover:underline"
          >Register</router-link
        >
      </p>
    </div>
  </div>
</template>

<script>
import { object, string } from "yup";
import { mapStores } from "pinia";
import { useAuthStore } from "@/store/auth";

const loginSchema = object().shape({
  userOrEmail: string().required("Username or email is required"),
  password: string().required("Password is required"),
});

export default {
  data() {
    return {
      form: {
        values: {
          userOrEmail: "",
          password: "",
        },
        errors: {
          userOrEmail: null,
          password: null,
        },
      },
      isSubmitting: false,
    };
  },
  computed: {
    ...mapStores(useAuthStore),
  },
  methods: {
    async validate(field) {
      try {
        await loginSchema.validateAt(field, this.form.values);
        this.form.errors[field] = null;
      } catch (error) {
        this.form.errors[field] = error.message;
      }
    },
    async submitForm() {
      this.isSubmitting = true;
      try {
        await loginSchema.validate(this.form.values, { abortEarly: false });
        this.form.errors = { userOrEmail: null, password: null };
        let dataToSend = {
          usernameOrEmail: this.form.values.userOrEmail,
          password: this.form.values.password,
        };
        await this.authStore.login(dataToSend);
      } catch (error) {
        this.$emit(
          "error",
          "Couldn't login. Please check your credentials and try again."
        );
      } finally {
        this.isSubmitting = false;
      }
    },
  },
};
</script>

<style scoped>
.form-input {
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  width: 100%;
  transition: border-color 0.2s;
}

.form-input:focus {
  border-color: #3b82f6;
  outline: none;
}

.btn {
  padding: 0.75rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.2s;
}

.btn:hover {
  background-color: #2563eb;
  transform: translateY(-2px);
}

.btn:disabled {
  background-color: #9ca3af;
  cursor: not-allowed;
}

.error {
  color: red;
  font-size: 0.875em;
  margin-top: 0.25rem;
  text-align: center;
}

img {
  filter: brightness(0.7);
}
</style>
