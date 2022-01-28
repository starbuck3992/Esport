<template>
    <form v-if="user" class="divide-y divide-gray-200 lg:col-span-9" action="#" method="POST">
        <!-- Profile section -->
        <div class="py-6 px-4 sm:p-6 lg:pb-8">
            <div>
                <h2 class="text-lg leading-6 font-medium text-gray-900">Tvůj profil</h2>
                <p class="mt-1 text-sm text-gray-500">
                    Nějaký text že to uvidí všichni spoluhráči/protihráči?
                </p>
            </div>

            <div class="mt-6 flex flex-col lg:flex-row">
                <div class="flex-grow space-y-6">
                    <div>
                        <label for="nickname" class="block text-sm font-medium text-gray-700">
                            Uživatelské jméno
                        </label>
                        <div class="mt-1 rounded-md shadow-sm flex">
                            <input type="text" name="nickname" id="nickname" autocomplete="nickname"
                                   class="focus:ring-sky-500 focus:border-sky-500 flex-grow block w-full min-w-0 rounded-md sm:text-sm border-gray-300"
                                   :value="user.nick"/>
                        </div>
                    </div>

                    <div>
                        <label for="about" class="block text-sm font-medium text-gray-700">
                            o mě
                        </label>
                        <div class="mt-1">
                            <textarea id="about" name="about" rows="3"
                                      class="shadow-sm focus:ring-sky-500 focus:border-sky-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"/>
                        </div>
                        <p class="mt-2 text-sm text-gray-500">
                            Řekni nám něco o sobě? Něcooo?
                        </p>
                    </div>
                </div>

                <div class="mt-6 flex-grow lg:mt-0 lg:ml-6 lg:flex-grow-0 lg:flex-shrink-0">
                    <p class="text-sm font-medium text-gray-700" aria-hidden="true">
                        Profilová fotka
                    </p>
                    <div class="mt-1 lg:hidden">
                        <div class="flex items-center">
                            <div class="flex-shrink-0 inline-block rounded-full overflow-hidden h-12 w-12"
                                 aria-hidden="true">
                                <img class="rounded-full h-full w-full" :src="user.avatar" alt=""/>
                            </div>
                            <div class="ml-5 rounded-md shadow-sm">
                                <div
                                    class="group relative border border-gray-300 rounded-md py-2 px-3 flex items-center justify-center hover:bg-gray-50 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-sky-500">
                                    <label for="mobile-user-photo"
                                           class="relative text-sm leading-4 font-medium text-gray-700 pointer-events-none">
                                        <span>Změnit</span>
                                        <span class="sr-only"> Profilová fotka</span>
                                    </label>
                                    <input id="mobile-user-photo" name="user-photo" type="file"
                                           class="absolute w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md"/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="hidden relative rounded-full overflow-hidden lg:block">
                        <img class="relative rounded-full w-40 h-40" :src="user.avatar" alt=""/>
                        <label for="desktop-user-photo"
                               class="absolute inset-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center text-sm font-medium text-white opacity-0 hover:opacity-100 focus-within:opacity-100">
                            <span>Změnit</span>
                            <span class="sr-only"> Profilová fotka</span>
                            <input type="file" id="desktop-user-photo" name="user-photo"
                                   class="absolute inset-0 w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md"/>
                        </label>
                    </div>
                </div>
            </div>

            <div class="mt-6 grid grid-cols-12 gap-6">
                <div class="col-span-12 sm:col-span-6">
                    <label for="name" class="block text-sm font-medium text-gray-700">Jméno</label>
                    <input type="text" name="name" id="name" autocomplete="given-name"
                           class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                           :value="user.name"/>
                </div>

                <div class="col-span-12 sm:col-span-6">
                    <label for="surname" class="block text-sm font-medium text-gray-700">Přijmení</label>
                    <input type="text" name="surname" id="surname" autocomplete="family-name"
                           class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                           :value="user.surname"/>
                </div>

                <div class="col-span-12">
                    <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" name="email" id="email" autocomplete="email"
                           class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                           :value="user.email"/>
                </div>

                <div class="col-span-12 sm:col-span-6">
                    <label for="company" class="block text-sm font-medium text-gray-700">Playstation</label>
                    <input type="text" name="company" id="company" autocomplete="organization"
                           class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"/>
                </div>

                <div class="col-span-12 sm:col-span-6">
                    <label for="company" class="block text-sm font-medium text-gray-700">Xbox</label>
                    <input type="text" name="company" id="company" autocomplete="organization"
                           class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"/>
                </div>

                <div v-if="user.providers" class="col-span-12 sm:col-span-6">
                    <label for="twitch" class="block text-sm font-medium text-gray-700">Twitch</label>
                    <div v-if="checkProvider('twitch')">Účet propojen</div>
                    <button v-else v-on:click.prevent="socialAuth('twitch')" id="twitch">Propojit twitch účet</button>
                </div>
            </div>
        </div>

        <!-- Privacy section -->
        <div class="pt-6 divide-y divide-gray-200">
            <div class="px-4 sm:px-6">
                <div>
                    <h2 class="text-lg leading-6 font-medium text-gray-900">Oprávnění</h2>
                    <p class="mt-1 text-sm text-gray-500">
                        Nevím co vše u toho profilu budeme chtít mít
                    </p>
                </div>
                <ul role="list" class="mt-2 divide-y divide-gray-200">
                    <SwitchGroup as="li" class="py-4 flex items-center justify-between">
                        <div class="flex flex-col">
                            <SwitchLabel as="p" class="text-sm font-medium text-gray-900" passive>
                                Souhlasím se spracováním osobních údajů
                            </SwitchLabel>
                            <SwitchDescription class="text-sm text-gray-500">
                                Slouží pouze k tomu abychom věděli kam poslat odměnu v případě výhry
                            </SwitchDescription>
                        </div>
                        <Switch v-model="availableToHire"
                                :class="[availableToHire ? 'bg-blue-500' : 'bg-red-600', 'ml-4 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500']">
                            <span aria-hidden="true"
                                  :class="[availableToHire ? 'translate-x-5' : 'translate-x-0', 'inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200']"/>
                        </Switch>
                    </SwitchGroup>
                    <SwitchGroup as="li" class="py-4 flex items-center justify-between">
                        <div class="flex flex-col">
                            <SwitchLabel as="p" class="text-sm font-medium text-gray-900" passive>
                                Povolit komentování
                            </SwitchLabel>
                            <SwitchDescription class="text-sm text-gray-500">
                                Nevím jestli budou komenty na profilu
                            </SwitchDescription>
                        </div>
                        <Switch v-model="allowCommenting"
                                :class="[allowCommenting ? 'bg-blue-500' : 'bg-red-600', 'ml-4 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500']">
                            <span aria-hidden="true"
                                  :class="[allowCommenting ? 'translate-x-5' : 'translate-x-0', 'inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200']"/>
                        </Switch>
                    </SwitchGroup>
                    <SwitchGroup as="li" class="py-4 flex items-center justify-between">
                        <div class="flex flex-col">
                            <SwitchLabel as="p" class="text-sm font-medium text-gray-900" passive>
                                Další sračky
                            </SwitchLabel>
                            <SwitchDescription class="text-sm text-gray-500">
                                Prostě podle toho co nás napadne
                            </SwitchDescription>
                        </div>
                        <Switch v-model="allowMentions"
                                :class="[allowMentions ? 'bg-blue-500' : 'bg-red-600', 'ml-4 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500']">
                            <span aria-hidden="true"
                                  :class="[allowMentions ? 'translate-x-5' : 'translate-x-0', 'inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200']"/>
                        </Switch>
                    </SwitchGroup>
                </ul>
            </div>
            <div class="mt-4 py-4 px-4 flex justify-end sm:px-6">
                <button type="button"
                        class="bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
                    Zrušit
                </button>
                <button type="button"
                        class="ml-2 bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
                    Uložit
                </button>
            </div>
        </div>
    </form>
</template>

<script>
import {ref, onMounted, computed} from 'vue'
import {useStore} from 'vuex'
import {
    Switch,
    SwitchDescription,
    SwitchGroup,
    SwitchLabel,
} from '@headlessui/vue'
import {
    XIcon,
} from '@heroicons/vue/outline'

import api from '../../../services/api'

export default {
    components: {
        Switch,
        SwitchDescription,
        SwitchGroup,
        SwitchLabel,
        XIcon,
    },
    setup() {
        const availableToHire = ref(true)
        const allowCommenting = ref(false)
        const allowMentions = ref(true)
        const user = ref(null)
        const store = useStore()
        const loggedUser = computed(() => store.getters["userModule/user"])

        onMounted(async () => {
                await api.getUser(loggedUser.value.id).then(response =>
                    user.value = response.data
                )
            }
        )

        function checkProvider(provider){
                return user.value.providers.some(function (o) {
                    return o["name"] === provider
                })
        }

        function socialAuth(provider) {
            store.dispatch('socialAuth', provider)
        }

        return {
            user,
            checkProvider,
            socialAuth,
            availableToHire,
            allowCommenting,
            allowMentions,
        }
    },
}
</script>
