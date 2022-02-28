<template>
    <div>
        <div>{{ tournament.name }}</div>
        <div>{{ tournament.platform }}</div>
        <div>{{ tournament.game }}</div>
        <div>{{ tournament.information }}</div>
        <div>{{ tournament.tournamentType.name }}</div>
        <div>{{ tournament.tournamentType.maxPlayers }}</div>
        <div>{{ tournament.tournamentStatus.name }}</div>
        <div>{{ tournament.fee }}</div>
        <div>{{ tournament.currency.code }}</div>
        <div>{{ tournament.scheduleStart }}</div>
        <div>{{ tournament.scheduleEnd }}</div>
        <div>{{ tournament.registeredCount }}</div>

        <div>Zaregistrovaní hráči</div>
        <div v-for="tournamentMatch in tournament.tournamentMatches" :key="tournamentMatch.id">
            <div v-if="tournamentMatch.userHome">
            <div>{{tournamentMatch.userHome.nick}}</div>
            <div>{{tournamentMatch.userHome.avatar}}</div>
            <div>{{tournamentMatch.userHome.xboxProfile}}</div>
            <div>{{tournamentMatch.userHome.playstationProfile}}</div>
            </div>
            <br>
            <div v-if="tournamentMatch.userGuest">
            <div>{{tournamentMatch.userGuest.nick}}</div>
            <div>{{tournamentMatch.userGuest.avatar}}</div>
            <div>{{tournamentMatch.userGuest.xboxProfile}}</div>
            <div>{{tournamentMatch.userGuest.playstationProfile}}</div>
            </div>
            <div>{{tournamentMatch.scoreHome}}</div>
            <div>{{tournamentMatch.scoreGuest}}</div>
            <div>{{tournamentMatch.bracketPosition}}</div>
        </div>

        <button @click="register" type="button">
            Registruj se do turnaje
        </button>

        <form @submit.prevent="saveScore" class="space-y-8 divide-y divide-gray-200">
                    <div class="space-y-6 sm:space-y-5">
                        <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label for="name" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">{{currentMatch.name}}</label>
                            <div class="mt-1 sm:mt-0 sm:col-span-2">
                                <input v-model="form.scoreHome" type="text" name="name" id="name" class="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" required/>
                            </div>
                        </div>

                        <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label for="name" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">{{currentMatch.surname}}</label>
                            <div class="mt-1 sm:mt-0 sm:col-span-2">
                                <input v-model="form.scoreGuest" type="text" name="name" id="surname" class="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" required/>
                            </div>
                        </div>
                    </div>
            <div class="pt-5">
                <div class="flex justify-end">
                    <button type="submit" class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Vytvořit</button>
                </div>
            </div>
        </form>

        <button @click="register" type="button">
            Zapiš výsledek
        </button>
    </div>
</template>

<script>
import {computed, onMounted, reactive} from "vue";
import {useStore} from "vuex";
import {useRouter, useRoute} from "vue-router";
import Api from "../../../services/api";
import Form from "../../../utilities/form";

export default {
    setup() {
        const store = useStore();
        const route = useRoute();
        const router = useRouter();

        const form =
            reactive(new Form({
                scoreHome: 0,
                scoreGuest: 0
            }))

        const tournament = reactive({
            'name': null,
            'platform': null,
            'game': null,
            'information': null,
            'tournamentType': {
                'name': null,
                'maxPlayers': null
            },
            'tournamentStatus': {
                'name': null,
            },
            'fee': null,
            'currency': {
                'code': null,
            },
            'scheduleStart': null,
            'scheduleEnd': null,
            'registeredCount': 0,
            'tournamentMatches': [{
                userHome: {
                    nick: null,
                    avatar: null,
                    playstationProfile: null,
                    xboxProfile: null
                },
                userGuest: {
                    nick: null,
                    avatar: null,
                    playstationProfile: null,
                    xboxProfile: null
                },
                bracketPosition: null,
                scoreHome: null,
                scoreGuest: null

            }]
        })

        const currentMatch = computed(() => {
            return {name: 'test', surname: 'test2'};
            }
        )

        onMounted(() => {
                Api.get(`/api/tournaments/${route.params.slug}`).then((response) => {
                    Object.assign(tournament, response.data)
                }).catch((error) => {
                    if (error.response) {
                        store.dispatch('messagesModule/showException', error.response.data.message)
                    } else {
                        console.log(error);
                    }
                })
            //LISTENER
            }
        )

        function register() {
            Api.post('/api/tournaments/register',
                {'slug': route.params.slug}
            ).then((response) => {
                store.dispatch('messagesModule/showSuccess', response.data.message)
            }).catch((error) => {
                if (error.response) {
                   store.dispatch('messagesModule/showException', error.response.data.message)
                } else {
                    console.log(error);
                }
            })
        }

        function saveScore() {
            console.log(1)
        }

        return {
            form,
            tournament,
            currentMatch,
            register,
            saveScore
        }
    },
}
</script>
