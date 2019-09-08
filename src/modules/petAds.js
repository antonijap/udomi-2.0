const petAds = {
  firestorePath: "ads",
  firestoreRefType: "collection", // or 'doc'
  moduleName: "petAds",
  statePropName: "data",
  namespaced: true, // automatically added

  // this object is your store module (will be added as '/petAds')
  // you can also add state/getters/mutations/actions
  state: {},
  getters: {},
  mutations: {
    savePetAd: () => {}
  },
  actions: {
    fetchPetAds: () => {}
  }
};

export default petAds;
