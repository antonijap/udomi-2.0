<template>
  <div>
    <h1>Search</h1>
    <div v-show="!getPaginationLoading">
      <input v-model="animalTypeFilter" type="radio" value="cat" /> Cat
      <input v-model="animalTypeFilter" type="radio" value="dog" /> Dog
      <input v-model="animalTypeFilter" type="radio" value="bird" /> Bird
      <input v-model="animalTypeFilter" type="radio" value="rodent" /> Rodent
      <br /><br />
      <input v-model="filters" value="vaccinated" type="checkbox" /> Vaccinated
      <input v-model="filters" value="chipped" type="checkbox" /> Chipped
      <input v-model="filters" value="sterilized" type="checkbox" /> Sterilized
      <hr />
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
          <strong>animalType: {{ ad.animalType }}</strong></router-link
        >
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

export default {
  name: "Search",
  data() {
    return {
      filterCats: false,
      animalTypeFilter: "",
      filters: []
    };
  },
  computed: {
    ...mapGetters("petAds", ["getPaginationLoading", "getCurrentAds"]),
    // Check if an item has all items in this.filters and they must be true
    filteredData() {
      return this.getCurrentAds.filter(item => {
        if (
          this.filters.length === 0 &&
          item.animalType === this.animalTypeFilter
        ) {
          console.log("No filters applied.");
          return item;
        }
        let show = false;
        Object.keys(item).forEach(key => {
          if (
            this.filters.includes(key) &&
            item[key] === true &&
            item.animalType === this.animalTypeFilter
          ) {
            console.log(`${key} : ${item[key]} for ${item.name}`);
            show = true;
          }
        });
        return show;
      });
    }
  },
  created() {
    // Assign animalTypeFilter if there is query for that in URL
    this.$store.dispatch("petAds/fetchAds", 20);
    if (this.$route.query.animalType) {
      this.animalTypeFilter = this.$route.query.animalType;
    }
  },
  methods: {
    getMoreAds() {
      this.$store.dispatch("petAds/fetchAds", 20);
    }
  }
};
</script>
