<template>
    <TransitionRoot as="template" :show="open">
        <Dialog as="div" class="fixed z-10 inset-0 overflow-y-auto" @close="close">
            <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                    <DialogOverlay class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </TransitionChild>
                <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                    <div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                        <div class="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                            <button type="button" class="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" @click="close">
                                <span class="sr-only">Zavřít</span>
                                <XIcon class="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>
                        <div class="sm:flex sm:items-start">
                            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <DialogTitle as="h3" class="text-lg leading-6 font-medium text-gray-900">
                                    Notifikace
                                </DialogTitle>
                                <div v-if="notificationsCount !== 0" class="mt-2">
                                    <button v-on:click="markAllAsRead">Označit vše jako přečtené</button>
                                   <!-- <ul role="list" class="py-4 space-y-2 sm:px-6 sm:space-y-4 lg:px-8">
                                        <li v-for="(notification, index) in notifications" :key="notification.id" v-on:click="markAsRead(index, notification.roomId)">
                                            <img class="h-16 w-16 rounded-full"
                                                 :src="notification.image"
                                                 alt="notification_avatar">
                                            <time :datetime="notification.timestamp">
                                                {{ localizeDateTime(notification.timestamp) }}
                                            </time>
                                            <div class="mt-4 space-y-6 text-sm text-gray-800" v-html="notification.text"/>
                                        </li>
                                    </ul> -->
                                    <ul role="list" class="divide-y divide-gray-200 cursor-pointer">
                                        <li v-for="(notification, index) in notifications" :key="notification.id" v-on:click="markAsRead(index, notification.roomId)" class="py-4 flex">
                                        <img class="h-10 w-10 rounded-full" :src="notification.image" alt="notification_avatar"/>
                                        <div class="ml-3">
                                            <p class="text-sm font-medium text-gray-900" v-html="notification.text"></p>
                                            <p class="text-sm text-gray-500">{{ localizeDateTime(notification.timestamp) }}</p>

                                        </div>
                                        </li>
                                    </ul>
                                </div>
                                <div v-else>Žádné nepřečtené notifikace</div>
                            </div>
                        </div>
                    </div>
                </TransitionChild>
            </div>
            <Exception :open="showException" :message="exceptionMessage" @close="closeException"></Exception>
        </Dialog>
    </TransitionRoot>
</template>

<script>
import { toRefs, ref, computed } from 'vue'
import { useStore } from 'vuex'
import { Dialog, DialogOverlay, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { XIcon } from '@heroicons/vue/outline'
import Exception from '../Exception.vue'

export default {
    components: {
        Exception,
        Dialog,
        DialogOverlay,
        DialogTitle,
        TransitionChild,
        TransitionRoot,
        XIcon,
    },
    props: {
        open: {
            type: Boolean,
            required: true
        }
    },
    setup(props, {emit}){
        const {open} = toRefs(props)
        const store = useStore()
        const notifications = computed(() => store.getters['notificationsModule/notifications'])
        const notificationsCount = computed(() => store.getters['notificationsModule/notificationsCount'])
        const showException = ref(false)
        const exceptionMessage = ref()

        function localizeDateTime(time) {
            let newTime = new Date(time)
            return newTime.toLocaleString()
        }

        async function markAsRead(notification, roomId) {
            await store.dispatch('notificationsModule/readSingleNotification', notification).then(() => {
                emit('openChat', Number(roomId))
            }).catch(error => {
                showException.value = true
                exceptionMessage.value = error.response.data.message
            })
        }

        async function markAllAsRead() {
            await store.dispatch('notificationsModule/readAllNotifications').catch(error => {
                showException.value = true
                exceptionMessage.value = error.response.data.message
            })
        }

        function close() {
            emit('close')
        }

        function closeException() {
            showException.value = false
            exceptionMessage.value = ''
        }

        return {
            open,
            notifications,
            notificationsCount,
            showException,
            exceptionMessage,
            localizeDateTime,
            markAsRead,
            markAllAsRead,
            close,
            closeException
        }
    }
}
</script>
