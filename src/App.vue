<template>
  <div id="app">
    <AppNavBar />
    <div class="main-container">
      <div class="content-container">
        <router-view />
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script>
import AppNavBar from "./components/organism/AppNavBar.vue";
import AppFooter from "./components/organism/AppFooter.vue";

export default {
  name: "App",
  components: {
    AppNavBar,
    AppFooter,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-container {
  display: flex;
  flex-direction: column;
}

.content-container {
  flex-grow: 1;
  padding: 20px;
  overflow-y: auto;
  min-height: calc(100vh - 100px);
}
</style>
