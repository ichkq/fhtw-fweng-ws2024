<template>
  <div class="HomeForm">
    <img
      :src="require('../../assets/images/image_background_4.png')"
      class="absolute inset-0 object-cover w-full h-full z-0"
    />

    <div
      class="relative z-10 flex items-center justify-center min-h-screen bg-black bg-opacity-40 py-10"
    >
      <div class="text-white text-center px-4 sm:px-6 lg:px-8 max-w-3xl">
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
          Welcome to HAKart
        </h1>
        <p class="text-xl sm:text-2xl mb-6">
          We are a team of the Frontend Web Engineering, passionate software
          developers working on our first project together. HAKart is our vision
          for a modern, user-friendly e-commerce platform.
        </p>
        <router-link to="/Categories">
          <button
            class="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-full transition duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Explore Categories
          </button>
        </router-link>
      </div>
    </div>

    <section class="bg-black bg-opacity-50 py-10 relative z-10">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center text-white mb-8">
          Meet Our Team
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-white">
          <div
            v-for="member in teamMembers"
            :key="member.name"
            class="bg-black bg-opacity-50 rounded-lg p-4 text-center"
          >
            <h3 class="text-xl font-semibold mb-1">{{ member.name }}</h3>
            <div class="flex justify-center items-center text-gray-300">
              <a
                :href="`mailto:${member.email}`"
                class="hover:text-primary transition duration-300"
              >
                {{ member.email }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      teamMembers: [
        {
          name: "Hernán López Pérez",
          email: "wi24x011@technikum-wien.at",
        },
        {
          name: "Arthur Zhu",
          email: "se24x501@technikum-wien.at",
        },
        {
          name: "Kyrylo Stepanets",
          email: "wi24x013@technikum-wien.at",
        },
      ],
    };
  },
};
</script>

<style scoped>
.HomeForm {
  position: relative;
  min-height: 100vh;
}

.absolute {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
}

.object-cover {
  object-fit: cover;
}

.bg-primary {
  background-color: #1f2937;
}

.hover\:bg-primary-dark:hover {
  background-color: #111827;
}

.hover\:text-primary:hover {
  color: #1f2937;
}

.py-10 {
  padding-top: 0px;
  padding-bottom: 15px;
}
</style>
