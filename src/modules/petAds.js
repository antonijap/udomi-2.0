import * as firebase from "firebase/app";

const petAds = {
  firestorePath: "ads",
  firestoreRefType: "collection", // or 'doc'
  moduleName: "petAds",
  statePropName: "ads",
  namespaced: true, // automatically added

  // this object is your store module (will be added as '/petAds')
  // you can also add state/getters/mutations/actions
  state: {},
  getters: {},
  mutations: {},
  actions: {
    fetchAds() {
      firebase
        .firestore()
        .collection("ads")
        .where("adopted", "==", false)
        .get();
    }
  }
};

export default petAds;
