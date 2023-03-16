<template>
  <div class="detailBook">
    <div class="detailBook__container">
      <div class="detailBook__item" v-for="(item, index) in 15" :key="index">
        <div class="">Nombre:</div>
        <div class="">Diego</div>
        <div class="">Devolver</div>
        <div class="">Remover</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "detailBook",
  data() {
    return {};
  },
  methods: {
    async getInformationBooks() {
      
      if (this.$store.state.token.employee) {
        await this.$axios
          .post("books/borrowed")
          .then((e) => {
            console.log(e.information.data);
          })
          .catch((e) => {
            e;
            this.$Swal.fire({
              text: "Rectifica la informacion suministrada",
              icon: "error",
              confirmButtonColor: "#0079ff",
            });
          });
      }
    },
  },
  mounted() {
    this.getInformationBooks();
  },
};
</script>
<style lang="scss">
.detailBook {
  &__container {
    display: grid;
    padding: 20px;
    gap: 5px;
  }
  &__item {
    display: flex;
    justify-content: space-around;
    align-items: center;
    border: 1px solid black;
    height: 35px;
    border-radius: 5px;
  }
}
</style>
