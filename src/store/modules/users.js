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
      console.log(user);
      if (user !== null && user !== false && user !== "") {
        authenticated = true;
      }
      return authenticated;
    }
  },
  mutations: {
    SAVE_USER(state, payload) {
      state.user = payload;
      sessionStorage.setItem("user", JSON.stringify(payload));
      console.log(
        "%c LOGIN SUCCESFULL ",
        "color: gray; background: #42f598; padding: 5px; font-size: 12px; border-radius: 15px;"
      );
    },
    REMOVE_USER(state) {
      sessionStorage.removeItem("user");
      state.user = null;
      console.log(
        "%c LOGOUT SUCCESFULL ",
        "color: gray; background: #42ddf5; padding: 5px; font-size: 12px; border-radius: 15px;"
      );
    }
  },
  actions: {
    fetchUser(payload) {
      console.log(payload);
    },
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
