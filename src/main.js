import "firebase/firestore";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { config } from "./config";
import { firestorePlugin } from "vuefire";
import firebase from "firebase/app";
import BootstrapVue from "bootstrap-vue";

Vue.use(firestorePlugin);
Vue.use(BootstrapVue);

firebase.initializeApp(config);
export const db = firebase.firestore();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
