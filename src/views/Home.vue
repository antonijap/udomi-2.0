<template>
  <div>
    <div v-for="(item, index) in ads" :key="index">
      <div>
        <b-card :title="item.name" :sub-title="item.age">
          <b-card-text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, cupiditate!</b-card-text>
          <b-button variant="primary">Primary</b-button>
        </b-card>
      </div>
    </div>
  </div>
</template>

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
