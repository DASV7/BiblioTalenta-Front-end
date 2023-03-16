<template>
  <div class="detailBook">
    <div class="detailBook__container">
      <h3>Este es el resumen de los libros que se encuentran prestados</h3>
      <div
        class="detailBook__item"
        v-for="(item, index) in informationBooks"
        :key="index"
      >
        <div class="">Nombre:{{ item.name }}</div>
        <div class="">Categoria:{{ item.category }}</div>
        <div class="">Autor:{{ item.author }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "detailBook",
  data() {
    return {
      informationBooks: [],
    };
  },
  methods: {
    async getInformationBooks() {
      if (this.$store.state.token.employee) {
        await this.$axios
          .post("books/borrowed")
          .then((e) => {
            this.informationBooks = e.data.information;
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
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-content: space-around;
    align-items: center;
    border: 1px solid black;
    height: 35px;
    border-radius: 5px;
  }
}
</style>
