<template>
  <div>
    <router-link
      :to="{
        name: 'search',
        params: { animalType: 'cat' }
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
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Home",
  data() {
    return {};
  },
  mounted() {
    this.loggedIn = this.$store.getters["users/authenticated"];
  },
  methods: {
    login() {
      // this.$store.dispatch("users/set", { title: "Hello Firestore 🔥" });
      this.$store.dispatch("users/googleLogin");
    },
    logout() {
      this.$store.dispatch("users/googleLogout");
    },
    ...mapActions("users", ["fetchUser", "googleLogin", "googleLogout"])
  },
  /* eslint-disable vue/order-in-components */
  computed: {
    ...mapGetters("petAds", ["getCurrentAds", "getNewestDogs", "getNewestCats"])
  }
};
</script>
