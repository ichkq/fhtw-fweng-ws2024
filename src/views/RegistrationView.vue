<template>
  <div class="registration">
    <RegistrationForm @error="showError" />
    <ErrorModal
      v-if="errorVisible"
      :message="errorMessage"
      :visible="errorVisible"
      @close="errorVisible = false"
    />
  </div>
</template>

<script>
import RegistrationForm from "../components/organism/RegistrationForm.vue";
import ErrorModal from "../components/organism/ErrorModal.vue";

export default {
  components: {
    RegistrationForm,
    ErrorModal,
  },
  data() {
    return {
      errorVisible: false,
      errorMessage: "",
    };
  },
  methods: {
    showError(message) {
      if (message) {
        this.errorMessage = message;
        this.errorVisible = true;
      } else {
        this.errorVisible = false; // Hide the error modal if no message
      }
    },
  },
};
</script>

<style scoped></style>
