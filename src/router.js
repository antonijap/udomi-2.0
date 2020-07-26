import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import About from "./views/About.vue";
import PetAd from "./views/PetAd.vue";
import Search from "./views/Search.vue";
import Dashboard from "./views/Dashboard.vue";
import NewAd from "./views/NewAd.vue";

import { Firebase } from "./config/firebase";
import store from "./store/index";

Vue.use(Router);

const router = new Router({
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
      path: "/newad",
      name: "New Ad",
      component: NewAd
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard
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

router.beforeEach((to, from, next) => {
  Firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      store.commit("users/SAVE_USER", user);
      next();
    } else {
      if (to.matched.some(record => record.meta.requiresAuth)) {
        // Need to login: Dashboard, New Ad
        console.log("user doesn't exist in firebase");
        next("/");
      } else {
        // Free to view
        next();
      }
    }
  });
});

export default router;
