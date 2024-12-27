<template>
  <div class="relative">
    <img
      :src="require('../assets/images/image_background_4.png')"
      class="absolute inset-0 object-cover w-full h-full z-0 opacity-50"
    />
    <div class="help-center relative z-10">
      <h1>Welcome to Our Help Center</h1>
      <p>
        We're here to assist you with any questions or concerns you may have.
        Below you will find helpful information to guide you.
      </p>

      <section>
        <h2>Frequently Asked Questions (FAQ)</h2>
        <ul>
          <li>
            <strong>Q: How do I create an account?</strong>
            <p>
              A: Simply click on the "Register" button located at the top right
              corner of our homepage and fill out the required information. We
              look forward to welcoming you!
            </p>
          </li>
          <li>
            <strong>Q: How do I reset my password?</strong>
            <p>
              A: To reset your password, navigate to the login page and click on
              "Forgot Password?" A link will be sent to your email to help you
              set a new password.
            </p>
          </li>
          <li>
            <strong>Q: How can I contact customer support?</strong>
            <p>
              A: Our dedicated customer support team is here to help! You can
              reach us via email at
              <a href="mailto:support@HAKart.com">support@HAKart.com</a> or by
              calling us at (123) 456-7890.
            </p>
          </li>
        </ul>
      </section>

      <section>
        <h2>HAKart Guidelines</h2>
        <p>
          Please adhere to the following guidelines while using our marketplace:
        </p>
        <ol>
          <li>
            Ensure that your listings comply with our community standards.
          </li>
          <li>Provide accurate and honest information in your listings.</li>
          <li>
            Engage respectfully in all communications with buyers and sellers.
          </li>
        </ol>
      </section>

      <section>
        <h2>Contact Us</h2>
        <p>
          If your questions remain unanswered, we encourage you to reach out.
          Our support team is ready to assist you with any inquiries.
        </p>
      </section>

      <section>
        <h2>Helpful Resources</h2>
        <p>For additional assistance, you may find these resources useful:</p>
        <ul>
          <li><a href="#">Terms of Service</a></li>
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Shipping Information</a></li>
          <li><a href="#">Return Policy</a></li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelpComponent",
};
</script>

<style scoped>
.help-center {
  padding: 2rem;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 0.375rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 10;
}

h1 {
  color: #2c3e50;
  font-size: 2rem;
  margin-bottom: 1rem;
}

h2 {
  color: #34495e;
  font-size: 1.5rem;
  margin-top: 1.5rem;
}

ul,
ol {
  margin-left: 20px;
  margin-bottom: 1rem;
}

a {
  color: #3498db;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

img {
  filter: brightness(0.7);
  opacity: 0.5;
}
</style>
