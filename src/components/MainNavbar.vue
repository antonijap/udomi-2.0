<template>
  <nav
    class="container mx-auto flex justify-between flex-wrap bg-white-500 py-6"
  >
    <div class="flex flex-auto text-gray-900 mr-6">
      <router-link to="/" class="font-semibold text-xl tracking-tight">
        Udomi
      </router-link>
    </div>

    <div class="flex items-center w-auto flex-initial">
      <button
        v-if="authenticated === false"
        class="bg-blue-100 text-blue-500 py-2 px-4 mr-4 rounded"
        @click="login"
      >
        Ulogiraj se
      </button>

      <router-link
        v-if="authenticated === true"
        class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mr-4"
        to="/"
      >
        Objavi oglas
      </router-link>

      <router-link
        v-if="authenticated === true"
        to="/"
        class="dropdown bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 pl-4 pr-2 border border-gray-400 rounded shadow inline-flex"
      >
        <span>{{ firstName }}</span>
        <feather type="chevron-down" />

        <!--Dropdown-->
        <ul class="dropdown-menu absolute hidden text-gray-900 pt-1 -ml-4 mt-8">
          <li class="">
            <a
              class="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
              href="#"
              >One</a
            >
          </li>
          <li class="">
            <router-link
              v-if="authenticated"
              to="/dashboard"
              class="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
            >
              Moji oglasi
            </router-link>
          </li>
          <li class="">
            <button
              v-if="authenticated === true"
              class="rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
              @click="logout"
            >
              Izlogiraj se
            </button>
          </li>
        </ul>
      </router-link>
    </div>
  </nav>
</template>

<style lang="scss">
.dropdown:hover .dropdown-menu {
  display: block;
}
</style>

<script>
import { mapGetters, mapState, mapActions } from "vuex";

export default {
  name: "MainNavbar",
  data() {
    return {};
  },
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
