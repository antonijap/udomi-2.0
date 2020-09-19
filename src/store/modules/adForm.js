import { Firebase } from "../../config/firebase"
import moment from "moment"
moment.locale("hr")

const adForm = {
    firestorePath: "ads",
    firestoreRefType: "collection",
    moduleName: "adForm",
    statePropName: "data",
    namespaced: true,
    state: {},
    getters: {
        // Fetch ad, if doesn't exist return error
        getAd: state => {},
    },
    mutations: {
        saveAd(state, payload) {
            state.newAd.push(payload)
        },
    },
    actions: {
        // Fetch ad, if doesn't exist return error
        // Fetch user id, check if user has this ad
        fetchAd({ commit, state }) {
            query = Firebase.firestore()
                .collection("ads")
                .where("hidden", "==", false)
                .orderBy("created", "desc")
                .get()
            query.then(querySnapshot => {})
        },
    },
    serverChange: {
        convertTimestamps: {
            created: "%convertTimestamp%",
        },
    },
}

export default adForm
