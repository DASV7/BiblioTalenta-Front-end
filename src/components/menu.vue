<template>
  <div class="headerNav">
    <img
      class="headerNav__img"
      src="https://magv1-prod.s3.amazonaws.com/image_assets/files/10632/medium-nuevo-logo-talenta-.jpg?1614979316"
      alt="Logo talenta"
    />
    <div
      class="headerNav__item"
      v-for="(item, index) in optionsMenu"
      :key="index"
      @click="goRouter(item)"
    >
      <i :class="item.icon"></i>
      {{ index }}
    </div>
    <button class="headerNav__button" @click="closeSesion()">
      Cerrar Sesión
    </button>
  </div>
</template>
<script>
export default {
  name: "headerNav",
  data() {
    return {
      optionsMenu: {
        Inicio: { icon: "fa-solid fa-house", route: "/home" },
      },
      activeRoute: "",
    };
  },
  methods: {
    goRouter(route) {
      if (this.activeRoute !== route.route) {
        this.activeRoute = route.route;
        this.$router.push(this.activeRoute);
      }
    },
    closeSesion() {
      localStorage.clear();
      console.clear();
      this.$router.push("/");
    },
  },
  beforeMount() {
    if (this.$store.state.token.employee) {
      this.optionsMenu["Resumen"] = {
        icon: "fa-solid fa-calendar-days",
        route: "/detail",
      };
    }
  },
};
</script>
<style lang="scss">
.headerNav {
  display: flex;
  padding: 10px;
  background-color: white;
  border-bottom: 1px solid #00000031;
  width: 100%;
  height: 40px;

  &__img {
    height: 30px;
  }
  &__button {
    position: absolute;
    margin-top: 5px;
    right: 10px;
    border: none;
    background-color: transparent;
    border-bottom: 1px solid black;
    cursor: pointer;
  }
  &__item {
    padding: 7px;
    font-weight: 300;
    margin-left: 20px;
    cursor: pointer;
  }
}
</style>
