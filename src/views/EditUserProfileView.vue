<template>
  <EditUserProfileForm @error="showError" />
  <ErrorModal
    v-if="errorVisible"
    :message="errorMessage"
    :visible="errorVisible"
    @close="errorVisible = false"
  />
</template>

<script>
import EditUserProfileForm from "@/components/organism/EditUserProfileForm.vue";
import ErrorModal from "@/components/organism/ErrorModal.vue";

export default {
  name: "EditUserProfileView",
  components: {
    EditUserProfileForm,
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
