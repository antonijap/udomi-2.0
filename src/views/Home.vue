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

    <div>
      Testing auth here:

      <button v-if="authenticated === true" @click="logout">
        Logout
      </button>
      <button v-else @click="login">Login</button>
    </div>

    <h1 v-if="authenticated === true">Hi {{ firstName }}!</h1>
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
import { mapGetters, mapActions, mapState } from "vuex";

export default {
  name: "Home",
  components: {},
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
      this.$router.history.push("/dashboard");
    },
    logout() {
      this.$store.dispatch("users/googleLogout");
    },
    ...mapActions("users", ["fetchUser", "googleLogin", "googleLogout"])
  },
  /* eslint-disable vue/order-in-components */
  computed: {
    ...mapState({
      user: state => state.users.user
    }),
    ...mapGetters({
      authenticated: "users/authenticated",
      getNewestDogs: "petAds/getNewestDogs",
      getNewestCats: "petAds/getNewestCats"
    }),
    firstName() {
      if (this.user.displayName) {
        return this.user.displayName.split(" ")[0];
      }
      return null;
    }
  }
};
</script>
