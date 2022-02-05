<template>
    <TransitionRoot as="template" :show="open">
        <Dialog as="div" class="fixed z-10 inset-0 overflow-y-auto" @close="close">
            <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0"
                                 enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100"
                                 leave-to="opacity-0">
                    <DialogOverlay class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
                </TransitionChild>

                <!-- This element is to trick the browser into centering the modal contents. -->
                <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <TransitionChild as="template" enter="ease-out duration-300"
                                 enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                 enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                                 leave-from="opacity-100 translate-y-0 sm:scale-100"
                                 leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                    <div
                        class="inline-block align-bottom bg-gray-50 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                        <div class="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                            <button type="button"
                                    class="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    @click="close">
                                <span class="sr-only">Close</span>
                                <XIcon class="h-6 w-6" aria-hidden="true"/>
                            </button>
                        </div>
                        <div class=" bg-gray-50 flex flex-col justify-center py-5 sm:px-6 lg:px-8">
                            <div class="sm:mx-auto sm:w-full sm:max-w-md">
                                <img class="mx-auto h-12 w-auto"
                                     src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                                     alt="Workflow"/>
                                <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
                                    Registrace
                                </h2>
                                <SocialAuth></SocialAuth>
                            </div>

                            <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                                <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                                    <form @submit.prevent="register" class="space-y-6" action="#" method="POST">
                                        <div>
                                            <label for="email"
                                                   class="block text-sm font-medium text-gray-700">Email</label>
                                            <div class="mt-1 relative">
                                                <input v-model="form.email" id="email" name="email" type="email"
                                                       autocomplete="email" required=""
                                                       class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                       aria-describedby="email-error"/>
                                                <div
                                                    class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
                                                    v-if="form.errors.has('email')">
                                                    <svg class="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg"
                                                         viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                        <path fill-rule="evenodd"
                                                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                              clip-rule="evenodd"/>
                                                    </svg>
                                                </div>
                                            </div>
                                            <div class="mt-1 text-sm text-red-600" id="email-error"
                                                 v-if="form.errors.has('email')"
                                                 v-text="form.errors.get('email')"></div>
                                        </div>
                                        <div>
                                            <label for="nick" class="block text-sm font-medium text-gray-700">Uživatelské
                                                jméno</label>
                                            <div class="mt-1 relative">
                                                <input v-model="form.nick" id="nick" name="nick" autocomplete="nick"
                                                       required=""
                                                       class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                       aria-describedby="nick-error"/>
                                                <div
                                                    class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
                                                    v-if="form.errors.has('nick')">
                                                    <svg class="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg"
                                                         viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                        <path fill-rule="evenodd"
                                                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                              clip-rule="evenodd"/>
                                                    </svg>
                                                </div>
                                            </div>
                                            <div class="mt-1 text-sm text-red-600" id="nick-error"
                                                 v-if="form.errors.has('nick')"
                                                 v-text="form.errors.get('nick')"></div>
                                        </div>

                                        <div>
                                            <label for="password" class="block text-sm font-medium text-gray-700">
                                                Heslo
                                            </label>
                                            <div class="mt-1 relative">
                                                <input v-model="form.password" id="password" name="password"
                                                       type="password" autocomplete="current-password" required=""
                                                       class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                       aria-describedby="password-error"/>
                                                <div
                                                    class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
                                                    v-if="form.errors.has('password')">
                                                    <svg class="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg"
                                                         viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                        <path fill-rule="evenodd"
                                                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                              clip-rule="evenodd"/>
                                                    </svg>
                                                </div>
                                            </div>
                                            <div class="mt-1 text-sm text-red-600" id="password-error"
                                                 v-if="form.errors.has('password')"
                                                 v-text="form.errors.get('password')"></div>
                                        </div>
                                        <div>
                                            <label for="password_confirm"
                                                   class="block text-sm font-medium text-gray-700">
                                                Heslo Znovu
                                            </label>
                                            <div class="mt-1">
                                                <input v-model="form.password_confirmation" id="password_confirm"
                                                       name="password_confirm" type="password"
                                                       autocomplete="current-password" required=""
                                                       class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
                                            </div>
                                        </div>
                                        <div class="flex items-center justify-between">
                                            <div class="text-sm">
                                                <div class="font-medium text-indigo-600 hover:text-indigo-500">
                                                    Po registraci nezapomeň potvrdit aktivační kod v emailu
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <button type="submit"
                                                    class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                                Registrovat se
                                            </button>
                                        </div>
                                    </form>
                                    <div class="mt-2 text-center text-sm text-gray-600">
                                        Jsi již zaregistrován?
                                        {{ ' ' }}
                                        <a href="#" v-on:click.prevent="openLogin"
                                           class="font-medium text-indigo-600 hover:text-indigo-500">
                                            Přihlaš se zde!
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </TransitionChild>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script>
import {toRefs, reactive} from "vue";
import {useStore} from "vuex";
import {Dialog, DialogOverlay, DialogTitle, TransitionChild, TransitionRoot} from "@headlessui/vue";
import {ExclamationIcon, XIcon} from '@heroicons/vue/outline';
import Form from "../../utilities/form";
import SocialAuth from "./SocialAuth";
import router from "../../router";

export default {
    props: {
        open: {
            type: Boolean,
            required: true
        }
    },
    components: {
        Dialog,
        DialogOverlay,
        DialogTitle,
        TransitionChild,
        TransitionRoot,
        ExclamationIcon,
        XIcon,
        SocialAuth
    },
    setup(props, {emit}) {
        const {open} = toRefs(props)
        const form =
            reactive(new Form({
                email: '',
                nick: '',
                password: '',
                password_confirmation: ''
            }))
        const store = useStore()

        async function register() {
            try {
                await store.dispatch('userModule/register', form.data());
                await router.push({name: 'registrationSuccessful'});
                close();
            } catch (error) {
                if (error.response) {
                    if (error.response.status === 422) {
                        form.onFail(error.response.data.errors);
                    } else {
                        close();
                        setTimeout(() => store.dispatch('messagesModule/showException', error.response.data.message), 250)
                    }
                } else {
                    console.log(error);
                }
            }
        }

        function close() {
            form.reset()
            emit('close')
        }

        function openLogin() {
            emit('openLogin')
        }

        return {
            form,
            open,
            register,
            close,
            openLogin
        }
    }
}
</script>
