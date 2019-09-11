import { Firebase } from "../config/firebase.js";
import moment from "moment";

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
        return b.created - a.created;
      });
    },
    getCurrentAds: state => {
      return Object.values(state.currentAds).sort(function(a, b) {
        return b.created - a.created;
      });
    },
    getNextAds: state => {
      return Object.values(state.nextAds).sort(function(a, b) {
        return b.created - a.created;
      });
    }
  },
  mutations: {
    saveAllAdsToState(state, payload) {
      state.allAds.push(payload);
    },
    saveCurrentAds(state, payload) {
      state.currentAds.push(payload);
    },
    saveNextAds(state, payload) {
      state.nextAds.push(payload);
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
            let created = moment
              .unix(doc.data().created.seconds)
              .format("YYYY/MM/DD");
            let newObject = {
              name: doc.data().name,
              created: created
            };
            commit("saveAllAdsToState", newObject);
          });
        });
    },
    fetchAds({ commit }, limit) {
      Firebase.firestore()
        .collection("petAds")
        .where("adopted", "==", true)
        .orderBy("created", "desc")
        .limit(limit)
        .get()
        .then(querySnapshot => {
          // Save fetched ads into current object
          querySnapshot.forEach(doc => {
            let created = moment
              .unix(doc.data().created.seconds)
              .format("YYYY/MM/DD");
            let newObject = {
              name: doc.data().name,
              created: created
            };
            commit("saveCurrentAds", newObject);
          });
          // Get next 5 results and save fetched ads into next object
          var lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
          Firebase.firestore()
            .collection("petAds")
            .where("adopted", "==", true)
            .orderBy("created", "desc")
            .startAfter(lastVisible)
            .limit(limit)
            .get()
            .then(querySnapshot => {
              querySnapshot.forEach(doc => {
                let created = moment
                  .unix(doc.data().created.seconds)
                  .format("YYYY/MM/DD");
                let newObject = {
                  name: doc.data().name,
                  created: created
                };
                commit("saveNextAds", newObject);
              });
            });
        });
    }
  },
  serverChange: {
    convertTimestamps: {
      created: "%convertTimestamp%"
    }
  }
};

export default petAds;
