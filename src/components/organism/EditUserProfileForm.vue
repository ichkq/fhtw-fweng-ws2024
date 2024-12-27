<template>
  <div
    class="min-h-screen flex items-center justify-center relative bg-gray-100"
  >
    <img
      :src="require('../../assets/images/image_background_4.png')"
      class="absolute inset-0 object-cover w-full h-full z-0 opacity-50"
    />
    <div
      class="edit-form max-w-md w-full p-8 bg-white rounded-lg shadow-lg border border-gray-300 relative z-10"
    >
      <h1 class="text-3xl font-bold text-center mb-8 text-gray-800">
        Edit Profile
      </h1>
      <form @submit.prevent="submitForm" class="space-y-4">
        <!-- Salutation field -->
        <div>
          <label for="image" class="block">Profile Picture</label>
          <div class="flex justify-around items-center space-x-4">
            <div
              v-for="(image, index) in form.profilePictures"
              :key="index"
              class="relative"
            >
              <img
                :src="image"
                :alt="'Profile Picture ' + (index + 1)"
                class="w-24 h-24 rounded-full cursor-pointer border-2"
                :class="{
                  'border-blue-500': form.values.image === image,
                  'border-gray-300': form.values.image !== image,
                }"
                @click="selectProfilePicture(image)"
              />
            </div>
          </div>
        </div>
        <div>
          <label for="salutation" class="block">Salutation</label>
          <select
            v-model="form.values.salutation"
            id="salutation"
            required
            class="form-input"
            v-on:blur="validateEditProfile('salutation')"
            v-on:change="validateEditProfile('salutation')"
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
            v-on:blur="validateEditProfile('otherSalutation')"
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
            v-on:blur="validateEditProfile('email')"
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
            v-on:blur="validateEditProfile('username')"
          />
          <span v-if="form.errors.username" class="error">{{
            form.errors.username
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
            v-on:blur="validateEditProfile('country')"
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

        <!-- First name field -->
        <div>
          <label for="firstName" class="block">First Name</label>
          <input
            v-model="form.values.firstName"
            type="text"
            id="firstName"
            class="form-input"
            v-on:blur="validateEditProfile('firstName')"
          />
          <span v-if="form.errors.firstName" class="error">{{
            form.errors.firstName
          }}</span>
        </div>

        <!-- Last name field -->
        <div>
          <label for="lastName" class="block">Last Name</label>
          <input
            v-model="form.values.lastName"
            type="text"
            id="lastName"
            class="form-input"
            v-on:blur="validateEditProfile('lastName')"
          />
          <span v-if="form.errors.lastName" class="error">{{
            form.errors.lastName
          }}</span>
        </div>

        <!-- Phone field -->
        <div>
          <label for="phone" class="block">Phone</label>
          <input
            v-model="form.values.phone"
            type="text"
            id="phone"
            class="form-input"
            v-on:blur="validateEditProfile('phone')"
          />
          <span v-if="form.errors.phone" class="error">{{
            form.errors.phone
          }}</span>
        </div>

        <!-- City field -->
        <div>
          <label for="city" class="block">City</label>
          <input
            v-model="form.values.city"
            type="text"
            id="city"
            class="form-input"
            v-on:blur="validateEditProfile('city')"
          />
          <span v-if="form.errors.city" class="error">{{
            form.errors.city
          }}</span>
        </div>

        <!-- Street field -->
        <div>
          <label for="street" class="block">Street</label>
          <input
            v-model="form.values.street"
            type="text"
            id="street"
            class="form-input"
            v-on:blur="validateEditProfile('street')"
          />
          <span v-if="form.errors.street" class="error">{{
            form.errors.street
          }}</span>
        </div>

        <!-- Zip field -->
        <div>
          <label for="zip" class="block">Zip</label>
          <input
            v-model="form.values.zip"
            type="text"
            id="zip"
            class="form-input"
            v-on:blur="validateEditProfile('zip')"
          />
          <span v-if="form.errors.zip" class="error">{{
            form.errors.zip
          }}</span>
        </div>

        <!-- Submit button -->
        <button
          type="submit"
          class="btn btn-primary w-full"
          :disabled="isSubmitting"
        >
          <span v-if="isSubmitting">Saving...</span>
          <span v-else>Save Changes</span>
        </button>
      </form>
    </div>

    <div
      v-if="this.updateBy === this.$route.params.id"
      class="edit-pw-form max-w-md w-full p-8 bg-white rounded-lg shadow-lg border border-gray-300 relative z-10"
    >
      <h1 class="text-3xl font-bold text-center mb-8 text-gray-800">
        Edit Password
      </h1>
      <form @submit.prevent="submitPasswordForm" class="space-y-4">
        <!-- Actual Password field -->
        <div>
          <label for="actualPassword" class="block">Actual Password</label>
          <input
            v-model="passwordForm.values.actualPassword"
            type="password"
            id="actualPassword"
            required
            class="form-input"
            v-on:blur="validatePasswordForm('actualPassword')"
          />
          <span v-if="passwordForm.errors.actualPassword" class="error">{{
            passwordForm.errors.actualPassword
          }}</span>
        </div>

        <!-- New Password field -->
        <div>
          <label for="newPassword" class="block">New Password</label>
          <input
            v-model="passwordForm.values.newPassword"
            type="password"
            id="newPassword"
            required
            class="form-input"
            v-on:blur="validatePasswordForm('newPassword')"
          />
          <span v-if="passwordForm.errors.newPassword" class="error">{{
            passwordForm.errors.newPassword
          }}</span>
        </div>

        <!-- Confirm Password field -->
        <div>
          <label for="confirmNewPassword" class="block"
            >Confirm New Password</label
          >
          <input
            v-model="passwordForm.values.confirmNewPassword"
            type="password"
            id="confirmNewPassword"
            required
            class="form-input"
            v-on:blur="validatePasswordForm('confirmNewPassword')"
          />
          <span v-if="passwordForm.errors.confirmNewPassword" class="error">{{
            passwordForm.errors.confirmNewPassword
          }}</span>
        </div>

        <!-- Submit button -->
        <button
          type="submit"
          class="btn btn-primary w-full"
          :disabled="isSubmitting"
        >
          <span v-if="isSubmitting">Saving...</span>
          <span v-else>Save Changes</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { object, string, ref } from "yup";
import { mapStores } from "pinia";
import { useAuthStore } from "@/store/auth";
import { useUserStore } from "@/store/user";

const editProfileSchema = object().shape({
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
  country: string().required("Country is required"),
  firstName: string()
    .min(3, "Must be at least 3 characters long")
    .max(30, "Must be at most 30 characters long")
    .notRequired(),
  lastName: string()
    .min(3, "Must be at least 3 characters long")
    .max(30, "Must be at most 30 characters long")
    .notRequired(),
  phone: string()
    .matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, "Please enter a valid phone number")
    .notRequired(),
  city: string()
    .min(2, "Must be at least 2 characters long")
    .max(30, "Must be at most 30 characters long")
    .notRequired(),
  street: string()
    .min(2, "Must be at least 2 characters long")
    .max(30, "Must be at most 30 characters long")
    .notRequired(),
  zip: string()
    .min(2, "Must be at least 2 characters long")
    .max(30, "Must be at most 30 characters long")
    .notRequired(),
});

const editPasswordSchema = object().shape({
  actualPassword: string().required("Actual password is required"),
  newPassword: string()
    .min(12, "Must be at least 12 characters long")
    .matches(/(?=.*[a-z])/, "Must contain at least one lowercase letter")
    .matches(/(?=.*[A-Z])/, "Must contain at least one uppercase letter")
    .matches(/(?=.*\d)/, "Must contain at least one number")
    .matches(/(?=.*[!@#$%^&*.])/, "Must contain at least one symbol")
    .required(),
  confirmNewPassword: string()
    .oneOf([ref("newPassword"), null], "Passwords must match")
    .required("Confirm password is required"),
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
          country: "",
          firstName: "",
          lastName: "",
          phone: "",
          city: "",
          street: "",
          zip: "",
          image: null, 
        },
        errors: {
          salutation: null,
          otherSalutation: null,
          email: null,
          username: null,
          country: null,
          firstName: null,
          lastName: null,
          phone: null,
          city: null,
          street: null,
          zip: null,
        },
        profilePictures: [ // Mover aquí dentro de 'form'
          "https://i.pinimg.com/236x/3d/5f/ef/3d5fef3bc4efaf73b9236b0a0c66fc2e.jpg",
          "https://i.pinimg.com/originals/c7/0c/36/c70c3652b86753708079b17e9033c488.jpg",
          "https://i.pinimg.com/236x/b3/82/7d/b3827d55254f65491b2b98f934866d40.jpg",
        ],
      },
      passwordForm: {
        values: {
          actualPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        },
        errors: {
          actualPassword: null,
          newPassword: null,
          confirmNewPassword: null,
        },
      },
      isSubmitting: false,
      countries: [],
      updateBy: null,
    };
  },

  computed: {
    ...mapStores(useUserStore, useAuthStore),
  },
  created: async function () {
    await this.getCountriesData();
    await this.userStore.fetchUser(this.$route.params.id);
    this.updateBy = this.authStore.user?.id;
    this.form.values.salutation =
      this.userStore.user?.userGender === "OTHER"
        ? "Other"
        : this.userStore.user?.userGender.substring(0, 1).toUpperCase() +
          this.userStore.user?.userGender.toLowerCase().substring(1);
    this.form.values.otherSalutation = this.userStore.user?.otherSpecify;
    this.form.values.email = this.userStore.user?.email;
    this.form.values.username = this.userStore.user?.username;
    this.form.values.country = this.userStore.user?.country;
    this.form.values.firstName = this.userStore.user?.firstName;
    this.form.values.lastName = this.userStore.user?.lastName;
    this.form.values.phone = this.userStore.user?.phone;
    this.form.values.city = this.userStore.user?.city;
    this.form.values.street = this.userStore.user?.street;
    this.form.values.zip = this.userStore.user?.zip;
  },
  methods: {
    async validateEditProfile(field) {
      if (field == "salutation" && this.form.values.salutation !== "Other") {
        this.form.values.otherSalutation = "";
        this.form.errors.otherSalutation = null;
      }

      try {
        if (
          this.form.values[field] === "" ||
          this.form.values[field] === null
        ) {
          this.form.errors[field] = null;
          return;
        }
        await editProfileSchema.validateAt(field, this.form.values);
        this.form.errors[field] = null;
      } catch (error) {
        this.form.errors[field] = error.message;
      }
    },
    selectProfilePicture(image) {
      this.form.values.image = image;
    },
    async validatePasswordForm(field) {
      try {
        await editPasswordSchema.validateAt(field, this.passwordForm.values);
        this.passwordForm.errors[field] = null;
      } catch (error) {
        this.passwordForm.errors[field] = error.message;
      }
    },
    async submitForm() {
      this.isSubmitting = true;
      try {
        await editProfileSchema.validate(this.form.values, {
          abortEarly: false,
        });
        this.form.errors = {
          salutation: null,
          otherSalutation: null,
          email: null,
          username: null,
          country: null,
          firstName: null,
          lastName: null,
          phone: null,
          city: null,
          street: null,
          zip: null,
          image: this.form.values?.image || "https://i.pinimg.com/236x/3d/5f/ef/3d5fef3bc4efaf73b9236b0a0c66fc2e.jpg"
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
          country: this.form.values.country,
          firstName: this.form.values.firstName,
          lastName: this.form.values.lastName,
          phone: this.form.values.phone,
          city: this.form.values.city,
          street: this.form.values.street,
          zip: this.form.values.zip,
          image: this.form.values.image ? this.form.values.image : "https://i.pinimg.com/236x/3d/5f/ef/3d5fef3bc4efaf73b9236b0a0c66fc2e.jpg", 
          lastUpdatedBy: this.authStore.user?.id,
        };
        const userId = this.$route.params.id;
        await this.userStore.updateUserInfo(userId, dataToSend);
      } catch (error) {
        this.$emit("error", "Could not update user profile.");
      } finally {
        this.isSubmitting = false;
      }
    },
    async submitPasswordForm() {
      this.isSubmitting = true;
      try {
        await editPasswordSchema.validate(this.passwordForm.values, {
          abortEarly: false,
        });
        this.passwordForm.errors = {
          actualPassword: null,
          newPassword: null,
          confirmNewPassword: null,
        };
        let dataToSend = {
          actualPassword: this.passwordForm.values.actualPassword,
          newPassword: this.passwordForm.values.newPassword,
          lastUpdatedBy: this.authStore.user?.id,
        };
        const userId = this.$route.params.id;
        await this.userStore.updateUserPassword(userId, dataToSend);
      } catch (error) {
        this.$emit("error", "Could not update user password.");
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
.edit-form {
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
