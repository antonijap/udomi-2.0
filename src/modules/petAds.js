import { Firebase } from "../config/firebase.js";
import moment from "moment";

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
    }
  },
  mutations: {
    saveCurrentAds(state, payload) {
      console.log(payload, "sejvam u store");
      state.pagination.currentAds.push(payload);
      state.pagination.loading = false;
    },
    saveLastAdForPagination(state, payload) {
      state.pagination.lastVisible = payload;
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
          .where("adopted", "==", true)
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
            let created = moment
              .unix(doc.data().created.seconds)
              .format("YYYY/MM/DD");
            let newObject = {
              // TODO: parse all object here
              name: doc.data().name,
              created: created
            };
            commit("saveCurrentAds", newObject);
          });
        } else {
          console.log("Nema vise");
        }
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
