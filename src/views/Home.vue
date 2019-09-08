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
    this.$store
      .dispatch("petAds/fetchAndAdd", {
        where: [["adopted", "==", false]],
        limit: 1
      })
      .then(querySnapshot => {
        console.log(querySnapshot);
        this.ads = this.$store.state.petAds.ads;
        // do whatever you want with the `querySnapshot`
      })
      .catch(console.error);
  }
};
</script>
