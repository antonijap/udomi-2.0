import { Firebase } from "../config/firebase.js";

const petAds = {
  firestorePath: "petAds",
  firestoreRefType: "collection", // or 'doc'
  moduleName: "petAds",
  statePropName: "data",
  namespaced: true, // automatically added

  // this object is your store module (will be added as '/petAds')
  state: {
    allAds: [],
    previousAds: [],
    currentAds: [],
    nextAds: [],
    newestDogs: [],
    newestCats: [],
    newestApartments: []
  },
  getters: {
    getAllAds: state => {
      return Object.values(state.allAds).sort(function(a, b) {
        return new Date(b.created) - new Date(a.created);
      });
    },
    getCurrentAds: state => {
      return Object.values(state.currentAds).sort(function(a, b) {
        return new Date(b.created) - new Date(a.created);
      });
    }
  },
  mutations: {
    saveAllAdsToState(state, payload) {
      state.allAds.push(payload);
    },
    saveCurrentAds(state, payload) {
      state.currentAds.push(payload);
    }
  },
  actions: {
    fetchAllAds({ commit }) {
      Firebase.firestore()
        .collection("petAds")
        .where("adopted", "==", true)
        .orderBy("created", "desc")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            commit("saveAllAdsToState", doc.data());
          });
        });
    },
    fetchAds({ commit }, limit) {
      Firebase.firestore()
        .collection("petAds")
        .where("adopted", "==", true)
        .limit(limit)
        .orderBy("created", "desc")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            console.log(doc.data());
            commit("saveCurrentAds", doc.data());
          });
        });
    }
  }
};

export default petAds;
