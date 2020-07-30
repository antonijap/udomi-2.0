<template>
    <div id="app">
        <main-navbar
            :authenticated="authenticated"
            :user="user"
            @login="login"
            @logout="logout"
        />
        <router-view :key="$route.path" />
    </div>
</template>

<script>
import { mapGetters, mapState } from "vuex"
import MainNavbar from "./components/MainNavbar"
export default {
    name: "App",
    components: {
        MainNavbar,
    },
    computed: {
        ...mapState({
            user: state => state.users.user,
        }),
        ...mapGetters({
            authenticated: "users/authenticated",
        }),
        firstName() {
            if (this.user.displayName) {
                return this.user.displayName.split(" ")[0]
            }
            return null
        },
    },
    created() {
        // this.$store.dispatch("petAds/fetchAds", 5);
        this.$store.dispatch("petAds/fetchNewest", ["petAd", "dog", 10])
        this.$store.dispatch("petAds/fetchNewest", ["petAd", "cat", 10])
    },
    methods: {
        login() {
            this.$store.dispatch("users/googleLogin")
        },
        logout() {
            this.$store.dispatch("users/googleLogout")
        },
    },
}
</script>
