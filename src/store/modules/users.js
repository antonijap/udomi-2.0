import { Firebase } from "../../config/firebase";
import moment from "moment";
moment.locale("hr");

const users = {
  firestorePath: "users",
  firestoreRefType: "collection",
  moduleName: "users",
  statePropName: "data",
  namespaced: true,
  state: {
    user: null
  },
  getters: {
    authenticated(state) {
      let authenticated = false;
      let user = state.user;
      if (user !== null && user !== false && user !== "") {
        authenticated = true;
      }
      return authenticated;
    }
  },
  mutations: {
    SAVE_USER(state, payload) {
      state.user = payload;
    },
    REMOVE_USER(state) {
      state.user = null;
    }
  },
  actions: {
    // fetchUser(payload) {
    //   // User fetched, data in payload
    // },
    googleLogin({ commit }) {
      Firebase.auth()
        .signInWithPopup(new Firebase.auth.GoogleAuthProvider())
        .then(result => {
          const db = Firebase.firestore();
          // 1 - Check if email exists in database
          db.collection("users")
            .where("email", "==", result.user.email)
            .get()
            .then(function(querySnapshot) {
              if (querySnapshot.docs.length === 0) {
                // 2 - Write new document
                db.collection("users")
                  .add({
                    name: result.user.displayName,
                    email: result.user.email,
                    created: new Date(),
                    modified: new Date()
                  })
                  .then(() => {
                    console.log("Document successfully written!");
                  })
                  .catch(error => {
                    console.error("Error writing document: ", error);
                  });

                commit("SAVE_USER", result.user);
              }
            })
            .catch(function(error) {
              console.log("Error getting documents: ", error);
            });
        })

        .catch(function(error) {
          const errorCode = error.code;
          const errorMessage = error.message;
          const email = error.email;
          const credential = error.credential;
          console.log(errorCode, errorMessage, email, credential);
        });
    },
    googleLogout({ commit }) {
      Firebase.auth()
        .signOut()
        .then(() => {
          commit("REMOVE_USER");
        })
        .catch(function(error) {
          console.error(error);
        });
    }
  },
  serverChange: {
    convertTimestamps: {
      created: "%convertTimestamp%"
    }
  }
};

export default users;
