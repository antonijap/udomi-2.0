import Vue from "vue";
import Vuex from "vuex";
import VuexEasyFirestore from "vuex-easy-firestore";
Vue.use(Vuex);

import { Firebase, initFirebase } from "./config/firestore.js";
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

// initFirebase
initFirebase().catch(error => {
  // take user to a page stating an error occurred
  // (might be a connection error, or the app is open in another tab)
  throw error;
});

export default store;
