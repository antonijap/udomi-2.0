<template>
    <div class="flex">
        <form class="w-full max-w-lg mb-8 mr-12">
            <!----------------------------------->
            <!--             T Y P E           -->
            <!----------------------------------->

            <div class="mt-8">
                <label
                    for="new-pet-type"
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                >
                    Vrsta zivotinje
                </label>

                <div class="block relative">
                    <select
                        id="new-pet-type"
                        v-model="newPet.type"
                        class="block appearance-none w-full bg-gray-200 border hover:border-gray-500 py-3 px-4 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="dog">pas</option>
                        <option value="cat">cica</option>
                        <option value="rodent">glodjo</option>
                        <option value="bird">brb</option>
                        <option value="other">ostale bibe</option>
                    </select>

                    <!-- arrow -->
                    <div
                        class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
                    >
                        <svg
                            class="fill-current h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                        >
                            <path
                                d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                            />
                        </svg>
                    </div>
                </div>
            </div>

            <!----------------------------------->
            <!--             N A M E           -->
            <!----------------------------------->

            <div class="mt-8">
                <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="new-pet-name"
                >
                    Ime
                </label>

                <input
                    id="new-pet-name"
                    v-model="newPet.name"
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border hover:border-gray-500
            rounded py-3 px-4 mb-3 leading-tight focus:outline-none
            focus:bg-white"
                    :class="{ 'border-red-500': newPet.name === '' }"
                    type="text"
                    placeholder="Floki"
                />

                <small
                    v-show="newPet.name === ''"
                    class="text-red-500 text-xs italic"
                >
                    Please fill out this field.
                </small>
            </div>

            <!----------------------------------->
            <!--             S E X             -->
            <!----------------------------------->

            <div class="mt-8">
                <p
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                >
                    Spol
                </p>

                <div class="w-full">
                    <label
                        class="inline-block tracking-wide w-1/4 text-gray-700 text-x mb-2 mr-8"
                        for="new-pet-sex-f"
                    >
                        <input
                            id="new-pet-sex-f"
                            v-model="newPet.sex"
                            type="radio"
                            name="sex"
                            value="f"
                        />

                        <span class="ml-2">Zensko</span>
                    </label>

                    <label
                        class="inline-block tracking-wide w-1/4 text-gray-700 text-x mb-2"
                        for="new-pet-sex-m"
                    >
                        <input
                            id="new-pet-sex-m"
                            v-model="newPet.sex"
                            type="radio"
                            name="sex"
                            value="m"
                        />

                        <span class="ml-2">Musko</span>
                    </label>
                </div>
            </div>

            <!----------------------------------->
            <!--             S I Z E           -->
            <!----------------------------------->

            <div
                v-if="newPet.type !== '' && newPet.type === 'dog'"
                class="mt-8"
            >
                <p
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                >
                    Velicina
                </p>

                <div class="w-full">
                    <label
                        class="inline-block tracking-wide w-1/4 text-gray-700 text-x mb-2 mr-8"
                        for="new-pet-size-s"
                    >
                        <input
                            id="new-pet-size-s"
                            v-model="newPet.size"
                            type="radio"
                            name="size"
                            value="s"
                        />

                        <span class="ml-2">Mali</span>
                    </label>

                    <label
                        class="inline-block tracking-wide w-1/4 text-gray-700 text-x mb-2"
                        for="new-pet-size-m"
                    >
                        <input
                            id="new-pet-size-m"
                            v-model="newPet.size"
                            type="radio"
                            name="size"
                            value="m"
                        />

                        <span class="ml-2">Srednji</span>
                    </label>

                    <label
                        class="inline-block tracking-wide w-1/4 text-gray-700 text-x mb-2"
                        for="new-pet-size-l"
                    >
                        <input
                            id="new-pet-size-l"
                            v-model="newPet.size"
                            type="radio"
                            name="size"
                            value="l"
                        />

                        <span class="ml-2">Veliki</span>
                    </label>
                </div>
            </div>

            <!----------------------------------->
            <!--             A G E             -->
            <!----------------------------------->

            <div class="mt-8">
                <p
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                >
                    Starost
                </p>

                <div class="w-full">
                    <label
                        class="inline-block tracking-wide w-1/4 text-gray-700 text-x mb-2 mr-8"
                        for="new-pet-age-j"
                    >
                        <input
                            id="new-pet-age-j"
                            v-model="newPet.age"
                            type="radio"
                            value="j"
                            name="age"
                        />

                        <span class="ml-2">Junior</span>
                    </label>

                    <label
                        class="inline-block tracking-wide w-1/4 text-gray-700 text-x mb-2 mr-8"
                        for="new-pet-age-a"
                    >
                        <input
                            id="new-pet-age-a"
                            v-model="newPet.age"
                            type="radio"
                            value="a"
                            name="age"
                        />

                        <span class="ml-2">Adult</span>
                    </label>

                    <label
                        class="inline-block tracking-wide w-1/4 text-gray-700 text-x mb-2"
                        for="new-pet-age-s"
                    >
                        <input
                            id="new-pet-age-s"
                            v-model="newPet.age"
                            type="radio"
                            value="s"
                            name="age"
                        />

                        <span class="ml-2">Senior</span>
                    </label>
                </div>
            </div>

            <!----------------------------------->
            <!--     D E S C R I P T I O N     -->
            <!----------------------------------->

            <div class="mt-8">
                <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="new-pet-description"
                >
                    Opis
                </label>

                <textarea
                    id="new-pet-description"
                    v-model="newPet.description"
                    rows="15"
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border
            hover:border-gray-500 rounded py-3 px-4 mb-3 leading-tight
            focus:outline-none focus:bg-white"
                    :class="{ 'border-red-500': newPet.description === '' }"
                />
                <small
                    v-show="newPet.description === ''"
                    class="text-red-500 text-xs italic"
                >
                    Please fill
                </small>
            </div>

            <!----------------------------------->
            <!--   I M P O R T A N T   I N F O -->
            <!----------------------------------->

            <div class="mt-8">
                <p
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                >
                    Vazne info
                </p>

                <div class="flex">
                    <!--   S T E R I L I Z E D -->
                    <label
                        class="inline-block tracking-wide w-1/4 text-gray-700 text-x mb-2"
                        for="new-pet-info-nutered"
                    >
                        <input
                            id="new-pet-info-nutered"
                            v-model="newPet.nutered"
                            type="checkbox"
                            value="nutered"
                            name="info"
                        />

                        <span v-if="newPet.sex === 'f'" class="ml-2">
                            Sterilizirana
                        </span>

                        <span v-else class="ml-2">Kastriran</span>
                    </label>

                    <!--   C H I P P E D -->
                    <label
                        class="inline-block tracking-wide w-1/4 text-gray-700 text-x mb-2"
                        for="new-pet-info-chip"
                    >
                        <input
                            id="new-pet-info-chip"
                            v-model="newPet.info"
                            type="checkbox"
                            value="chipped"
                            name="info"
                        />

                        <span class="ml-2">Cipiran/a</span>
                    </label>
                </div>
            </div>

            <!----------------------------------->
            <!--       V A C C I N E S         -->
            <!----------------------------------->

            <div class="mt-8">
                <p
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                >
                    Cjepiva (opcionalno)
                </p>

                <div>
                    <label
                        class="block tracking-wide text-gray-700 text-x mb-2"
                        for="new-pet-vaccine"
                    ></label>

                    <input
                        id="new-pet-vaccine"
                        v-model="newPet.vaccine"
                        type="text"
                        class="appearance-none block w-full bg-gray-200 text-gray-700 border hover:border-gray-500
            rounded py-3 px-4 mb-3 leading-tight focus:outline-none
            focus:bg-white"
                    />
                </div>
            </div>

            <!----------------------------------->
            <!--       F R I E N D L Y         -->
            <!----------------------------------->

            <div class="mt-8">
                <p
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                >
                    Karakter
                </p>

                <div class="flex">
                    <label
                        class="inline-block tracking-wide text-gray-700 text-x mb-2 mr-8"
                        for="new-pet-character-cats"
                    >
                        <input
                            id="new-pet-character-cats"
                            v-model="newPet.character"
                            type="checkbox"
                            value="cats"
                        />

                        <span class="ml-2">Dobra s macama</span>
                    </label>

                    <label
                        class="inline-block tracking-wide text-gray-700 text-x mb-2 mr-8"
                        for="new-pet-character-dogs"
                    >
                        <input
                            id="new-pet-character-dogs"
                            v-model="newPet.character"
                            type="checkbox"
                            value="dogs"
                        />

                        <span class="ml-2">Dobra s psima</span>
                    </label>

                    <label
                        class="inline-block tracking-wide text-gray-700 text-x mb-2"
                        for="new-pet-character-children"
                    >
                        <input
                            id="new-pet-character-children"
                            v-model="newPet.character"
                            type="checkbox"
                            value="children"
                        />

                        <span class="ml-2">Dobra s djecom</span>
                    </label>
                </div>
            </div>

            <!----------------------------------->
            <!--       L O C A T I O N         -->
            <!----------------------------------->

            <div class="mt-8 flex">
                <div class="mr-8 w-1/2">
                    <label
                        for="new-pet-city"
                        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    >
                        Grad
                    </label>

                    <div class="block relative">
                        <select
                            id="new-pet-city"
                            v-model="newPet.city"
                            class="block appearance-none w-full bg-gray-200 border hover:border-gray-500 py-3 px-4 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                        >
                            <option>Zabreg</option>
                            <option>Jesenje</option>
                            <option>Bodul</option>
                            <option>Straznjicki put</option>
                        </select>

                        <!-- arrow -->
                        <div
                            class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
                        >
                            <svg
                                class="fill-current h-4 w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                                />
                            </svg>
                        </div>
                    </div>
                </div>

                <div class="w-1/2">
                    <label
                        for="new-pet-country"
                        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    >
                        Drzava
                    </label>

                    <div class="block relative">
                        <select
                            id="new-pet-country"
                            v-model="newPet.country"
                            class="block appearance-none w-full bg-gray-200 border hover:border-gray-500 py-3 px-4 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                        >
                            <option>Rvacka</option>
                            <option>Srbija</option>
                            <option>BiH</option>
                        </select>

                        <!-- arrow -->
                        <div
                            class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
                        >
                            <svg
                                class="fill-current h-4 w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </form>

        <div class="border px-8">
            <ul>
                <li v-for="(value, key) in newPet" :key="key">
                    {{ key }}: {{ value }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: "NewPetAdForm",
    data() {
        return {
            newPet: {
                name: "",
                sex: "f",
                age: "a",
                type: "dog",
                description: "",
                character: [],
                city: "Jesenje",
                country: "Rvacka",
            },
        }
    },
}
</script>
