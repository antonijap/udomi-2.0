<template>
  <nav class="flex items-center justify-between flex-wrap bg-teal-500 p-6">
    <div class="flex items-center flex-shrink-0 text-white mr-6">
      <router-link to="/" class="font-semibold text-xl tracking-tight">
        Udomi
      </router-link>
    </div>

    <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
      <div class="text-sm lg:flex-grow">
        <router-link
          to="/about"
          class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
        >
          About
        </router-link>

        <router-link
          v-if="authenticated"
          to="/dashboard"
          class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
        >
          <button
            v-if="authenticated === true"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            @click="logout"
          >
            Logout
          </button>
          <button
            v-else
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            @click="login"
          >
            Login
          </button>
          Dashboard
        </router-link>
        <h1 v-if="authenticated === true">Hi {{ firstName }}!</h1>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";

export default {
  name: "MainNavbar",
  computed: {
    ...mapState({
      user: state => state.users.user
    }),
    ...mapGetters({
      authenticated: "users/authenticated"
    }),
    firstName() {
      if (this.user.displayName) {
        return this.user.displayName.split(" ")[0];
      }
      return null;
    }
  },
  methods: {
    login() {
      this.$store.dispatch("users/googleLogin");
    },
    logout() {
      this.$store.dispatch("users/googleLogout");
    },
    ...mapActions("users", ["fetchUser", "googleLogin", "googleLogout"])
  }
};
</script>
