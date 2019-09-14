<template>
  <div>
    <router-link
      :to="{
        name: 'search',
        params: { adType: 'petAd' },
        query: { animalType: 'cat' }
      }"
      >Macke</router-link
    >
    <hr />
    <h3>Newest Dogs</h3>
    <div v-for="(ad, index) in getNewestDogs" :key="index + '-b'">
      {{ ad.name }} - {{ ad.created }} ({{ ad.type }})
    </div>
    <h3>Newest Cats</h3>
    <div v-for="(ad, index) in getNewestCats" :key="index + '-c'">
      {{ ad.name }} - {{ ad.created }} ({{ ad.type }})
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Home",
  components: {},
  computed: {
    ...mapGetters("petAds", ["getCurrentAds", "getNewestDogs", "getNewestCats"])
  }
};
</script>
