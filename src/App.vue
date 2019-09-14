<template>
  <div id="app">
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("petAds", [
      "getPaginationLoading",
      "getCurrentAds",
      "getNewestDogs",
      "getNewestCats"
    ])
  },
  created() {
    this.$store.dispatch("petAds/fetchAds", 5);
    this.$store.dispatch("petAds/fetchNewest", ["dog", 10]);
    this.$store.dispatch("petAds/fetchNewest", ["cat", 10]);
  }
};
</script>
