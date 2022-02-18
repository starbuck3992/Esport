<template>
    <form @keydown.once="isDisabled" @submit.prevent="submit" class="divide-y divide-gray-200 lg:col-span-9">
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
                                   v-model="form.nick"/>
                        </div>
                        <div class="mt-1 text-sm text-red-600" v-if="form.errors.has('nick')"
                             v-text="form.errors.get('nick')">
                        </div>
                    </div>

                    <div>
                        <label for="about" class="block text-sm font-medium text-gray-700">
                            o mě
                        </label>
                        <div class="mt-1">
                            <textarea v-model="form.about" id="about" name="about" rows="3"
                                      class="shadow-sm focus:ring-sky-500 focus:border-sky-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md">
                            </textarea>
                        </div>
                        <div class="mt-1 text-sm text-red-600" v-if="form.errors.has('about')"
                             v-text="form.errors.get('about')">
                        </div>
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
                                <img class="rounded-full h-full w-full" :src="avatarPreview" alt=""/>
                            </div>
                            <div class="ml-5 rounded-md shadow-sm">
                                <div
                                    class="group relative border border-gray-300 rounded-md py-2 px-3 flex items-center justify-center hover:bg-gray-50 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-sky-500">
                                    <label for="mobile-avatar"
                                           class="relative text-sm leading-4 font-medium text-gray-700 pointer-events-none">
                                        <span>Změnit</span>
                                        <span class="sr-only">Profilová fotka</span>
                                    </label>
                                    <input ref="avatarUploader" @click="resetAvatar" @change="showAvatar"
                                           id="mobile-avatar" name="avatar" type="file" accept="image/png, image/jpeg"
                                           class="absolute w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="hidden relative rounded-full overflow-hidden lg:block">
                        <img class="relative rounded-full w-40 h-40" :src="avatarPreview" alt=""/>
                        <label for="desktop-avatar"
                               class="absolute inset-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center text-sm font-medium text-white opacity-0 hover:opacity-100 focus-within:opacity-100">
                            <span>Změnit</span>
                            <span class="sr-only">Profilová fotka</span>
                            <input ref="avatarUploader" @click="resetAvatar" @change="showAvatar" id="desktop-avatar"
                                   name="user-photo" type="file" accept="image/png, image/jpeg"
                                   class="absolute inset-0 w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md"/>
                        </label>
                    </div>
                    <div class="mt-1 text-sm text-red-600" v-if="form.errors.has('avatar')"
                         v-text="form.errors.get('avatar')">
                    </div>
                </div>
            </div>

            <div class="mt-6 grid grid-cols-12 gap-6">
                <div class="col-span-12 sm:col-span-6">
                    <label for="name" class="block text-sm font-medium text-gray-700">Jméno</label>
                    <input v-model="form.name" type="text" name="name" id="name" autocomplete="given-name"
                           class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                    />
                    <div class="mt-1 text-sm text-red-600" v-if="form.errors.has('name')"
                         v-text="form.errors.get('name')">
                    </div>
                </div>

                <div class="col-span-12 sm:col-span-6">
                    <label for="surname" class="block text-sm font-medium text-gray-700">Přijmení</label>
                    <input v-model="form.surname" type="text" name="surname" id="surname" autocomplete="family-name"
                           class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                    />
                    <div class="mt-1 text-sm text-red-600" v-if="form.errors.has('surname')"
                         v-text="form.errors.get('surname')">
                    </div>
                </div>

                <div class="col-span-12">
                    <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                    <input readonly v-model="form.email" type="email" name="email" id="email" autocomplete="email"
                           class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                    />
                </div>

                <div class="col-span-12 sm:col-span-6">
                    <label for="playstation-profile" class="block text-sm font-medium text-gray-700">Playstation</label>
                    <input v-model="form.playstationProfile" type="text" name="playstation" id="playstation-profile"
                           autocomplete="organization"
                           class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"/>
                    <div class="mt-1 text-sm text-red-600" v-if="form.errors.has('playstationProfile')"
                         v-text="form.errors.get('playstationProfile')">
                    </div>
                </div>

                <div class="col-span-12 sm:col-span-6">
                    <label for="xbox-profile" class="block text-sm font-medium text-gray-700">Xbox</label>
                    <input v-model="form.xboxProfile" type="text" name="xbox" id="xbox-profile"
                           autocomplete="organization"
                           class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"/>
                    <div class="mt-1 text-sm text-red-600" v-if="form.errors.has('xboxProfile')"
                         v-text="form.errors.get('xboxProfile')">
                    </div>
                </div>

                <div v-if="providers" class="col-span-12 sm:col-span-6">
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
                                Test
                            </SwitchDescription>
                        </div>
                        <Switch v-model="allowCommenting"
                                :class="[allowCommenting ? 'bg-blue-500' : 'bg-red-600', 'ml-4 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500']">
                            <span aria-hidden="true"
                                  :class="[allowCommenting ? 'translate-x-5' : 'translate-x-0', 'inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200']"/>
                        </Switch>
                    </SwitchGroup>
                </ul>
            </div>
            <div class="mt-4 py-4 px-4 flex justify-end sm:px-6">
                <button @click="reset" type="button" :disabled="!changed"
                        class="bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
                    Zrušit
                </button>
                <button type="submit" :disabled="!changed"
                        class="ml-2 bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
                    Uložit
                </button>
            </div>
        </div>
    </form>
