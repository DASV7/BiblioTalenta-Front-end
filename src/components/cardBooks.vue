<template>
  <div class="cardUser">
    <div class="cardUser__img">
      <img class="cardUser__img-item" :src="information.urlImage" />
    </div>
    <div class="cardUser__name">
      {{ information?.name }}
    </div>
    <div class="cardUser__actions flex" v-if="$store.state.token?.employee">
      <button class="cardUser__actions-add flex" @click="editUser()">
        <p>Editar</p>
        <i class="fa-solid fa-pen-to-square"></i>
      </button>
      <button @click="deleteCardUser()" class="cardUser__actions-delete flex">
        <p>Eliminar</p>
        <i class="fa-solid fa-trash"></i>
      </button>
    </div>
    <div class="cardUser__actions-content" v-else>
      <button @click="borrowedBook()" class="cardUser__actions-delete flex">
        <p>
          {{
            information?.whoHave == $store.state.token?._id
              ? "Devolver libro"
              : "Prestar Libro"
          }}
        </p>
        <i class="fa-solid fa-address-book"></i>
      </button>
    </div>
    <u class="cardUser__date"
      >Fecha Entrada Libro:{{
        new Date(information.date_register).toLocaleDateString("es-AR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
      }}</u
    >
  </div>
</template>

<script>
export default {
  name: "cardEmployee",
  props: ["information"],
  data() {
    return {
      role: "",
    };
  },
  mounted() {},
  methods: {
    deleteCardUser() {
      this.$emit("deleteBook", this.information._id);
    },
    editUser() {
      this.$emit("openModal", this.information);
    },
    borrowedBook(){
      this.$emit("borrowedBook", this.information);
    }
  },
};
</script>
<style lang="scss">
.cardUser {
  width: 200px;
  height: 200px;
  border: 1px solid #000;
  border-radius: 10px;

  &__img {
    &-item {
      width: 120px;
      height: 120px;
      object-fit: cover;
      border: 1px solid #ccc;
    }
  }

  &__name {
    font-size: 1rem;
    font-weight: bold;
    color: #000;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    text-align: center;
  }

  &__actions {
    &-add {
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
    &-content {
      display: flex;
      justify-content: center;
    }
    &-delete {
      display: flex;
      justify-content: center;
      background-color: rgb(211, 0, 0);
      border: none;
      border-radius: 5px;
      color: white;
      cursor: pointer;
    }
  }

  &__date {
    font-size: 10px;
  }
}
</style>
