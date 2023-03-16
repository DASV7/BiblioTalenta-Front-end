<template>
  <div>
    <div class="detailResume">
      <cardComponent
        @openModal="openModalEvent($event)"
        @deleteBook="deleteBooks($event)"
        @borrowedBook="borrowedBooks($event)"
        v-for="(item, index) in cardBooks"
        :key="index"
        :information="item"
      >
      </cardComponent>
    </div>
    <modal :isCancel="false" v-if="showModal">
      <template v-slot:body>
        <div class="modalForm">
          <button @click="cancelButton()">X</button>
          <h2>Formulario de creacion de Libros</h2>
          <hr />
          <div class="modalForm__info">
            <div
              class="modalForm__info-item"
              v-for="(item, index) in inputsOptions"
              :key="index"
            >
              <label for="name">{{ item.placeholder }}:</label>
              <input
                :id="item.name"
                type="text"
                class="modalForm__info-input"
                :placeholder="item.placeholder"
                :name="item.name"
                v-model="informationModal[item.name]"
              />
            </div>
            <div class="modalForm__info-item">
              <label for="category">Categoria</label>
              <select
                v-model="informationModal['category']"
                name="category"
                id="category"
                class="modalForm__info-input"
              >
                <option v-for="(item, idx) in categories" :key="idx">
                  {{ item }}
                </option>
              </select>
            </div>
          </div>
          <button class="modalForm__info-send" @click="updatebook($event)">
            Actualizar libro
          </button>
        </div>
      </template>
    </modal>
  </div>
</template>
<script>
import cardComponent from "../cardBooks.vue";
import modal from "../modal.vue";
export default {
  props: ["cardBooks"],
  components: {
    cardComponent,
    modal,
  },
  data() {
    return {
      showModal: false,
      informationModal: {},
      inputsOptions: [
        { name: "name", placeholder: "Nombre" },
        { name: "author", placeholder: "Autor del libro" },
        { name: "description", placeholder: "Descripción" },
        { name: "urlImage", placeholder: "Url Imagen" },
      ],
      categories: [
        "Romance",
        "Terror",
        "Comedia",
        "Auto-ayuda",
        "Novelas",
        "Aventura",
      ],
    };
  },
  methods: {
    openModalEvent(event) {
      this.showModal = true;
      this.informationModal = event;
    },
    cancelButton() {
      this.showModal = false;
    },
    async updatebook() {
      await this.$axios
        .patch("books", this.informationModal)
        .then(() => {
          this.$emit("updatedataModal", this.informationModal);
          this.$Swal.fire({
            text: "Actualicado correctamente",
            icon: "success",
            confirmButtonColor: "#0079ff",
          });
          this.cancelButton();
        })
        .catch((e) => {
          e;
          this.$Swal.fire({
            text: "Rectifica la informacion suministrada",
            icon: "error",
            confirmButtonColor: "#0079ff",
          });
        });
    },
    async borrowedBooks(event) {
      const info = { ...event, idUser: this.$store.state.token._id };
      await this.$axios
        .post("books/borrowedBook", info)
        .then(() => {
          this.showModal = false;
          this.$Swal.fire({
            text: "Actualicado correctamente",
            icon: "success",
            confirmButtonColor: "#0079ff",
          });
          this.$emit("updateBook", info);
        })
        .catch((e) => {
          e;
          this.$Swal.fire({
            text: "Rectifica la informacion suministrada",
            icon: "error",
            confirmButtonColor: "#0079ff",
          });
        });
    },
    async deleteBooks(event) {
      await this.$axios
        .post("books/delete", { _id: event })
        .then(() => {
          this.$emit("deleteBook", event);
          this.showModal = false;
        })
        .catch((e) => {
          e;
          this.$Swal.fire({
            text: "Rectifica la informacion suministrada",
            icon: "error",
            confirmButtonColor: "#0079ff",
          });
        });
    },
  },
};
</script>
<style lang="scss">
.detailResume {
  margin: 10px;
  display: flex;
  flex-wrap: wrap;

  @media screen and (max-width: 767px) {
    justify-content: center;
  }

  gap: 10px;
}
</style>
