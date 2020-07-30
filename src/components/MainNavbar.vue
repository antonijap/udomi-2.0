<template>
    <nav class="flex justify-between flex-wrap bg-white-500 p-6">
        <div class="flex flex-auto text-gray-900 mr-6">
            <router-link to="/" class="font-semibold text-xl tracking-tight">
                Udomi
            </router-link>
        </div>

        <div class="flex items-center w-auto flex-initial">
            <button
                v-if="authenticated === false"
                class="bg-blue-100 text-blue-500 py-2 px-4 mr-4 rounded hover:bg-blue-100"
                @click="$emit('login')"
            >
                Ulogiraj se
            </button>

            <router-link
                v-if="authenticated === true"
                class="bg-blue-100 text-blue-500 py-2 px-4 mr-4 rounded hover:bg-blue-200"
                to="/newad"
            >
                Objavi oglas
            </router-link>

            <router-link
                v-if="authenticated === true"
                to="/"
                class="bg-blue-100 text-blue-500 py-2 px-4 mr-4 rounded inline-block flex hover:bg-blue-100"
                @mouseover.native="dropdownVisible = true"
            >
                <span>{{ firstName }}</span>
                <feather type="chevron-down" />

                <!--Dropdown-->
                <div
                    v-if="dropdownVisible"
                    class="block bg-white rounded-lg py-2 w-48 shadow-xl mt-8 -ml-4 absolute"
                    @mouseleave="dropdownVisible = !dropdownVisible"
                >
                    <router-link
                        v-if="authenticated"
                        to="/dashboard"
                        class="text-gray-900 hover:bg-indigo-100 block px-4 py-2"
                    >
                        Moji oglasi
                    </router-link>

                    <button
                        v-if="authenticated === true"
                        class="text-gray-900 hover:bg-indigo-100 w-full text-left px-4 py-2"
                        @click="$emit('logout')"
                    >
                        Izlogiraj se
                    </button>
                </div>
            </router-link>

            <router-link
                to="/about"
                class="block mt-4 lg:inline-block lg:mt-0 mr-4"
            >
                O Udomi.hr
            </router-link>
        </div>
    </nav>
</template>

<script>
export default {
    name: "MainNavbar",
    props: {
        user: {
            type: Object,
            default: null,
        },
        authenticated: Boolean,
    },
    data() {
        return {
            dropdownVisible: false,
        }
    },
    computed: {
        firstName() {
            if (this.user && this.user.displayName) {
                return this.user.displayName.split(" ")[0]
            }
            return null
        },
    },
}
</script>
