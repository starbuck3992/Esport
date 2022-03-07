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

        <form @submit.prevent="saveScore" class="mt-2 max-w-4xl m-auto">
                <div class="grid grid-cols-3">
                    <div class="sm:grid sm:grid-cols-2 col-span-1">
                        <div class="col-span-1 m-auto">
                            <p>{{currentMatch.name}}</p>
                        </div>
                        <div class="relative flex">
                            <div class="w-2 h-36 bg-[#107df8] col-span-1 skew-x-30 overflow-hidden mr-1 inline-flex"></div>
                            <div class="w-28 h-36 bg-[#107df8] col-span-1 skew-x-30 overflow-hidden inline-flex">
                                <img class="z-5 -skew-x-20 absolute w-96 h-44 -top-3 scale-150" src="https://odindesignthemes.com/pixel-diamond/img/teams/logos/01.png">
                            </div>
                        </div>
                        <!-- <label for="name" class="text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 inline-block text-center">{{currentMatch.name}}</label> -->
                    </div>

                    <div class="col-span-1 m-auto flex px-6">
                        <input v-model="form.scoreHome" type="text" name="name" id="name" class="max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md inline-flex text-center" required/>
                        <span class="px-5 my-auto font-extrabold">-</span>
                        <input v-model="form.scoreGuest" type="text" name="name" id="surname" class="max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md inline-flex text-center" required/>
                    </div>

                    <div class="sm:grid sm:grid-cols-2 col-span-1">
                        <div class="relative flex">
                            <div class="w-2 h-36 bg-orange-600 col-span-1 -skew-x-30 overflow-hidden mr-1 inline-flex ml-5"></div>
                            <div class="w-28 h-36 bg-orange-600 col-span-1 -skew-x-30 overflow-hidden inline-flex">
                                <img class="z-5 skew-x-20 absolute w-96 h-44 -top-3 scale-150" src="https://odindesignthemes.com/pixel-diamond/img/teams/logos/01.png">
                            </div>
                        </div>
                        <div class="col-span-1 m-auto">
                            <p>{{currentMatch.surname}}</p>
                        </div>
                       <!-- <label for="name" class="text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 inline-block text-center">{{currentMatch.surname}}</label> -->
                    </div>
                </div>
                <div class="mt-10">
                    <div class="flex justify-center">
                        <button @click="register" type="submit" class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Zapiš výsledek</button>
                    </div>
                </div>
        </form>
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
