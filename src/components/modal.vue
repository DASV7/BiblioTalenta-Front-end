<template>
  <div class="modal-g">
    <div class="modal-g__wrapper">
      <div class="modal-g__container">
        <slot name="header"></slot>
        <slot name="body"></slot>
        <slot name="footer">
          <div class="modal-g__buttons">
            <button
              class="modal-g__button submit"
              @click="clickSubmit"
              ref="submit"
              :disabled="isDisableSubmit"
              autofocus="false"
              v-if="isCancel"
            >
              Aceptar
            </button>
            <button
              class="modal-g__button cancel"
              @click="clickCancel"
              v-if="isCancel"
            >
              Cancelar
            </button>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ModalData",
  props: {
    isCancel: { type: Boolean, default: true },
    isDisableSubmit: { type: Boolean, default: true },
  },
  methods: {
    clickSubmit() {
      this.$emit("onSubmit");
    },
    clickCancel() {
      this.$emit("onCancel");
    },
    disabledButtonSubmit() {
      this.$refs.submit.setAttribute("disabled", "true");
    },
    enabledButtonSubmit() {
      this.$refs.submit.removeAttribute("disabled");
    },
  },
};
</script>

<style lang="scss">
.modal-g {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.144);

  &__wrapper {
    @include Row();
    width: 100%;
    height: 100%;
    position: relative;
  }
  &__container {
    @include Column();
    // width: 300px;
    height: auto;
    max-height: 80vh;
    padding: 15px;
    border-radius: 5px;
    background-color: white;
    box-shadow: 0 2px 5px #d8d8d8;
    overflow-y: auto;
  }
  &__button {
    // @include ButtonRed();
    @include ButtonStyle();
    background-color: red;
    padding: 15px/2;
    border: none;
    margin: 10px;
    &[disabled] {
      opacity: 0.5;
      &:active {
        transform: initial;
      }
    }
    &.cancel {
      background-color: gray;
    }
  }
}
</style>
