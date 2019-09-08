import Vue from "vue";
import Vuex from "vuex";
import VuexEasyFirestore from "vuex-easy-firestore";
Vue.use(Vuex);

import { Firebase } from "./config/firestore.js";
import petAds from "./modules/petAds.js";

const easyFirestore = VuexEasyFirestore([petAds], {
  logging: true,
  FirebaseDependency: Firebase
});

// include as PLUGIN in your vuex store
// please note that "petAds" should ONLY be passed via the plugin
const storeData = {
  plugins: [easyFirestore]
  // ... your other store data
};

// initialise Vuex
const store = new Vuex.Store(storeData);

export default store;
