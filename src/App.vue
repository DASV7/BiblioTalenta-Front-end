<template>
  <div id="app">
    <headerNav v-if="$route.path !== '/'"></headerNav>
    <router-view />
  </div>
</template>
<script>
import headerNav from "./components/menu.vue";
export default {
  name: "app",
  components: {
    headerNav,
  },
  mounted() {
    if (
      localStorage.getItem("jwt") != null &&
      localStorage.getItem("jwt") != "undefined"
    ) {
      this.$store.commit("asingValueToken", localStorage.getItem("jwt"));
      if (this.$route.path !== "/home") {
        this.$router.push("/home");
      }
    } else {
      if (this.$route.path !== "/") {
        this.$router.push("/");
      }
    }
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
