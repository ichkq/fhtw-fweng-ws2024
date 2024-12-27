<template>
  <LoginForm @error="showError" />
  <ErrorModal
    v-if="errorVisible"
    :message="errorMessage"
    :visible="errorVisible"
    @close="errorVisible = false"
  />
</template>

<script>
import ErrorModal from "@/components/organism/ErrorModal.vue";
import LoginForm from "@/components/organism/LoginForm.vue";

export default {
  components: {
    LoginForm,
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
        this.errorVisible = false;
      }
    },
  },
};
</script>

<style scoped></style>
