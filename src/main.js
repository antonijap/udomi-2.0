import "firebase/firestore";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { config } from "./config";
import { firestorePlugin } from "vuefire";
import firebase from "firebase/app";
import BootstrapVue from "bootstrap-vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fal } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(fal);
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.use(firestorePlugin);
Vue.use(BootstrapVue);

firebase.initializeApp(config);
export const db = firebase.firestore();

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
