<template>
  <div class="homePage">
    <div class="homePage__flex">
      <div class="homePage__item">
        <i class="homePage__icon fa-regular fa-stars"></i>
        <span class="homePage__item-p">La lectura es un viaje</span>
        hacia la imaginación, donde cada página es una nueva aventura que nos
        lleva a lugares inexplorados y nos permite conocer nuevas ideas y
        perspectivas

        <button class="homePage__button" @click="$route.push('/resume')">
          Ver libros Prestados
        </button>
      </div>
    </div>
    <div class="homePage__search">
      <input
        class="homePage__search-input"
        v-model="search"
        type="text"
        placeholder="Buscar Libro nombre,detalle,autor"
      />
    </div>

    <div class="homePage__books">
      <button class="homePage__books-create" @click="openModal()">
        <i class="fa-solid fa-square-plus"></i>
        Nuevo libro
      </button>
    </div>

    <modal
      @onSubmit="confirmButton($event)"
      @onCancel="cancelButton()"
      v-if="showModal"
      :is-cancel="false"
      ref="modal"
    >
      <template v-slot:body>
        <div class="modalForm">
          <button @click="cancelButton()">X</button>
          <h2>Formulario de creacion de Libros</h2>
          <hr />
          <form class="modalForm__info">
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
              />
            </div>
            <div class="modalForm__info-item">
              <label for="category">Categoria</label>
              <select
                name="category"
                id="category"
                class="modalForm__info-input"
              >
                <option v-for="(item, idx) in categories" :key="idx">
                  {{ item }}
                </option>
              </select>
            </div>
          </form>
          <button class="modalForm__info-send" @click="createBook($event)">
            Crear Libro
          </button>
        </div>
      </template>
    </modal>

    <detailResume
      v-if="informacion.length"
      :cardBooks="informacion"
    ></detailResume>
  </div>
</template>
<script>
import modal from "../components/modal.vue";
import detailResume from "../components/detailHome/detailResume.vue";
export default {
  components: {
    modal,
    detailResume,
  },
  data() {
    return {
      showModal: false,
      search: "",
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
      informacion: [],
    };
  },
  mounted() {
    this.getBooksByFiltes();
  },
  methods: {
    confirmButton() {},
    cancelButton() {
      this.showModal = false;
    },
    openModal() {
      this.showModal = true;
    },
    async getBooksByFiltes() {
      const query = `?search=${this.search}`;
      await this.$axios
        .get("books" + query)
        .then((e) => {
          const { data } = e;
          console.log(data);
          this.informacion = data.information;
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

    async createBook(event) {
      event.preventDefault();
      const element = document.querySelector(`.modalForm__info`);
      const valueForm = new FormData(element);
      await this.$axios
        .post("books/create", valueForm)
        .then((e) => {
          console.log(e);
          this.$Swal.fire({
            text: "Creado Correctamente",
            icon: "success",
            confirmButtonColor: "#0079ff",
          });
        })
        .catch(() => {
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
.modalForm {
  width: 400px;
  height: 300px;
  &__info {
    &-send {
      background-color: #146ebe;
      padding: 10px;
      border-radius: 5px;
      border: none;
      color: white;
    }
    &-item {
      display: grid;
      margin-bottom: 5px;
      label {
        text-align: start;
      }
    }
    &-input {
      border: none;
      border-bottom: 2px solid black;
      outline: none;
    }
  }
}

.homePage {
  &__flex {
    display: flex;
    justify-content: center;
  }
  &__books {
    padding: 10px;
    &-create {
      color: white;
      background-color: #146ebe;
      width: 150px;
      height: 30px;
      border: 1px solid white;
      border-radius: 5px;
    }
  }
  &__item {
    padding: 10px;
    align-self: center;
    background-color: #ffd43b;
    width: 80%;
    height: 70px;
    border-radius: 5px;
    text-align: center;
    margin-top: 50px;

    &-p {
      font-weight: bold;
    }
  }
  &__search {
    &-input {
      border-radius: 5px;
      padding: 5px;
      margin: 5px;
      width: 30%;
    }
  }
  &__books {
    margin-top: 10px;
    display: flex;
    background-color: #f0f1f3;
  }
  &__button {
    padding: 5px;
    border: none;
    background-color: white;
    border-radius: 5px;
    color: black;
  }

  &__icon {
    background-color: #ffd43b;
  }
}
</style>
