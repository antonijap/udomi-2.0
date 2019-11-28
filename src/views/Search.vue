<template>
  <div>
    <h1>Search</h1>
    <div v-show="!getPaginationLoading">
      <input v-model="animalType" type="radio" value="cat" /> Cat
      <input v-model="animalType" type="radio" value="dog" /> Dog
      <input v-model="animalType" type="radio" value="bird" /> Bird
      <input v-model="animalType" type="radio" value="rodent" /> Rodent
      <br />
      <br />
      <input v-model="filters" value="vaccinated" type="checkbox" /> Vaccinated
      <input v-model="filters" value="chipped" type="checkbox" /> Chipped
      <input v-model="filters" value="sterilized" type="checkbox" /> Sterilized
      <hr />
      {{ animalType }}
      <div v-for="(ad, index) in filteredData" :key="index + '-a'">
        <router-link
          :to="{
            name: 'petAd',
            params: { id: ad.id, name: ad.name.toLowerCase() }
          }"
        >
          Name: {{ ad.name }}, created: {{ ad.created }}, vaccinated:
          {{ ad.vaccinated }}, sterilized: {{ ad.sterilized }}, chipped:
          {{ ad.chipped }}
          <strong>animalType: {{ ad.animalType }}</strong>
        </router-link>
      </div>
      <button @click="getMoreAds">Get +5</button>
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
// import _ from "lodash";

export default {
  name: "Search",
  data() {
    return {
      filterCats: false,
      animalType: "",
      filters: []
    };
  },
  computed: {
    ...mapGetters("petAds", ["getPaginationLoading", "getCurrentAds"]),
    // Check if an item has all items in this.filters and they must be true
    filteredData() {
      return this.getCurrentAds.filter(i => {
        return this.filters.every(key => i[key]);
      });
    }
  },
  created() {
    // Assign animalType if there is query for that in URL
    this.$store.dispatch("petAds/fetchAds", 20);
    this.$route.query.animalType
      ? (this.animalType = this.$route.query.animalType)
      : "";
  },
  methods: {
    getMoreAds() {
      this.$store.dispatch("petAds/fetchAds", 20);
    }
  }
  // watch: {
  //     animalType(newVal) {
  //       this.$router.push({ query: { animalType: newVal }});
  //     },
  //     '$route.query.animalType': function(val) {
  //         this.animalType = val;
  //         this.$store.dispatch("petAds/fetchAds", 20);
  //     }
  // }
};
</script>
