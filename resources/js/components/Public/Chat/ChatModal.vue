<template>
    <div v-show="open" class="w-full h-full fixed z-20 mx-auto">
        <div class="flex h-full">
            <div class="flex-1 bg-gray-100 w-full h-full">
                <div class="main-body container m-auto w-11/12 h-full flex flex-col">
                    <div class="py-4 flex-2 flex flex-row">
                        <div class="flex-1 sm:hidden">
                            <label for="user" class="block text-sm font-medium text-gray-700">Název uživatele</label>
                            <div class="mt-1 relative">
                                <input type="text" name="user" id="user"
                                       class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                       placeholder="Jméno uživatale"/>
                                <!--                                <div v-show="true"-->
                                <!--                                     class="fixed z-30 top-30 left-4 w-auto bg-white px-10 mt-2 max-h-[55vh] overflow-y-scroll overflow-x-hidden">-->
                                <!--                                    <ul role="list" class="divide-y divide-gray-200">-->
                                <!--                                        <li v-for="person in persons" :key="person.email" class="py-4 flex">-->
                                <!--                                            <img class="h-10 w-10 rounded-full" :src="person.image" alt=""/>-->
                                <!--                                            <div class="ml-3">-->
                                <!--                                                <p class="text-sm font-medium text-gray-900">{{ person.name }}</p>-->
                                <!--                                                <p class="text-sm text-gray-500">{{ person.email }}</p>-->
                                <!--                                            </div>-->
                                <!--                                        </li>-->
                                <!--                                    </ul>-->
                                <!--                                </div>-->
                            </div>
                        </div>
                        <div class="flex-1 text-right">
                            <span class="hidden sm:inline-block text-gray-700">
                                Status: <span
                                class="inline-block align-text-bottom w-4 h-4 bg-green-400 rounded-full border-2 border-white"></span> <b>Online</b>
                                <span class="inline-block align-text-bottom">
                                    <svg fill="none" stroke="currentColor" stroke-linecap="round"
                                         stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-4 h-4"><path
                                        d="M19 9l-7 7-7-7"></path></svg>
                                </span>
                            </span>

                            <span class="inline-flex ml-8 text-gray-700 align-bottom" @click="closeChat">
                                <span class="align-text-bottom w-12 h-12 sm:h-12 sm:w-12 p-1 rounded-full flex">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         class="w-10 h-10 sm:h-16 sm:w-16 hover:bg-gray-400 hover:text-gray-900 rounded-full"
                                         fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                    </svg>
                                </span>
                            </span>
                        </div>
                    </div>

                    <div class="main flex-1 flex flex-col relative">
                        <div class="hidden lg:block heading flex-2">
                            <h1 class="text-3xl text-gray-700 mb-4">Chat</h1>
                        </div>

                        <div class="flex-1 flex h-full">
                            <!-- Začátek chat Room -->
                            <div class="sidebar hidden lg:flex w-1/3 flex-2 flex-col pr-6 max-h-[85vh]">
                                <!-- Vyhledávání -->
                                <div class="search flex-2 pb-6 px-2">
                                    <input type="text"
                                           class="outline-none py-2 block w-full bg-transparent border-b-2 border-gray-200 bg-white"
                                           placeholder="Vyhledávání">
                                </div>
                                <!-- Konec vyhledávání -->
                                <div class="flex-1 max-h-[85vh] overflow-y-scroll overflow-x-hidden px-2 relative mb-3">
                                    <!-- Začátek pro tebe foreache per Users -->
                                    <!--                                    <div v-for="user in users" :key=room.id class="entry cursor-pointer transform hover:scale-105 duration-300 transition-transform bg-white mb-4 rounded p-4 flex shadow-md">-->
                                    <!--                                        <div class="flex-2">-->
                                    <!--                                            <div class="w-12 h-12 relative">-->
                                    <!--                                                <img class="w-12 h-12 rounded-full mx-auto" :src="room.image" alt="chat-user" />-->
                                    <!--                                                <span class="absolute w-4 h-4 bg-green-400 rounded-full right-0 bottom-0 border-2 border-white"></span>-->
                                    <!--                                            </div>-->
                                    <!--                                        </div>-->
                                    <!--                                        <div class="flex-1 px-2">-->
                                    <!--                                            <div class="truncate w-32"><span class="text-gray-800">{{room.name}}</span></div>-->
                                    <!--                                            <div><small class="text-gray-600">Poslední zpráva!</small></div>-->
                                    <!--                                        </div>-->
                                    <!--                                        <div class="flex-2 text-right">-->
                                    <!--                                            <div><small class="text-gray-500">15 dubna</small></div>-->
                                    <!--                                            <div>-->
                                    <!--                                                <small class="text-xs bg-red-500 text-white rounded-full h-6 w-6 leading-6 text-center inline-block">-->
                                    <!--                                                    1-->
                                    <!--                                                </small>-->
                                    <!--                                            </div>-->
                                    <!--                                        </div>-->
                                    <!--                                    </div>-->
                                    <!-- Konec pro tebe foreache per Users -->
                                    <!-- Další jen na ukázku (Nemaž to jsou tam css pro to když je třeba offline nebo nemá upoornění žádné) -->
                                    <div v-for="room in rooms" @click="switchRoom(room.id)"
                                         class="entry cursor-pointer transform hover:scale-105 duration-300 transition-transform bg-white mb-4 rounded p-4 flex shadow-md border-red-500">
                                        <div class="flex-2">
                                            <div class="w-12 h-12 relative">
                                                <img class="w-12 h-12 rounded-full mx-auto" :src="room.image"
                                                     alt="chat-user"/>
                                                <span :class="[room.users[0].online ? 'bg-green-400' : 'bg-gray-400'   ,'absolute w-4 h-4 rounded-full right-0 bottom-0 border-2 border-white']"></span>
                                            </div>
                                        </div>
                                        <div class="flex-1 px-2">
                                            <div class="truncate w-32"><span
                                                class="text-gray-800">{{ room.name }}</span></div>
                                            <div><small class="text-gray-600">{{ room.latestMessage.message }}</small>
                                            </div>
                                        </div>
                                        <div class="flex-2 text-right">
                                            <div><small class="text-gray-500">{{ room.latestMessage.timestamp }}</small>
                                            </div>
                                            <div v-if="room.unreadMessagesCount > 0">
                                                <small
                                                    class="text-xs bg-red-500 text-white rounded-full h-6 w-6 leading-6 text-center inline-block">
                                                    {{ room.unreadMessagesCount }}
                                                </small>
                                            </div>
                                        </div>
                                    </div>


                                    <!--                                    <div class="entry cursor-pointer transform hover:scale-105 duration-300 transition-transform bg-white mb-4 rounded p-4 flex shadow-md border-l-4 border-red-500">-->
                                    <!--                                        <div class="flex-2">-->
                                    <!--                                            <div class="w-12 h-12 relative">-->
                                    <!--                                                <img class="w-12 h-12 rounded-full mx-auto" src="https://scontent.fprg3-1.fna.fbcdn.net/v/t1.6435-1/106926036_1321479781529138_7875420984683671911_n.jpg?stp=dst-jpg_p100x100&_nc_cat=102&ccb=1-5&_nc_sid=7206a8&_nc_ohc=0NnqdJhH0GcAX-n6KxJ&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fprg3-1.fna&oh=00_AT8gvKpU3qYogq4cBkunweggVCac6Gpi4QqBja1CQzXedQ&oe=623BAC06" alt="chat-user" />-->
                                    <!--                                                <span class="absolute w-4 h-4 bg-gray-400 rounded-full right-0 bottom-0 border-2 border-white"></span>-->
                                    <!--                                            </div>-->
                                    <!--                                        </div>-->
                                    <!--                                        <div class="flex-1 px-2">-->
                                    <!--                                            <div class="truncate w-32"><span class="text-gray-800">Martin Švarcer</span></div>-->
                                    <!--                                            <div><small class="text-gray-600">Wopaa!</small></div>-->
                                    <!--                                        </div>-->
                                    <!--                                        <div class="flex-2 text-right">-->
                                    <!--                                            <div><small class="text-gray-500">11 Srpen</small></div>-->
                                    <!--                                        </div>-->
                                    <!--                                    </div>-->
                                    <!--                                    <div class="entry cursor-pointer transform hover:scale-105 duration-300 transition-transform bg-white mb-4 rounded p-4 flex shadow-md">-->
                                    <!--                                        <div class="flex-2">-->
                                    <!--                                            <div class="w-12 h-12 relative">-->
                                    <!--                                                <img class="w-12 h-12 rounded-full mx-auto" src="https://scontent.fprg3-1.fna.fbcdn.net/v/t1.6435-1/106926036_1321479781529138_7875420984683671911_n.jpg?stp=dst-jpg_p100x100&_nc_cat=102&ccb=1-5&_nc_sid=7206a8&_nc_ohc=0NnqdJhH0GcAX-n6KxJ&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fprg3-1.fna&oh=00_AT8gvKpU3qYogq4cBkunweggVCac6Gpi4QqBja1CQzXedQ&oe=623BAC06" alt="chat-user" />-->
                                    <!--                                                <span class="absolute w-4 h-4 bg-gray-400 rounded-full right-0 bottom-0 border-2 border-white"></span>-->
                                    <!--                                            </div>-->
                                    <!--                                        </div>-->
                                    <!--                                        <div class="flex-1 px-2">-->
                                    <!--                                            <div class="truncate w-32"><span class="text-gray-800">Mirek Marek</span></div>-->
                                    <!--                                            <div><small class="text-gray-600">Poslední mess!</small></div>-->
                                    <!--                                        </div>-->
                                    <!--                                        <div class="flex-2 text-right">-->
                                    <!--                                            <div><small class="text-gray-500">08 Květen</small></div>-->
                                    <!--                                        </div>-->
                                    <!--                                    </div>-->
                                    <!--                                    <div class="entry cursor-pointer transform hover:scale-105 duration-300 transition-transform bg-white mb-4 rounded p-4 flex shadow-md">-->
                                    <!--                                        <div class="flex-2">-->
                                    <!--                                            <div class="w-12 h-12 relative">-->
                                    <!--                                                <img class="w-12 h-12 rounded-full mx-auto" src="https://scontent.fprg3-1.fna.fbcdn.net/v/t1.6435-1/106926036_1321479781529138_7875420984683671911_n.jpg?stp=dst-jpg_p100x100&_nc_cat=102&ccb=1-5&_nc_sid=7206a8&_nc_ohc=0NnqdJhH0GcAX-n6KxJ&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fprg3-1.fna&oh=00_AT8gvKpU3qYogq4cBkunweggVCac6Gpi4QqBja1CQzXedQ&oe=623BAC06" alt="chat-user" />-->
                                    <!--                                                <span class="absolute w-4 h-4 bg-gray-400 rounded-full right-0 bottom-0 border-2 border-white"></span>-->
                                    <!--                                            </div>-->
                                    <!--                                        </div>-->
                                    <!--                                        <div class="flex-1 px-2">-->
                                    <!--                                            <div class="truncate w-32"><span class="text-gray-800">Pepa Franta</span></div>-->
                                    <!--                                            <div><small class="text-gray-600">Random message!</small></div>-->
                                    <!--                                        </div>-->
                                    <!--                                        <div class="flex-2 text-right">-->
                                    <!--                                            <div><small class="text-gray-500">01 Leden</small></div>-->
                                    <!--                                        </div>-->
                                    <!--                                    </div>-->
                                    <!--                                    <div class="entry cursor-pointer transform hover:scale-105 duration-300 transition-transform bg-white mb-4 rounded p-4 flex shadow-md">-->
                                    <!--                                        <div class="flex-2">-->
                                    <!--                                            <div class="w-12 h-12 relative">-->
                                    <!--                                                <img class="w-12 h-12 rounded-full mx-auto" src="https://scontent.fprg3-1.fna.fbcdn.net/v/t1.6435-1/106926036_1321479781529138_7875420984683671911_n.jpg?stp=dst-jpg_p100x100&_nc_cat=102&ccb=1-5&_nc_sid=7206a8&_nc_ohc=0NnqdJhH0GcAX-n6KxJ&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fprg3-1.fna&oh=00_AT8gvKpU3qYogq4cBkunweggVCac6Gpi4QqBja1CQzXedQ&oe=623BAC06" alt="chat-user" />-->
                                    <!--                                                <span class="absolute w-4 h-4 bg-gray-400 rounded-full right-0 bottom-0 border-2 border-white"></span>-->
                                    <!--                                            </div>-->
                                    <!--                                        </div>-->
                                    <!--                                        <div class="flex-1 px-2">-->
                                    <!--                                            <div class="truncate w-32"><span class="text-gray-800">Pepa Franta</span></div>-->
                                    <!--                                            <div><small class="text-gray-600">Random message!</small></div>-->
                                    <!--                                        </div>-->
                                    <!--                                        <div class="flex-2 text-right">-->
                                    <!--                                            <div><small class="text-gray-500">01 Leden</small></div>-->
                                    <!--                                        </div>-->
                                    <!--                                    </div>-->
                                    <!--                                    <div class="entry cursor-pointer transform hover:scale-105 duration-300 transition-transform bg-white mb-4 rounded p-4 flex shadow-md">-->
                                    <!--                                        <div class="flex-2">-->
                                    <!--                                            <div class="w-12 h-12 relative">-->
                                    <!--                                                <img class="w-12 h-12 rounded-full mx-auto" src="https://scontent.fprg3-1.fna.fbcdn.net/v/t1.6435-1/106926036_1321479781529138_7875420984683671911_n.jpg?stp=dst-jpg_p100x100&_nc_cat=102&ccb=1-5&_nc_sid=7206a8&_nc_ohc=0NnqdJhH0GcAX-n6KxJ&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fprg3-1.fna&oh=00_AT8gvKpU3qYogq4cBkunweggVCac6Gpi4QqBja1CQzXedQ&oe=623BAC06" alt="chat-user" />-->
                                    <!--                                                <span class="absolute w-4 h-4 bg-gray-400 rounded-full right-0 bottom-0 border-2 border-white"></span>-->
                                    <!--                                            </div>-->
                                    <!--                                        </div>-->
                                    <!--                                        <div class="flex-1 px-2">-->
                                    <!--                                            <div class="truncate w-32"><span class="text-gray-800">Pepa Franta</span></div>-->
                                    <!--                                            <div><small class="text-gray-600">Random message!</small></div>-->
                                    <!--                                        </div>-->
                                    <!--                                        <div class="flex-2 text-right">-->
                                    <!--                                            <div><small class="text-gray-500">01 Leden</small></div>-->
                                    <!--                                        </div>-->
                                    <!--                                    </div>-->
                                    <!-- Koneeeeeec Další jen na ukázku (Nemaž to jsou tam css pro to když je třeba offline nebo nemá upoornění žádné) -->
                                </div>
                            </div>
                            <!-- Konec chat Room -->
                            <div class="chat-area flex-1 flex flex-col relative max-h-[85vh]">
                                <div class="flex-3">
                                    <h2 class="text-xl py-1 mb-8 border-b-2 border-gray-200">Píšeš si s
                                        <b>{{ activeRoom.name }}</b>
                                        <span v-if="activeRoom.users[0]" :class="[activeRoom.users[0].online ? 'bg-green-400' : 'bg-gray-400'   ,'inline-block align-text-bottom w-4 h-4 bg-green-400 rounded-full border-2 border-white']"></span>
                                    </h2>
                                </div>
                                <div ref="messages" class="messages flex-1 overflow-scroll">
                                    <div v-for="message in activeRoom.messages" :key="message.id"
                                         :class="[message.self ? 'me text-right' : '', 'message mb-4 flex']">
                                        <div v-if="!message.self" class="flex-2">
                                            <div class="w-12 h-12 relative">
                                                <img class="w-12 h-12 rounded-full mx-auto" :src="message.avatar"
                                                     alt="chat-user"/>
                                            </div>
                                        </div>
                                        <div class="flex-1 px-2">
                                            <div
                                                :class="[message.self ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-700', 'inline-block rounded-full p-2 px-6']">
                                                <span>{{ message.message }}</span>
                                            </div>
                                            <div class="pl-4"><small
                                                class="text-gray-500">{{ message.timestamp }}</small></div>
                                        </div>
                                    </div>
                                </div>
                                <!-- Typing -->
                                <div v-if="activeRoom.users[0] && activeRoom.users[0].typing">
                                    <h1 class="text-gray-900">{{ activeRoom.users[0].nick }} píše</h1>
                                </div>
                                <!-- Write -->
                                <div class="flex-2 pb-10 mx-auto w-full mt-5">
                                    <div class="write bg-white shadow flex rounded-lg">
                                        <div class="flex-3 flex content-center items-center text-center p-4 pr-0">
                                            <span class="block text-center text-gray-400 hover:text-gray-800">
                                                <svg fill="none" stroke-linecap="round" stroke-linejoin="round"
                                                     stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"
                                                     class="h-6 w-6"><path
                                                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                            </span>
                                        </div>
                                        <div class="flex-1">
                                            <textarea v-model="newMessage"
                                                      @keydown.once="setTyping"
                                                      @keydown.enter.prevent="sendMessage" name="message"
                                                      class="w-full block outline-none py-4 px-4 bg-transparent"
                                                      rows="1" placeholder="Napiš zprávu..." autofocus></textarea>
                                        </div>
                                        <div class="flex-2 w-32 p-2 flex content-center items-center">
                                            <div class="flex-1 text-center">
                                                <span class="text-gray-400 hover:text-gray-800">
                                                    <span class="inline-block align-text-bottom">
                                                        <svg fill="none" stroke-linecap="round" stroke-linejoin="round"
                                                             stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"
                                                             class="w-6 h-6"><path
                                                            d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path></svg>
                                                    </span>
                                                </span>
                                            </div>
                                            <div class="flex-1">
                                                <button class="bg-blue-400 w-10 h-10 rounded-full inline-block">
                                                    <span class="inline-block align-text-bottom">
                                                        <svg fill="none" stroke="currentColor" stroke-linecap="round"
                                                             stroke-linejoin="round" stroke-width="2"
                                                             viewBox="0 0 24 24" class="w-4 h-4 text-white"><path
                                                            d="M5 13l4 4L19 7"></path></svg>
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- Mesages -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {computed, nextTick, onActivated, onMounted, onUpdated, reactive, ref, watch} from 'vue'
import {useStore} from 'vuex'
import {
    Dialog,
    DialogTitle,
    DialogOverlay,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    TransitionChild,
    TransitionRoot,
} from '@headlessui/vue'
import {
    ArchiveIcon as ArchiveIconSolid,
    ChevronDownIcon,
    ChevronUpIcon,
    DotsVerticalIcon,
    FolderDownloadIcon,
    PencilIcon,
    ReplyIcon,
    SearchIcon,
    UserAddIcon,
} from '@heroicons/vue/solid'
import {
    ArchiveIcon as ArchiveIconOutline,
    BanIcon,
    BellIcon,
    FlagIcon,
    InboxIcon,
    MenuIcon,
    PencilAltIcon,
    UserCircleIcon,
    XIcon,
} from '@heroicons/vue/outline'

