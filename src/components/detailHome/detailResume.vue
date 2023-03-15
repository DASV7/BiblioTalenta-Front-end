<template>
  <div class="detailResume">
    <cardComponent
      v-for="(item, index) in cardBooks"
      :key="index"
      :information="item"
    >
    </cardComponent>
  </div>
</template>
<script>
import cardComponent from "../cardBooks.vue";
export default {
  props: ["cardBooks"],
  components: {
    cardComponent,
  },
};
</script>
<style lang="scss">
.detailResume {
  margin: 10px;
  display: flex;
  white-space: wrap;
  gap: 10px;
}
</style>
