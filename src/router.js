import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import About from "./views/About.vue";
import PetAd from "./views/PetAd.vue";
import Search from "./views/Search.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  props: true,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      component: About
    },
    {
      path: "/oglas/:id/:name",
      component: PetAd,
      name: "petAd"
    },
    {
      path: "/search",
      name: "search",
      component: Search
    }
  ]
});
