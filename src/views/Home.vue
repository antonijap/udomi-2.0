<template>
  <pre>{{ ads }}</pre>
</template>

<script>
export default {
  name: "home",
  components: {},
  data() {
    return {
      ads: ""
    };
  },
  created() {
    let a = this.$store.dispatch("petAds/openDBChannel");
    console.log(a);
    this.ads = this.$store.state.petAds.ads;
  }
};
</script>
