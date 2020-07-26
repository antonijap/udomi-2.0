<template>
  <div class="container mx-auto">
    <div class="grid grid-cols-4 gap-4 mt-4 mb-12">
      <router-link
        :to="{
          name: 'search',
          params: { animalType: 'cat' }
        }"
      >
        <div class="max-w-sm rounded bg-gray-200 hover:bg-blue-100 text-center">
          <div class="px-6 py-4">
            <div class="text-l my-4">
              Udomi mačku
            </div>
          </div>
        </div>
      </router-link>
      <router-link
        :to="{
          name: 'search',
          params: { animalType: 'cat' }
        }"
      >
        <div class="max-w-sm rounded bg-gray-200 hover:bg-blue-100 text-center">
          <div class="px-6 py-4">
            <div class="text-l my-4">
              Udomi psa
            </div>
          </div>
        </div>
      </router-link>
      <router-link
        :to="{
          name: 'search',
          params: { animalType: 'cat' }
        }"
      >
        <div class="max-w-sm rounded bg-gray-200 hover:bg-blue-100 text-center">
          <div class="px-6 py-4">
            <div class="text-l my-4">
              Iznajmi stan
            </div>
          </div>
        </div>
      </router-link>
      <router-link
        :to="{
          name: 'search',
          params: { animalType: 'cat' }
        }"
      >
        <div class="max-w-sm rounded bg-gray-200 hover:bg-blue-100 text-center">
          <div class="px-6 py-4">
            <div class="text-l my-4">
              Mali oglasnik
            </div>
          </div>
        </div>
      </router-link>
    </div>

    <h3 class="text-xl mt-10 mb-6">Zadnji oglasi mačaka</h3>
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

    <h3 class="text-xl mt-10 mb-6">Zadnji oglasi pasa</h3>
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
