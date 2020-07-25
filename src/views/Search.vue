<template>
  <div>
    <h1>Search</h1>
    <div v-show="!getPaginationLoading">
      <input id="cat" v-model="animalType" type="radio" value="cat" /> Cat
      <input id="dog" v-model="animalType" type="radio" value="dog" /> Dog
      <input id="bird" v-model="animalType" type="radio" value="bird" /> Bird
      <input id="rodent" v-model="animalType" type="radio" value="rodent" />
      Rodent
      <br />
      <br />
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
          <strong>{{ ad.animalType }}</strong>
          Name: {{ ad.name }}, vaccinated: {{ ad.vaccinated }}, sterilized:
          {{ ad.sterilized }}, chipped:
          {{ ad.chipped }}
        </router-link>
      </div>
      <button @click="getMoreAds">Get +5</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// import _ from "lodash";

export default {
  name: "Search",
  data() {
    return {
      filters: [],
      animalType: ""
    };
  },
  computed: {
    ...mapGetters("petAds", ["getPaginationLoading", "getCurrentAds"]),
    filteredData() {
      return this.getCurrentAds.filter(i => {
        if (this.animalType) {
          if (this.filters.length > 0) {
            return this.filters.every(key =>
              i.animalType === this.animalType ? i[key] : false
            );
          } else {
            return i.animalType === this.animalType ? true : false;
          }
        }
        return this.getCurrentAds;
      });
    }
  },
  created() {
    this.$store.dispatch("petAds/fetchAds", 20);
    this.$route.params.animalType
      ? (this.animalType = this.$route.params.animalType)
      : "";
  },
  methods: {
    getMoreAds() {
      this.$store.dispatch("petAds/fetchAds", 20);
    }
  }
};
</script>
