import { Firebase } from "../config/firebase.js";
import moment from "moment";
moment.locale("hr");

const petAds = {
  firestorePath: "petAds",
  firestoreRefType: "collection",
  moduleName: "petAds",
  statePropName: "data",
  namespaced: true,
  state: {
    pagination: {
      loading: true,
      lastVisible: {},
      currentAds: [],
      nextAds: []
    },
    newestShowcase: {
      loading: true,
      newestDogs: [],
      newestCats: [],
      newestApartments: []
    }
  },
  getters: {
    getPaginationLoading: state => {
      return state.pagination.loading;
    },
    getCurrentAds: state => {
      return Object.values(state.pagination.currentAds).sort(function(a, b) {
        return b.created - a.created;
      });
    },
    getNextAds: state => {
      return Object.values(state.pagination.nextAds).sort(function(a, b) {
        return b.created - a.created;
      });
    },
    getNewestDogs: state => {
      return Object.values(state.newestShowcase.newestDogs).sort(function(
        a,
        b
      ) {
        return b.created - a.created;
      });
    },
    getNewestCats: state => {
      return Object.values(state.newestShowcase.newestCats).sort(function(
        a,
        b
      ) {
        return b.created - a.created;
      });
    }
  },
  mutations: {
    saveCurrentAds(state, payload) {
      state.pagination.currentAds.push(payload);
      state.pagination.loading = false;
    },
    saveLastAdForPagination(state, payload) {
      state.pagination.lastVisible = payload;
    },
    saveNewestDogs(state, payload) {
      state.newestShowcase.newestDogs.push(payload);
    },
    saveNewestCats(state, payload) {
      state.newestShowcase.newestCats.push(payload);
    }
  },
  actions: {
    fetchAds({ commit, state }, limit) {
      let query = "";
      if (Object.keys(state.pagination.lastVisible).length === 0) {
        query = Firebase.firestore()
          .collection("petAds")
          .where("adopted", "==", true)
          .orderBy("created", "desc")
          .limit(limit)
          .get();
      } else {
        query = Firebase.firestore()
          .collection("petAds")
          .where("adopted", "==", false)
          .orderBy("created", "desc")
          .startAfter(state.pagination.lastVisible)
          .limit(limit)
          .get();
      }
      query.then(querySnapshot => {
        if (querySnapshot.docs.length > 0) {
          let lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
          commit("saveLastAdForPagination", lastVisible);
          querySnapshot.forEach(doc => {
            let created = moment.unix(doc.data().created.seconds).fromNow();
            let newObject = {
              // TODO: parse all object here
              name: doc.data().name,
              created: created,
              id: doc.data().index,
              animalType: doc.data().type
            };
            commit("saveCurrentAds", newObject);
          });
        } else {
          console.log("Nema vise");
        }
      });
    },
    fetchNewest({ commit }, [type, limit]) {
      if (type === "dog") {
        Firebase.firestore()
          .collection("petAds")
          .where("adopted", "==", false)
          .where("type", "==", type)
          .orderBy("created", "desc")
          .limit(limit)
          .get()
          .then(querySnapshot => {
            if (querySnapshot.docs.length > 0) {
              querySnapshot.forEach(doc => {
                let created = moment.unix(doc.data().created.seconds).fromNow();
                let newObject = {
                  // TODO: parse all object here
                  name: doc.data().name,
                  created: created,
                  type: doc.data().type,
                  id: doc.data().index
                };
                commit("saveNewestDogs", newObject);
              });
            }
          });
      } else if (type === "cat") {
        Firebase.firestore()
          .collection("petAds")
          .where("adopted", "==", false)
          .where("type", "==", type)
          .orderBy("created", "desc")
          .limit(limit)
          .get()
          .then(querySnapshot => {
            if (querySnapshot.docs.length > 0) {
              querySnapshot.forEach(doc => {
                let created = moment.unix(doc.data().created.seconds).fromNow();
                let newObject = {
                  // TODO: parse all object here
                  name: doc.data().name,
                  created: created,
                  type: doc.data().type
                };
                commit("saveNewestCats", newObject);
              });
            }
          });
      }
    }
  },
  serverChange: {
    convertTimestamps: {
      created: "%convertTimestamp%"
    }
  }
};

export default petAds;
