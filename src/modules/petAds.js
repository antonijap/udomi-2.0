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
      newestCats: []
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
          .where("adopted", "==", false)
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
            let created = moment(doc.data().created).fromNow();
            let newObject = {
              name: doc.data().name,
              created: created,
              id: doc.data().id,
              animalType: doc.data().animalType,
              adType: doc.data().adType,
              vaccinated: doc.data().vaccinated,
              adopted: doc.data().adopted,
              hidden: doc.data().hidden,
              description: doc.data().description,
              owner: doc.data().owner,
              sex: doc.data().sex,
              age: doc.data().age,
              chipped: doc.data().chipped,
              invalidity: doc.data().invalidity,
              sterilized: doc.data().sterilization,
              castrated: doc.data().castrated,
              images: doc.data().images,
              friendlyWithCats: doc.data().friendlyWithCats,
              friendlyWithDogs: doc.data().friendlyWithDogs,
              friendlyWithChildren: doc.data().friendlyWithChildren
            };
            commit("saveCurrentAds", newObject);
          });
        } else {
          console.log("Nema vise");
        }
      });
    },
    fetchNewest({ commit }, [adType, animalType, limit]) {
      if (adType === "petAd") {
        Firebase.firestore()
          .collection("petAds")
          .where("adopted", "==", false)
          .where("animalType", "==", animalType)
          .orderBy("created", "desc")
          .limit(limit)
          .get()
          .then(querySnapshot => {
            if (querySnapshot.docs.length > 0) {
              querySnapshot.forEach(doc => {
                if (animalType == "dog") {
                  commit("saveNewestDogs", doc.data());
                }
                if (animalType == "cat") {
                  commit("saveNewestCats", doc.data());
                }
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
