<template class="footer">
  <div class="footer-content">
    <footer class="bg-gray-800 text-white py-4">
      <div class="container mx-auto px-4">
        <div class="flex flex-col sm:flex-row justify-between items-center">
          <router-link to="/">
            <div class="flex items-center space-x-4 mb-4 sm:mb-0">
              <img
                src="../../assets/images/logo_3.jpg"
                alt="Logo"
                class="logo-img w-24 h-auto"
              />
              <div class="text-left">
                <h2 class="text-2xl font-bold mb-2">HAKart</h2>
                <p class="text-sm text-gray-400">
                  Your online shop for everything
                </p>
              </div>
            </div>
          </router-link>
          <nav class="flex space-x-8">
            <router-link to="/help" class="help_router">Help</router-link>
            <router-link to="/imprint" class="imprint_router"
              >Imprint</router-link
            >
          </nav>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "AppFooter",
};
</script>
