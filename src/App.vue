<template>
  <div id="app">
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
    <router-view :key="$route.path" />
  </div>
</template>

<script>
export default {
  name: "App",
  created() {
    // this.$store.dispatch("petAds/fetchAds", 5);
    this.$store.dispatch("petAds/fetchNewest", ["petAd", "dog", 10]);
    this.$store.dispatch("petAds/fetchNewest", ["petAd", "cat", 10]);
  }
};
</script>
