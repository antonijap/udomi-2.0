<template>
  <div>
    <h1>Trazilica</h1>
    <!-- Here I can access filter for pre-configuration -->
    <h2>Optional: {{ this.$route.query.animalType }}</h2>
    <hr />
    <div v-show="!getPaginationLoading">
      <h1>Current</h1>
      <input id="checkbox" v-model="filterCats" type="checkbox" />
      Macka
      {{ filterCats }}
      <hr />
      <div v-for="(ad, index) in showFilteredResults" :key="index + '-a'">
        <router-link
          :to="{
            name: 'petAd',
            params: { id: ad.id, name: ad.name.toLowerCase() }
          }"
          >{{ ad.name }} - {{ ad.created }} - {{ ad.animalType }}</router-link
        >
      </div>
      <button @click="getads">Get +5</button>
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
  name: "Search",
  data() {
    return {
      filterCats: false
    };
  },
  computed: {
    ...mapGetters("petAds", ["getPaginationLoading", "getCurrentAds"]),
    showFilteredResults: function() {
      if (this.filterCats) {
        return this.getCurrentAds.filter(ad => ad.animalType === "cat");
      }
      return this.getCurrentAds;
    }
  },
  created() {
    if (this.$route.query.animalType === "cat") {
      this.filterCats = true;
    }
  },
  methods: {
    getads() {
      this.$store.dispatch("petAds/fetchAds", 5);
    }
  }
};
</script>
