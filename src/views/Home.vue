<template>
  <pre>{{ getCurrentAds }}</pre>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "home",
  components: {},
  computed: {
    ...mapGetters("petAds", ["getAllAds", "getCurrentAds"])
  },
  created() {
    // this.$store.dispatch("petAds/fetchAllAds");
    this.$store.dispatch("petAds/fetchAds", 5);
    // doc.forEach(function(obj) {
    //     Firebase.firestore().collection("petAds").add({
    //         created: obj.created,
    //         name: obj.name,
    //         adopted: obj.adopted
    //     }).then(function(docRef) {
    //         console.log("Document written with ID: ", docRef.id);
    //     })
    //     .catch(function(error) {
    //         console.error("Error adding document: ", error);
    //     });
    // });
  }
};
</script>
