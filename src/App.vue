<template>
  <div id="app">
    <main-navbar :authenticated="$store.getters['users/authenticated']" />

    <router-view :key="$route.path" />
  </div>
</template>

<script>
import MainNavbar from "./components/MainNavbar";
export default {
  name: "App",
  components: {
    MainNavbar
  },
  created() {
    // this.$store.dispatch("petAds/fetchAds", 5);
    this.$store.dispatch("petAds/fetchNewest", ["petAd", "dog", 10]);
    this.$store.dispatch("petAds/fetchNewest", ["petAd", "cat", 10]);
  }
};
</script>
