<template>
    <div class="container mx-auto">
        <h1 class="text-gray-900 text-xl mb-10">Novi oglas</h1>
        <div class="w-full max-w-lg">
            <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
                type="button"
                @click.prevent="adType = '01'"
            >
                Ljubimac
            </button>

            <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
                type="button"
                @click.prevent="adType = '02'"
            >
                Stan
            </button>

            <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                type="button"
                @click.prevent="adType = '03'"
            >
                Other
            </button>
        </div>

        <transition name="fade">
            <new-pet-ad-form v-if="adType === '01'" key="01"> </new-pet-ad-form>
            <div v-else-if="adType === '02'">lhoho</div>
            <div v-else-if="adType === '03'">lhogiygho</div>
        </transition>
    </div>
</template>

<script>
import NewPetAdForm from "../components/NewPetAdForm"
export default {
    name: "NewAd",
    components: {
        NewPetAdForm,
    },
    data() {
        return {
            adType: "",
        }
    },
}
</script>

<style scoped lang="scss">
.fade-enter-active {
    transition: all 0.5s linear;
}
.fade-leave-active {
    transition: all 0.5s ease;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
