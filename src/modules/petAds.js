const petAds = {
  firestorePath: "petAds",
  firestoreRefType: "collection", // or 'doc'
  moduleName: "petAds",
  statePropName: "data",
  namespaced: true, // automatically added

  // this object is your store module (will be added as '/petAds')
  // you can also add state/getters/mutations/actions
  state: {
    petAds
  },
  getters: {
    paginatedPetAds: state => {
      return state.petAds;
    }
  },
  mutations: {
    savePetAd: () => {}
  },
  actions: {
    fetchPetAds: () => {}
  }
};

export default petAds;
