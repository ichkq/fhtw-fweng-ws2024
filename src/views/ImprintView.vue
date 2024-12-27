<template>
  <div class="relative flex flex-col items-center justify-center h-screen">
    <img
      :src="require('../assets/images/image_background_4.png')"
      class="absolute inset-0 object-cover w-full h-full z-0 opacity-50"
    />
    <div
      class="Imprint relative z-10 bg-white bg-opacity-80 p-8 rounded-lg shadow-lg"
    >
      <h1 class="text-4xl font-bold text-center">Imprint</h1>
      <p class="text-lg text-center mb-4">
        This is the imprint section. Below are the topics relevant to our
        marketplace:
      </p>
      <h2 class="text-2xl font-semibold mt-6">HAKart Topics:</h2>
      <ul class="list-none p-0">
        <li class="text-lg">Electronic Devices</li>
        <li class="text-lg">Sports</li>
        <li class="text-lg">Videogames</li>
        <li class="text-lg">Trainers</li>
        <li class="text-lg">Household Stuff</li>
        <li class="text-lg">Clothings</li>
      </ul>
      <p class="mt-4">
        For more information, please contact us at
        <a
          href="mailto:support@HAKart.com"
          class="text-blue-500 hover:underline"
          >support@HAKart.com</a
        >
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ImprintView",
};
</script>

<style scoped>
h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

h2 {
  font-size: 1.5rem;
  margin-top: 1.5rem;
}

ul {
  list-style-type: none;
  margin-left: 0;
}

p {
  margin: 1rem 0;
}

a {
  color: #3b82f6;
  text-decoration: underline;
}

a:hover {
  text-decoration: none;
}

img {
  filter: brightness(0.7);
  opacity: 0.5;
}

.Imprint {
  max-width: 800px;
  text-align: center;
}
</style>
