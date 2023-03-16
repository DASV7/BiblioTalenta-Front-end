<template>
  <div class="initAplication">
    <div class="initAplication__container" id="container">
      <div class="form-container sign-up-container">
        <form class="initAplication__form" id="createUser">
          <h1 class="initAplication__h1">Crear Cuenta</h1>
          <input
            name="name"
            class="initAplication__input"
            type="text"
            placeholder="Nombre"
          />
          <input
            name="email"
            class="initAplication__input"
            type="email"
            placeholder="Correo"
          />
          <input
            name="password"
            class="initAplication__input"
            type="password"
            placeholder="Contraseña"
          />
          <label for="employee">¿Eres empleado? </label>
          <label class="switch">
            <input
              name="employee"
              class="initAplication__input"
              type="checkbox"
            />
            <span class="slider round"></span>
          </label>
          <button
            class="initAplication__button"
            @click="loginAction('createUser', $event)"
          >
            Registrarse
          </button>
        </form>
      </div>
      <div class="form-container sign-in-container">
        <form class="initAplication__form" id="userActive">
          <h1 class="initAplication__h1">Iniciar sesion En BiblioTalenta</h1>
          <input
            name="email"
            class="initAplication__input"
            type="email"
            placeholder="Email"
          />
          <input
            name="password"
            class="initAplication__input"
            type="password"
            placeholder="Contraseña"
          />
          <button
            class="initAplication__button"
            @click="loginAction('userActive', $event)"
          >
            Iniciar sesion
          </button>
        </form>
      </div>
      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-left">
            <h1 class="initAplication__h1">Crea tu Cuenta!</h1>
            <p>Crea tu cuenta segun tu rol, Ya sea usuario o empleado</p>
            <button
              class="initAplication__button ghost"
              @click="actionbutton('signIn')"
              id="signIn"
            >
              Inicia Sesion
            </button>
          </div>
          <div class="overlay-panel overlay-right">
            <h1 class="initAplication__h1">Hola, Amigo</h1>
            <p>Inicia sesión para empezar a leer o Crea tu cuenta</p>
            <button
              class="initAplication__button ghost"
              id="signUp"
              @click="actionbutton('signUp')"
            >
              Crea tu biblioCuenta
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "startAplication",
  data() {
    return {
      role: [
        { name: "Usuario", icon: "fa-user", role: "user" },
        { name: "Empleado", icon: "fa-users", role: "employee" },
      ],
      actions: {
        signUp: "add",
        signIn: "remove",
      },
    };
  },
  methods: {
    actionbutton(name) {
      const element = document.getElementById("container");
      element.classList[this.actions[name]]("right-panel-active");
    },
    async loginAction(form, event) {
      event.preventDefault();

      const element = document.querySelector(`#${form}`);
      const valueForm = new FormData(element);
      const route = form === "createUser" ? "/users/create" : "/login";

      await this.$axios
        .post(route, valueForm)
        .then((e) => {
          e;
          this.$Swal.fire({
            text:
              form === "createUser"
                ? "Usuario Creado Correctamente"
                : "Inicio Correctamente",
            icon: "success",
            confirmButtonColor: "#0079ff",
          });
          localStorage.setItem("jwt", e.data.jwt);
          this.$router.push("/home");
          this.$store.commit("asingValueToken", e.data.jwt);
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
* {
  box-sizing: border-box;
}

.initAplication {
  background: #f6f5f7;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: "Montserrat", sans-serif;
  height: 100vh;
  &__container {
    position: absolute;
    width: 800px;
    height: 600px;
  }
  &__h1 {
    font-weight: bold;
    margin: 0;
  }
  &__p {
    font-size: 14px;
    font-weight: 100;
    line-height: 20px;
    letter-spacing: 0.5px;
    margin: 20px 0 30px;
  }
  &__a {
    color: #333;
    font-size: 14px;
    text-decoration: none;
    margin: 15px 0;
  }
  &__button {
    border-radius: 20px;
    border: 1px solid #ff4b2b;
    background-color: #ff4b2b;
    color: #ffffff;
    font-size: 12px;
    font-weight: bold;
    padding: 12px 45px;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: transform 80ms ease-in;
    &:active {
      transform: scale(0.95);
    }
    &:focus {
      outline: none;
    }
  }
  .ghost {
    background-color: transparent;
    border-color: #ffffff;
  }
  &__input {
    background-color: #eee;
    border: none;
    padding: 12px 15px;
    margin: 8px 0;
    width: 100%;
  }
  &__form {
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 50px;
    height: 100%;
    text-align: center;
  }
}

.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
}

.sign-in-container {
  left: 0;
  width: 50%;
  z-index: 2;
}

.sign-up-container {
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
}

.initAplication__container.right-panel-active .sign-up-container {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
  animation: show 0.6s;
}

@keyframes show {
  0%,
  49.99% {
    opacity: 0;
    z-index: 1;
  }

  50%,
  100% {
    opacity: 1;
    z-index: 5;
  }
}

.overlay-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
}

.initAplication__container.right-panel-active .overlay-container {
  transform: translateX(-100%);
}

.overlay {
  background: #ff416c;
  background: -webkit-linear-gradient(to right, #ff4b2b, #ff416c);
  background: linear-gradient(to right, #ff4b2b, #ff416c);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #ffffff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.initAplication__container.right-panel-active .overlay {
  transform: translateX(50%);
}

.overlay-panel {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.overlay-left {
  transform: translateX(-20%);
}

.initAplication__container.right-panel-active .overlay-left {
  transform: translateX(0);
}

.overlay-right {
  right: 0;
  transform: translateX(0);
}

.initAplication__container.right-panel-active .overlay-right {
  transform: translateX(20%);
}

.social-container {
  margin: 20px 0;
}

.social-container a {
  border: 1px solid #dddddd;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  height: 40px;
  width: 40px;
}

footer {
  background-color: #222;
  color: #fff;
  font-size: 14px;
  bottom: 0;
  position: fixed;
  left: 0;
  right: 0;
  text-align: center;
  z-index: 999;
}

footer p {
  margin: 10px 0;
}

footer i {
  color: red;
}

footer a {
  color: #3c97bf;
  text-decoration: none;
}
</style>
