<template>
  <div>
    <div v-show="!getPaginationLoading">
      <h1>Current</h1>
      <div v-for="(ad, index) in getCurrentAds" :key="index + '-a'">
        {{ ad.name }} - {{ ad.created }}
      </div>
    </div>
    <font-awesome-icon
      v-show="getPaginationLoading"
      :icon="['fal', 'spinner']"
      size="lg"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "home",
  components: {},
  computed: {
    ...mapGetters("petAds", ["getPaginationLoading", "getCurrentAds"])
  },
  created() {
    setTimeout(() => {
      this.$store.dispatch("petAds/fetchAds", 5);
      setTimeout(() => {
        this.$store.dispatch("petAds/fetchAds", 5);
      }, 3000);
    }, 3000);
  }
};
</script>
