<template>
    <form @submit.prevent="submit" class="space-y-8 divide-y divide-gray-200">
        <div class="space-y-8 divide-y divide-gray-200 sm:space-y-5">
            <div class="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
                <div>
                    <h3 class="text-lg leading-6 font-medium text-gray-900">Turnaj</h3>
                    <p class="mt-1 max-w-2xl text-sm text-gray-500">Zde vytvoříte turnaj</p>
                </div>
                <div class="space-y-6 sm:space-y-5">
                    <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                        <label for="name" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">Název</label>
                        <div class="mt-1 sm:mt-0 sm:col-span-2">
                            <input v-model="form.name" type="text" name="name" id="name" autocomplete="given-name" class="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" required/>
                        </div>
                        <div class="mt-1 text-sm text-red-600" id="name-error"
                             v-if="form.errors.has('name')"
                             v-text="form.errors.get('name')"></div>
                    </div>

                    <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                        <label for="information" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">Informace o turnaji</label>
                        <div class="mt-1 sm:mt-0 sm:col-span-2">
                            <textarea required v-model="form.information" id="information" name="information" rows="3" class="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md" />
                        </div>
                        <div class="mt-1 text-sm text-red-600" id="information-error"
                             v-if="form.errors.has('information')"
                             v-text="form.errors.get('information')"></div>
                    </div>

                    <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                        <label for="platform" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"> Platforma </label>
                        <div class="mt-1 sm:mt-0 sm:col-span-2">
                            <select required v-model="form.platform" id="platform" name="platform" class="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md">
                                <option v-for="platform in platforms" :key="platform.id" :value="platform.id">{{platform.name}}</option>
                            </select>
                        </div>
                        <div class="mt-1 text-sm text-red-600" id="platform-error"
                             v-if="form.errors.has('platform')"
                             v-text="form.errors.get('platform')"></div>
                    </div>

                    <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                        <label for="game" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"> Hra </label>
                        <div class="mt-1 sm:mt-0 sm:col-span-2">
                            <select required v-model="form.game" id="game" name="game" class="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md">
                                <option v-for="game in games" :key="game.id" :value="game.id">{{game.name}}</option>
                            </select>
                        </div>
                        <div class="mt-1 text-sm text-red-600" id="game-error"
                             v-if="form.errors.has('game')"
                             v-text="form.errors.get('game')"></div>
                    </div>

                    <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                        <label for="game" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"> Typ turnaje </label>
                        <div class="mt-1 sm:mt-0 sm:col-span-2">
                            <select required v-model="form.tournamentType" id="type" name="type" class="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md">
                                <option v-for="tournamentType in tournamentTypes" :key="tournamentType.id" :value="tournamentType.id" @change="console.log(tournamentType.maxPlayers)">{{tournamentType.name}} - {{tournamentType.maxPlayers}} hráčů</option>
                            </select>
                        </div>
                        <div class="mt-1 text-sm text-red-600" id="type-error"
                             v-if="form.errors.has('tournamentType')"
                             v-text="form.errors.get('tournamentType')"></div>
                    </div>

                    <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                        <label for="fee" class="block text-sm font-medium text-gray-700">Vstupné</label>
                        <div class="mt-1 relative rounded-md shadow-sm">
                            <input required v-model="form.fee" type="number" name="fee" id="fee" class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"/>
                            <div class="absolute inset-y-0 right-0 flex items-center">
                                <label for="currency" class="sr-only">Currency</label>
                                <select required v-model="form.currency" id="currency" name="currency" class="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md">
                                    <option v-for="currency in currencies" :key="currency.id" :value="currency.id">{{currency.code}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="mt-1 text-sm text-red-600" id="fee-error"
                             v-if="form.errors.has('fee')"
                             v-text="form.errors.get('fee')"></div>
                        <div class="mt-1 text-sm text-red-600" id="currency-error"
                             v-if="form.errors.has('currency')"
                             v-text="form.errors.get('currency')"></div>
                    </div>

                    <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                        <label for="schedule-start" class="block text-sm font-medium text-gray-700">Začátek turnaje</label>
                        <div class="mt-1">
                            <input v-model="form.scheduleStart" required type="datetime-local" name="schedule-start" id="schedule-start" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="you@example.com" />
                        </div>
                        <div class="mt-1 text-sm text-red-600" id="schedule-start-error"
                             v-if="form.errors.has('scheduleStart')"
                             v-text="form.errors.get('scheduleStart')"></div>
                    </div>

                </div>
            </div>

        </div>

        <div class="pt-5">
            <div class="flex justify-end">
                <button type="submit" class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Vytvořit</button>
            </div>
        </div>
    </form>
</template>

<script>
import {ref, onMounted, reactive} from "vue";
import {useStore} from "vuex";
import Api from "../../../services/api";
import Form from "../../../utilities/form";

export default {
    setup(){
        const store = useStore();

        const platforms = ref([]);
        const games = ref([]);
        const tournamentTypes = ref([]);
        const currencies = ref([]);

        const form =
            reactive(new Form({
                platform: 1,
                game: 1,
                tournamentType: 1,
                maxPlayers: 8,
                currency: 1,
                name: null,
                information: null,
                fee: 0,
                scheduleStart: null
            }));

        onMounted(() => {
            Api.get('/api/admin/tournaments/create').then((response) => {
                console.log(response)
                platforms.value = response.data.platforms;
                games.value = response.data.games;
                tournamentTypes.value = response.data.tournamentTypes;
                currencies.value = response.data.currencies;
            }).catch((error) => {
                if (error.response) {
                    setTimeout(() => store.dispatch('messagesModule/showException', error.response.data.message), 250);
                } else {
                    console.log(error);
                }
            })
            }
        )

        function submit() {
            Api.post('/api/admin/tournaments', form.objectToFormData()).then((response) => {
                setTimeout(() => store.dispatch('messagesModule/showSuccess', response.data.message), 250);
            }).catch((error) => {
                if (error.response) {
                    if (error.response.status === 422) {
                        form.onFail(error.response.data.errors);
                    } else {
                        setTimeout(() => store.dispatch('messagesModule/showException', error.response.data.message), 250);
                    }
                } else {
                    console.log(error);
                }
            })
        }

        return {
            platforms,
            games,
            tournamentTypes,
            currencies,
            form,
            submit
        }
    },
}
</script>