const navigation = [
    /*{
      name: 'Inboxes',
      href: '#',
      children: [
        { name: 'Technical Support', href: '#' },
        { name: 'Sales', href: '#' },
        { name: 'General', href: '#' },
      ],
    },*/
    //{ name: 'Reporting', href: '#', children: [] },
    {name: 'Zavřít Chat', href: '#', children: []},
]
const sidebarNavigation = [
    {name: 'Open', href: '#', icon: InboxIcon, current: true},
    {name: 'Archive', href: '#', icon: ArchiveIconOutline, current: false},
    {name: 'Customers', href: '#', icon: UserCircleIcon, current: false},
    {name: 'Flagged', href: '#', icon: FlagIcon, current: false},
    {name: 'Spam', href: '#', icon: BanIcon, current: false},
    {name: 'Drafts', href: '#', icon: PencilAltIcon, current: false},
]
const userNavigation = [
    {name: 'Your Profile', href: '#'},
    {name: 'Sign out', href: '#'},
]

export default {
    components: {
        Dialog,
        DialogTitle,
        DialogOverlay,
        Menu,
        MenuButton,
        MenuItem,
        MenuItems,
        TransitionChild,
        TransitionRoot,
        ArchiveIconSolid,
        BellIcon,
        ChevronDownIcon,
        ChevronUpIcon,
        DotsVerticalIcon,
        FolderDownloadIcon,
        MenuIcon,
        PencilIcon,
        ReplyIcon,
        SearchIcon,
        UserAddIcon,
        XIcon,
    },
    setup() {
        const store = useStore();
        const open = computed(() => store.getters['chatModule/open']);
        const rooms = computed(() => store.getters['chatModule/rooms']);
        const activeRoom = computed(() => store.getters['chatModule/activeRoom']);
        const user = computed(() => store.getters['userModule/user']);
        const messages = ref();
        const newMessage = ref(null);

        //
        // watch([open, activeRoom.value.messages, ] (val) => {
        //     if (val) {
        //         setTimeout( () => {
        //             scrollToEnd()
        //         }, 1000)
        //     }
        // })

        // watch(room.value.messages, () => {
        //     nextTick(() => {
        //     scrollToEnd()
        //     });
        // })

        function scrollToEnd() {
            messages.value.scrollTop = messages.value.lastElementChild.offsetTop;
            messages.value.scrollIntoView({
                behavior: "smooth",
                block: "center",
                inline: "nearest"
            })
        }

        function switchRoom(newRoomId) {
            store.dispatch('chatModule/switchRoom', newRoomId).then(
                scrollToEnd()
            )
        }

        function setTyping() {
            let channel = Echo.join('chat.' + activeRoom.value.id);
            setTimeout(() => {
                channel.whisper('Typing', {
                    userId: user.value.id
                })
            }, 1000)
        }

        function sendMessage() {
            store.dispatch('chatModule/sendMessage', newMessage.value).then(() => {
                scrollToEnd()
            }).catch((error) => {
                if (error.response.data) {
                    store.dispatch('messagesModule/showException', error.response.data.message);
                } else {
                    console.log(error);
                }
            }).finally(
                newMessage.value = '',
            )
        }

        function closeChat() {
            store.dispatch('chatModule/closeChat', activeRoom.value.id)
        }

        return {
            navigation,
            open,
            rooms,
            activeRoom,
            messages,
            newMessage,
            scrollToEnd,
            switchRoom,
            setTyping,
            sendMessage,
            closeChat,
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
