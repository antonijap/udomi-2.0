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
      <hr />
      <div v-for="(ad, index) in filteredData" :key="index + '-a'">
        <router-link
          :to="{
            name: 'petAd',
            params: { id: ad.id, name: ad.name.toLowerCase() }
          }"
          >{{ ad.name }} - {{ ad.created }} - {{ ad.vaccinated }} -
          <strong>{{ ad.animalType }}</strong></router-link
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
    filteredData() {
      return this.getCurrentAds.filter(item => {
        if (this.filters.length === 0) {
          return true;
        }
        let showItem = false;
        this.allObjectPropertiesWithoutBooleans.forEach(property => {
          if (
            item[property] !== undefined &&
            this.filters.includes(item[property])
          ) {
            showItem = true;
            // console.debug(
            //   `The item ${JSON.stringify(
            //     item
            //   )} contains the property "${property}" with the value "${
            //     item[property]
            //   }" which is also in the filters array.`
            // );
          }
        });
        this.allBooleanObjectProperties.forEach(property => {
          if (item[property] === true && this.filters.includes(property)) {
            showItem = true;
            console.debug(
              `The item ${JSON.stringify(
                item
              )} contains the boolean property "${property}" which is "true" and is also in the filters array.`
            );
          }
        });
        return showItem;
      });
    },
    allObjectPropertiesWithoutBooleans() {
      const objectProperties = {};
      this.getCurrentAds.forEach(item => {
        Object.keys(item)
          .filter(
            property => item[property] !== true && item[property] !== false
          )
          .forEach(property => {
            objectProperties[property] = true;
          });
      });
      return Object.keys(objectProperties);
    },
    allBooleanObjectProperties() {
      const objectProperties = {};
      this.getCurrentAds.forEach(item => {
        Object.keys(item)
          .filter(
            property => item[property] === true || item[property] === false
          )
          .forEach(property => {
            objectProperties[property] = true;
          });
      });
      return Object.keys(objectProperties);
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
