<template>
  <div
    class="min-h-screen flex items-center justify-center relative bg-gray-100"
  >
    <img
      :src="require('../../assets/images/image_background_4.png')"
      class="absolute inset-0 object-cover w-full h-full z-0 opacity-50"
    />
    <div
      class="registration-form max-w-md w-full p-8 bg-white rounded-lg shadow-lg border border-gray-300 relative z-10"
    >
      <h1 class="text-3xl font-bold text-center mb-8 text-gray-800">
        Register
      </h1>
      <form @submit.prevent="submitForm" class="space-y-4">
        <!-- Salutation field -->
        <div>
          <label for="salutation" class="block">Salutation</label>
          <select
            v-model="form.values.salutation"
            id="salutation"
            required
            class="form-input"
            v-on:blur="validate('salutation')"
            v-on:change="validate('salutation')"
          >
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
          <p v-if="form.errors.salutation" class="error">
            {{ form.errors.salutation }}
          </p>
        </div>

        <!-- Other Salutation field -->
        <div v-if="form.values.salutation === 'Other'">
          <label for="otherSalutation" class="block"
            >Specify other salutation</label
          >
          <input
            v-model="form.values.otherSalutation"
            type="text"
            id="otherSalutation"
            required
            class="form-input"
            v-on:blur="validate('otherSalutation')"
          />
          <p v-if="form.errors.otherSalutation" class="error">
            {{ form.errors.otherSalutation }}
          </p>
        </div>

        <!-- Email field -->
        <div>
          <label for="email" class="block">Email</label>
          <input
            v-model="form.values.email"
            type="email"
            id="email"
            required
            class="form-input"
            v-on:blur="validate('email')"
          />
          <span v-if="form.errors.email" class="error">{{
            form.errors.email
          }}</span>
        </div>

        <!-- Username field -->
        <div>
          <label for="username" class="block">Username</label>
          <input
            v-model="form.values.username"
            type="text"
            id="username"
            required
            class="form-input"
            v-on:blur="validate('username')"
          />
          <span v-if="form.errors.username" class="error">{{
            form.errors.username
          }}</span>
        </div>

        <!-- Password field -->
        <div>
          <label for="password" class="block">Password</label>
          <input
            v-model="form.values.password"
            type="password"
            id="password"
            required
            class="form-input"
            v-on:blur="validate('password')"
          />
          <span v-if="form.errors.password" class="error">{{
            form.errors.password
          }}</span>
        </div>

        <!-- Confirm Password field -->
        <div>
          <label for="confirmPassword" class="block">Confirm Password</label>
          <input
            v-model="form.values.confirmPassword"
            type="password"
            id="confirmPassword"
            required
            class="form-input"
            v-on:blur="validate('confirmPassword')"
          />
          <span v-if="form.errors.confirmPassword" class="error">{{
            form.errors.confirmPassword
          }}</span>
        </div>

        <!-- Country field -->
        <div>
          <label for="country" class="block">Country</label>
          <select
            v-model="form.values.country"
            id="country"
            required
            class="form-input"
            v-on:blur="validate('country')"
          >
            <option
              v-for="country in countries"
              :key="country?.name?.common"
              :value="country?.name?.common"
            >
              {{ country?.name?.common }}
            </option>
          </select>
          <p v-if="form.errors.country" class="error">
            {{ form.errors.country }}
          </p>
        </div>

        <!-- Submit button -->
        <button
          type="submit"
          class="btn btn-primary w-full"
          :disabled="isSubmitting"
        >
          <span v-if="isSubmitting">Registering...</span>
          <span v-else>Register</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { object, string, ref } from "yup";
import { mapStores } from "pinia";
import { useUserStore } from "@/store/user";

const registrationSchema = object().shape({
  salutation: string().required("Salutation is required"),
  otherSalutation: string().when("salutation", {
    is: "Other",
    then: () =>
      string()
        .max(30, "Must be at most 30 characters long")
        .required("Other salutation is required"),
    otherwise: () => string().notRequired(),
  }),
  email: string()
    .email("Please enter a valid email address")
    .max(50, "Must be at most 50 characters long")
    .required("Email is required"),
  username: string()
    .required("Username is required")
    .min(3, "Must be at least 3 characters long")
    .max(30, "Must be at most 30 characters long"),
  password: string()
    .min(12, "Must be at least 12 characters long")
    .matches(/(?=.*[a-z])/, "Must contain at least one lowercase letter")
    .matches(/(?=.*[A-Z])/, "Must contain at least one uppercase letter")
    .matches(/(?=.*\d)/, "Must contain at least one number")
    .matches(/(?=.*[!@#$%^&*.])/, "Must contain at least one symbol")
    .required(),
  confirmPassword: string()
    .oneOf([ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
  country: string().required("Country is required"),
});

export default {
  data() {
    return {
      form: {
        values: {
          salutation: "",
          otherSalutation: "",
          email: "",
          username: "",
          password: "",
          confirmPassword: "",
          country: "",
        },
        errors: {
          salutation: null,
          otherSalutation: null,
          email: null,
          username: null,
          password: null,
          confirmPassword: null,
          country: null,
        },
      },
      isSubmitting: false,
      countries: [],
    };
  },
  computed: {
    ...mapStores(useUserStore),
  },
  created: async function () {
    await this.getCountriesData();
  },
  methods: {
    async validate(field) {
      if (field == "salutation" && this.form.values.salutation !== "Other") {
        this.form.values.otherSalutation = "";
        this.form.errors.otherSalutation = null;
      }

      try {
        await registrationSchema.validateAt(field, this.form.values);
        this.form.errors[field] = null;
      } catch (error) {
        this.form.errors[field] = error.message;
      }
    },
    async submitForm() {
      this.isSubmitting = true;
      try {
        await registrationSchema.validate(this.form.values, {
          abortEarly: false,
        });
        this.form.errors = {
          salutation: null,
          otherSalutation: null,
          email: null,
          username: null,
          password: null,
          confirmPassword: null,
          country: null,
        };
        let dataToSend = {
          username: this.form.values.username,
          userGender:
            this.form.values.salutation === "Other"
              ? "OTHER"
              : this.form.values.salutation.toUpperCase(),
          otherSpecify:
            this.form.values.otherSalutation === ""
              ? null
              : this.form.values.otherSalutation,
          email: this.form.values.email,
          password: this.form.values.password,
          country: this.form.values.country,
        };
        await this.userStore.postUser(dataToSend);
      } catch (error) {
        this.$emit("error", "Could not register the user.");
      } finally {
        this.isSubmitting = false;
      }
    },
    async getCountriesData() {
      this.countries = [];
      try {
        const res = await fetch(`https://restcountries.com/v3.1/all`);
        this.countries = await res.json();
        this.countries.sort((a, b) => {
          if (["Germany", "Austria", "Switzerland"].includes(a.name.common))
            return -1;
          if (["Germany", "Austria", "Switzerland"].includes(b.name.common))
            return 1;
          return a.name.common.localeCompare(b.name.common);
        });
      } catch (error) {
        this.error = "Error! Could not reach the API. " + error;
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.registration-form {
  margin: 10px;
}

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
