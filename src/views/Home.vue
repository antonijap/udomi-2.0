<template>
  <div class="container mx-auto">
    <router-link
      :to="{
        name: 'search',
        params: { animalType: 'cat' }
      }"
    >
      <div class="max-w-sm rounded overflow-hidden shadow-lg">
        <img
          class="w-full"
          src="https://ichef.bbci.co.uk/news/410/cpsprodpb/12A9B/production/_111434467_gettyimages-1143489763.jpg"
          alt="Sunset in the mountains"
        />
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">
            Macke
          </div>
          <p class="text-gray-700 text-base">
            Adopt a cute cat.
          </p>
        </div>
      </div>
    </router-link>
    <hr />

    <h3 class="text-4xl">Newest Dogs</h3>
    <div class="grid grid-cols-4 gap-4">
      <div v-for="(ad, index) in getNewestDogs" :key="index + '-b'">
        <div class="max-w-sm rounded overflow-hidden shadow-lg">
          <img
            class="w-full"
            src="https://picsum.photos/200"
            alt="Sunset in the mountains"
          />
          <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2">{{ ad.name }}</div>
            <p class="text-gray-700 text-base">
              {{ ad.created }}
            </p>
          </div>
          <div class="px-6 py-4">
            <span
              class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
              >{{ ad.adType }}</span
            >
          </div>
        </div>
      </div>
    </div>

    <h3 class="text-4xl">Newest Cats</h3>
    <div class="grid grid-cols-4 gap-4">
      <div v-for="(ad, index) in getNewestCats" :key="index + '-c'">
        <div class="max-w-sm rounded overflow-hidden shadow-lg">
          <img
            class="w-full"
            src="https://picsum.photos/200"
            alt="Sunset in the mountains"
          />
          <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2">{{ ad.name }}</div>
            <p class="text-gray-700 text-base">
              {{ ad.created }}
            </p>
          </div>
          <div class="px-6 py-4">
            <span
              class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
              >{{ ad.adType }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Home",
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      getNewestDogs: "petAds/getNewestDogs",
      getNewestCats: "petAds/getNewestCats"
    })
  },

  mounted() {
    this.loggedIn = this.$store.getters["users/authenticated"];
  }
};
</script>
