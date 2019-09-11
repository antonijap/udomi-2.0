<template>
  <div>
    <div v-show="!getPaginationLoading">
      <h1>Current</h1>
      <div v-for="(ad, index) in getCurrentAds" :key="index + '-a'">
        {{ ad.name }} - {{ ad.created }}
      </div>
      <button @click="getads">Get +5</button>
    </div>
    <font-awesome-icon
      v-show="getPaginationLoading"
      :icon="['fal', 'spinner']"
      size="lg"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// import { Firebase, initFirebase } from "../config/firebase.js";

// let doc = [
//   {
//     index: 0,
//     name: "Brandie",
//     adopted: true,
//     picture: "http://placehold.it/32x32",
//     age: 11,
//     type: "dog",
//     created: "Sunday, April 7, 2019 4:59 PM"
//   },
//   {
//     index: 1,
//     name: "Cleo",
//     adopted: false,
//     picture: "http://placehold.it/32x32",
//     age: 4,
//     type: "dog",
//     created: "Wednesday, March 30, 2016 2:14 PM"
//   },
//   {
//     index: 2,
//     name: "Frankie",
//     adopted: true,
//     picture: "http://placehold.it/32x32",
//     age: 0,
//     type: "dog",
//     created: "Friday, January 15, 2016 1:17 PM"
//   },
//   {
//     index: 3,
//     name: "Luann",
//     adopted: false,
//     picture: "http://placehold.it/32x32",
//     age: 12,
//     type: "dog",
//     created: "Thursday, December 24, 2015 10:01 AM"
//   },
//   {
//     index: 4,
//     name: "Pace",
//     adopted: false,
//     picture: "http://placehold.it/32x32",
//     age: 2,
//     type: "other",
//     created: "Friday, June 24, 2016 12:09 AM"
//   },
//   {
//     index: 5,
//     name: "Holland",
//     adopted: true,
//     picture: "http://placehold.it/32x32",
//     age: 14,
//     type: "cat",
//     created: "Sunday, February 22, 2015 5:19 PM"
//   },
//   {
//     index: 6,
//     name: "Roman",
//     adopted: true,
//     picture: "http://placehold.it/32x32",
//     age: 13,
//     type: "other",
//     created: "Wednesday, April 12, 2017 2:53 AM"
//   },
//   {
//     index: 7,
//     name: "Beach",
//     adopted: false,
//     picture: "http://placehold.it/32x32",
//     age: 14,
//     type: "cat",
//     created: "Monday, June 22, 2015 5:01 AM"
//   },
//   {
//     index: 8,
//     name: "Wilder",
//     adopted: false,
//     picture: "http://placehold.it/32x32",
//     age: 4,
//     type: "other",
//     created: "Thursday, December 28, 2017 5:29 PM"
//   },
//   {
//     index: 9,
//     name: "Cleveland",
//     adopted: true,
//     picture: "http://placehold.it/32x32",
//     age: 6,
//     type: "dog",
//     created: "Monday, March 31, 2014 1:20 AM"
//   },
//   {
//     index: 10,
//     name: "Barrera",
//     adopted: true,
//     picture: "http://placehold.it/32x32",
//     age: 5,
//     type: "cat",
//     created: "Saturday, March 9, 2019 3:12 PM"
//   },
//   {
//     index: 11,
//     name: "Gladys",
//     adopted: true,
//     picture: "http://placehold.it/32x32",
//     age: 1,
//     type: "dog",
//     created: "Tuesday, December 12, 2017 7:30 PM"
//   },
//   {
//     index: 12,
//     name: "Sheena",
//     adopted: false,
//     picture: "http://placehold.it/32x32",
//     age: 3,
//     type: "cat",
//     created: "Saturday, August 31, 2019 2:12 AM"
//   },
//   {
//     index: 13,
//     name: "Mercedes",
//     adopted: false,
//     picture: "http://placehold.it/32x32",
//     age: 5,
//     type: "dog",
//     created: "Saturday, May 7, 2016 11:50 AM"
//   },
//   {
//     index: 14,
//     name: "Angelina",
//     adopted: false,
//     picture: "http://placehold.it/32x32",
//     age: 6,
//     type: "dog",
//     created: "Monday, August 25, 2014 3:00 PM"
//   },
//   {
//     index: 15,
//     name: "Moran",
//     adopted: true,
//     picture: "http://placehold.it/32x32",
//     age: 8,
//     type: "dog",
//     created: "Saturday, January 14, 2017 9:24 AM"
//   },
//   {
//     index: 16,
//     name: "Leon",
//     adopted: true,
//     picture: "http://placehold.it/32x32",
//     age: 5,
//     type: "other",
//     created: "Saturday, June 28, 2014 4:00 AM"
//   },
//   {
//     index: 17,
//     name: "Casey",
//     adopted: false,
//     picture: "http://placehold.it/32x32",
//     age: 7,
//     type: "other",
//     created: "Saturday, July 27, 2019 2:46 AM"
//   },
//   {
//     index: 18,
//     name: "Chrystal",
//     adopted: false,
//     picture: "http://placehold.it/32x32",
//     age: 2,
//     type: "dog",
//     created: "Tuesday, December 1, 2015 3:25 PM"
//   },
//   {
//     index: 19,
//     name: "Sears",
//     adopted: false,
//     picture: "http://placehold.it/32x32",
//     age: 15,
//     type: "other",
//     created: "Saturday, March 29, 2014 12:46 AM"
//   },
//   {
//     index: 20,
//     name: "Gretchen",
//     adopted: true,
//     picture: "http://placehold.it/32x32",
//     age: 8,
//     type: "cat",
//     created: "Monday, June 16, 2014 5:31 PM"
//   },
//   {
//     index: 21,
//     name: "Black",
//     adopted: true,
//     picture: "http://placehold.it/32x32",
//     age: 10,
//     type: "dog",
//     created: "Sunday, April 12, 2015 6:31 PM"
//   },
//   {
//     index: 22,
//     name: "Elizabeth",
//     adopted: true,
//     picture: "http://placehold.it/32x32",
//     age: 0,
//     type: "dog",
//     created: "Saturday, March 19, 2016 12:02 PM"
//   },
//   {
//     index: 23,
//     name: "Marci",
//     adopted: false,
//     picture: "http://placehold.it/32x32",
//     age: 15,
//     type: "other",
//     created: "Thursday, May 22, 2014 7:55 AM"
//   },
//   {
//     index: 24,
//     name: "Millie",
//     adopted: true,
//     picture: "http://placehold.it/32x32",
//     age: 7,
//     type: "cat",
//     created: "Sunday, June 15, 2014 2:52 AM"
//   },
//   {
//     index: 25,
//     name: "Flossie",
//     adopted: false,
//     picture: "http://placehold.it/32x32",
//     age: 3,
//     type: "dog",
//     created: "Saturday, March 22, 2014 11:24 PM"
//   },
//   {
//     index: 26,
//     name: "Gwendolyn",
//     adopted: true,
//     picture: "http://placehold.it/32x32",
//     age: 8,
//     type: "cat",
//     created: "Sunday, September 17, 2017 2:44 AM"
//   },
//   {
//     index: 27,
//     name: "Deann",
//     adopted: true,
//     picture: "http://placehold.it/32x32",
//     age: 7,
//     type: "dog",
//     created: "Tuesday, November 3, 2015 2:26 AM"
//   },
//   {
//     index: 28,
//     name: "Maddox",
//     adopted: false,
//     picture: "http://placehold.it/32x32",
//     age: 6,
//     type: "other",
//     created: "Thursday, January 3, 2019 4:02 AM"
//   },
//   {
//     index: 29,
//     name: "Essie",
//     adopted: false,
//     picture: "http://placehold.it/32x32",
//     age: 13,
//     type: "cat",
//     created: "Monday, December 12, 2016 5:45 PM"
//   }
// ];
export default {
  name: "home",
  components: {},
  computed: {
    ...mapGetters("petAds", ["getPaginationLoading", "getCurrentAds"])
  },
  created() {
    this.$store.dispatch("petAds/fetchAds", 5);
    // setTimeout(() => {
    //   this.$store.dispatch("petAds/fetchAds", 5);
    //   setTimeout(() => {
    //     this.$store.dispatch("petAds/fetchAds", 5);
    //   }, 3000);
    // }, 3000);
  },
  methods: {
    getads() {
      this.$store.dispatch("petAds/fetchAds", 5);
    }
  }
};
</script>