</template>

<script>
import {ref, onMounted, computed, reactive} from "vue";
import {useStore} from "vuex";
import Api from "../../../services/api";

import {
    Switch,
    SwitchDescription,
    SwitchGroup,
    SwitchLabel,
} from '@headlessui/vue'
import {
    XIcon,
} from '@heroicons/vue/outline'
import Form from "../../../utilities/form";
import router from "../../../router";

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

        const store = useStore();
        const loggedUser = computed(() => store.getters['userModule/user'].id);

        const form =
            reactive(new Form({
                nick: null,
                about: null,
                avatar: null,
                name: null,
                surname: null,
                playstationProfile: null,
                xboxProfile: null
            }));

        const changed = ref(false);

        const avatarPreview = ref(null);
        const avatarUploader = ref(null);

        const providers = ref([]);

        onMounted(async () => {
                await getProfileInformation();
            }
        )

        function getProfileInformation() {
            Api.get(`/api/users/${loggedUser.value}`).then((response) => {
                Object.assign(form, response.data.profile);
                avatarPreview.value = response.data.avatar;
                providers.value = response.data.providers;
                changed.value = false;
            }).catch((error) => {
                if (error.response) {
                    setTimeout(() => store.dispatch('messagesModule/showException', error.response.data.message), 250)
                } else {
                    console.log(error);
                }
            })
        }

        function showAvatar(e) {
            let selectedFile = e.target.files[0];
            if (selectedFile.type === 'image/jpeg' || 'image/jpg' || 'image/png') {
                avatarPreview.value = URL.createObjectURL(selectedFile);
                form.avatar = selectedFile;
            }
        }

        function resetAvatar() {
            avatarUploader.value.value = null
        }

        function reset() {
            avatarPreview.value = null;
            form.reset();
            resetAvatar();
            getProfileInformation();
        }

        function checkProvider(provider) {
            return providers.value.some(function (o) {
                return o['name'] === provider
            })
        }

        function isDisabled() {
            changed.value = true;
        }

        function socialAuth(provider) {
            store.dispatch('userModule/socialAuth', provider).then((response) => {
                window.location.href = response.data.url;
            }).catch((error) => {
                if (error.response) {
                    setTimeout(() => store.dispatch('messagesModule/showException', error.response.data.message), 250);
                } else {
                    console.log(error);
                }
            })
        }

        function submit() {
            Api.post('/api/users/edit', form.objectToFormData(), {'Content-Type': 'multipart/form-data'}).then((response) => {
                setTimeout(() => store.dispatch('messagesModule/showSuccess', response.data.message).then(() => {
                    store.commit('userModule/updateSession', response.data.user)
                        form.onSuccess();
                        resetAvatar();
                        avatarPreview.value = null;
                        router.push({name: 'homeIndex'});
                    }
                ), 250)
            }).catch(error => {
                if (error.response) {
                    if (error.response.data.errors) {
                        form.onFail(error.response.data.errors)
                    } else {
                        setTimeout(() => store.dispatch('messagesModule/showException', error.response.data.message), 250)
                    }
                } else {
                    console.log(error);
                }
            })
        }

        return {
            availableToHire,
            allowCommenting,
            allowMentions,
            form,
            avatarPreview,
            avatarUploader,
            providers,
            changed,
            resetAvatar,
            isDisabled,
            showAvatar,
            checkProvider,
            socialAuth,
            reset,
            submit
        }
    },
}
</script>
