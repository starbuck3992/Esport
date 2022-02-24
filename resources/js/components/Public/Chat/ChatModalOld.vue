<template>
    <TransitionRoot as="template" :show="open">
        <Dialog as="div" class="fixed z-10 inset-0 overflow-y-auto" @close="closeChat">
            <div class="flex items-end justify-center pt-4 px-4 pb-20 text-center sm:block sm:p-0 min-h-[90vh] min-w-[90%]">
                <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                    <DialogOverlay class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </TransitionChild>
                <span class="hidden sm:inline-block sm:align-middle h-full w-full" aria-hidden="true">&#8203;</span>
                <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                    <div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all w-full h-full min-h-[90vh">
                        <div class="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                            <button type="button" class="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" @click="close">
                                <span class="sr-only">Zavřít</span>
                                <XIcon class="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>
                        <div class="sm:flex sm:items-start">
                            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <div class="fixed z-10 inset-0 overflow-y-auto" @close="closeChat">
                                    <div class="relative h-screen overflow-hidden bg-gray-100 flex flex-col z-30">
                                        <!-- Bottom section -->
                                        <div class="min-h-0 flex-1 flex overflow-hidden">
                                            <!-- Main area -->
                                            <main class="min-w-0 flex-1 border-t border-gray-200 xl:flex">
                                                <ChatRoom :room="room"></ChatRoom>
                                                <!-- Message list-->
                                                <aside class="hidden xl:block xl:flex-shrink-0 xl:order-first">
                                                    <div
                                                        class="h-full relative flex flex-col w-96 border-r border-gray-200 bg-gray-100">
                                                        <div class="flex-shrink-0">
                                                            <div
                                                                class="border-t border-b border-gray-200 bg-gray-50 px-6 py-2 text-sm font-medium text-gray-500">
                                                                Místnosti
                                                            </div>
                                                            <button @click="closeChat">Vlastní VIDITELNÉ ZAVŘÍT TLAČÍTKO</button>
                                                        </div>
                                                        <nav aria-label="Rooms list"
                                                             class="min-h-0 flex-1 overflow-y-auto">
                                                            <ul role="list"
                                                                class="border-b border-gray-200 divide-y divide-gray-200">
                                                                <li v-for="item in rooms" :key="item.id">
                                                                    <div
                                                                        class="relative group py-6 px-5 flex items-center">
                                                                        <div class="-m-1 flex-1 block p-1"
                                                                             @click="switchRoom(item.id)">
                                                                            <div
                                                                                class="absolute inset-0 group-hover:bg-gray-50"
                                                                                aria-hidden="true"/>
                                                                            <div
                                                                                class="flex-1 flex items-center min-w-0 relative">
                          <span class="flex-shrink-0 inline-block relative">
                            <img class="h-10 w-10 rounded-full" :src="item.image" alt=""/>
                            <span
                                :class="[item.status === 'online' ? 'bg-green-400' : 'bg-gray-300', 'absolute top-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white']"
                                aria-hidden="true"/>
                          </span>
                                                                                <div class="ml-4 truncate">
                                                                                    <p class="text-sm font-medium text-gray-900 truncate">
                                                                                        {{ item.name }}</p>
                                                                                    <p class="text-sm text-gray-500 truncate">
                                                                                        {{
                                                                                            '@' + item.handle
                                                                                        }}</p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <Menu as="div"
                                                                              class="ml-2 flex-shrink-0 relative inline-block text-left">
                                                                            <MenuButton
                                                                                class="group relative w-8 h-8 bg-white rounded-full inline-flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                                                                <span class="sr-only">Open options menu</span>
                                                                                <span
                                                                                    class="flex items-center justify-center h-full w-full rounded-full">
                            <DotsVerticalIcon class="w-5 h-5 text-gray-400 group-hover:text-gray-500"
                                              aria-hidden="true"/>
                          </span>
                                                                            </MenuButton>
                                                                            <transition
                                                                                enter-active-class="transition ease-out duration-100"
                                                                                enter-from-class="transform opacity-0 scale-95"
                                                                                enter-to-class="transform opacity-100 scale-100"
                                                                                leave-active-class="transition ease-in duration-75"
                                                                                leave-from-class="transform opacity-100 scale-100"
                                                                                leave-to-class="transform opacity-0 scale-95">
                                                                                <MenuItems
                                                                                    class="origin-top-right absolute z-10 top-0 right-9 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                                                    <div class="py-1">
                                                                                        <MenuItem
                                                                                            v-slot="{ active }">
                                                                                            <a href="#"
                                                                                               :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">View
                                                                                                profile</a>
                                                                                        </MenuItem>
                                                                                        <MenuItem
                                                                                            v-slot="{ active }">
                                                                                            <a href="#"
                                                                                               :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Send
                                                                                                message</a>
                                                                                        </MenuItem>
                                                                                    </div>
                                                                                </MenuItems>
                                                                            </transition>
                                                                        </Menu>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </nav>
                                                    </div>
                                                </aside>
                                            </main>
                                        </div>
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
import {computed} from 'vue'
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
import ChatRoom from "./ChatRoom";

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
        ChatRoom,
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
        const store = useStore()
        const open = computed(() => store.getters['chatModule/open'])
        const rooms = computed(() => store.getters['chatModule/rooms'])
        const room = computed(() => store.getters['chatModule/room'])

        function switchRoom(newRoomId){
           store.dispatch('chatModule/switchRoom', newRoomId)
        }

        function closeChat() {
            store.dispatch('chatModule/closeChat', room.value.id)
        }

        return {
            navigation,
            open,
            rooms,
            room,
            switchRoom,
            closeChat,
        }
    }
}
</script>
