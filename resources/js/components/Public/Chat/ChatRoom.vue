<template>
    <!-- Room -->
    <section v-if="room.id" aria-labelledby="room-heading"
             class="min-w-0 flex-1 h-full flex flex-col overflow-hidden xl:order-last">
        <div class="flex-shrink-0 bg-white border-b border-gray-200 py-6">
            <!-- Room header -->
            <div class="h-16 flex flex-col justify-center">
                <div class="px-4 sm:px-6 lg:px-8">
                    <div class="py-3 flex justify-between">
                        <div class="flex items-center space-x-5 py-6">
                            <div class="flex-shrink-0">
                                <div class="relative">
                                    <img class="h-16 w-16 rounded-full"
                                         :src="room.image"
                                         alt="room_avatar">
                                    <span class="absolute inset-0 shadow-inner rounded-full"
                                          aria-hidden="true"></span>
                                </div>
                            </div>
                            <div>
                                <h1 class="text-2xl font-bold text-gray-900">@{{ room.name }}</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Typing -->
        <div v-show="room.typing.user">
            <h1 class="text-black text-gray-900">{{ room.typing.user }} píše</h1>
        </div>
        <!-- Messages -->
        <ChatMessages :messages="room.messages"></ChatMessages>
        <div class="flex-shrink-0 bg-white border-b border-gray-200 py-6">
            <!-- Toolbar -->
            <div class="h-16 flex flex-col justify-center">
                <div class="px-4 sm:px-6 lg:px-8">
                    <div class="py-3 flex justify-between">
                        <div class="w-full">
                                            <textarea id="project-description"
                                                      class="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md"
                                                      v-model="newMessage"
                                                      @keydown.once="setTyping"
                                                      @keydown.enter.prevent="sendMessage"></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <div v-else>
        Nejste přihlášeni do žádného turnaje. Přihlaste se například zde: XXX
    </div>
</template>

<script>
import {computed, ref} from "vue";
import {useStore} from "vuex";
import ChatMessages from "./ChatMessages";

export default {
    components: {
        ChatMessages
    },
    props: {
        room: {
            type: Object,
            required: false
        }
    },
    setup(props) {
        const store = useStore();
        const user = computed(() => store.getters['userModule/user']);
        const newMessage = ref(null);

        function setTyping() {

            let channel = Echo.private('chat.' + props.room.id);

            setTimeout( () => {
                channel.whisper('Typing', {
                    user: user.value.nick
                })
            }, 1000)
        }

        function sendMessage() {
            store.dispatch('chatModule/sendMessage', newMessage.value).finally(
                newMessage.value = ''
            )
        }

        return {
            newMessage,
            setTyping,
            sendMessage
        }
    }
}
</script>
