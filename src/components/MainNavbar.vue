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
          Dashboard
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "MainNavbar",
  props: {
    authenticated: Boolean
  }
};
</script>
