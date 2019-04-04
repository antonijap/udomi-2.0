<template>
  <div class="home">
    <div v-for="(item, index) in ads" :key="index">
      <p>{{ item.name }}</p>
      <p>{{ item.age }}</p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
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
