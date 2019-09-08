<template>
  <div
    style="display: grid; grid-template-columns: repeat(4, 1fr); grid-column-gap: 10px;"
  >
    <b-card
      :title="item.name"
      :sub-title="item.age"
      v-for="(item, index) in ads"
      :key="index"
    >
      <img :src="item.image" :alt="item.name" />
      <b-card-text>{{ item.description }}</b-card-text>
      <b-card-text>{{ item.height }} rast</b-card-text>
      <span v-if="item.vaccines">
        <span v-if="item.vaccines" v-b-tooltip.hover title="Cijepljena">
          <font-awesome-icon :icon="['fal', 'syringe']" />
        </span>
        <span v-else v-b-tooltip.hover title="Cijepljen">
          <font-awesome-icon :icon="['fal', 'syringe']" />
        </span>
      </span>
      <span v-if="item.chip">
        <span v-if="item.vaccines" v-b-tooltip.hover title="Cipirana">
          <font-awesome-icon :icon="['fal', 'microchip']" />
        </span>
        <span v-else v-b-tooltip.hover title="Cipiran">
          <font-awesome-icon :icon="['fal', 'microchip']" />
        </span>
      </span>
      <span v-if="item.sterilization">
        <span v-if="item.vaccines" v-b-tooltip.hover title="Sterilizirana">
          <font-awesome-icon :icon="['fal', 'syringe']" />
        </span>
        <span v-else v-b-tooltip.hover title="Steriliziran">
          <font-awesome-icon :icon="['fal', 'syringe']" />
        </span>
      </span>
      <span v-if="item.castration">
        <span v-if="item.vaccines" v-b-tooltip.hover title="Kastrirana">
          <font-awesome-icon :icon="['fal', 'syringe']" />
        </span>
        <span v-else v-b-tooltip.hover title="Kastrirana">
          <font-awesome-icon :icon="['fal', 'syringe']" />
        </span>
      </span>
    </b-card>
  </div>
</template>

<style lang="scss" scoped>
span > span {
  padding: 5px;
  color: orangered;
  width: 32px;
  height: 32px;
}
img /deep/ {
  width: 100%;
}
</style>

<script>
import { db } from "../main";

export default {
  name: "home",
  components: {},
  data() {
    return {
      ads: {}
    };
  },
  firestore() {
    return {
      ads: db.collection("ads")
    };
  }
};
</script>
