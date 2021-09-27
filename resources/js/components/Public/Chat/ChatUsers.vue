<template>
<div class="fixed z-30 inset-0 overflow-hidden" :show="open">
  <div class="relative h-screen overflow-hidden bg-gray-100 flex flex-col z-30">
    <!-- Top nav-->
    <header class="flex-shrink-0 relative h-16 bg-white flex items-center">
      <!-- Logo area -->
      <div class="absolute inset-y-0 left-0 lg:static lg:flex-shrink-0">
        <a href="#" class="flex items-center justify-center h-16 w-16 bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-600 lg:w-20">
          <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark.svg?color=white" alt="Workflow" />
        </a>
      </div>

      <!-- Picker area 
      <div class="mx-auto lg:hidden">
        <div class="relative">
          <label for="inbox-select" class="sr-only">Choose inbox</label>
          <select id="inbox-select" class="rounded-md border-0 bg-none pl-3 pr-8 text-base font-medium text-gray-900 focus:ring-2 focus:ring-blue-600">
            <option value="/open">Open</option>
            <option value="/archived">Archived</option>
            <option value="/assigned">Assigned</option>
            <option value="/flagged">Flagged</option>
            <option value="/spam">Spam</option>
            <option value="/drafts">Drafts</option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center justify-center pr-2">
            <ChevronDownIcon class="h-5 w-5 text-gray-500" aria-hidden="true" />
          </div>
        </div>
      </div>-->

      <!-- Menu button area -->
      <div class="absolute inset-y-0 right-0 pr-4 flex items-center sm:pr-6 lg:hidden">
        <!-- Mobile menu button -->
        <button type="button" class="-mr-2 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-600" @click="open = true">
          <span class="sr-only">Open main menu</span>
          <MenuIcon class="block h-6 w-6" aria-hidden="true" />
        </button>
      </div>

      <!-- Desktop nav area -->
      <div class="hidden lg:min-w-0 lg:flex-1 lg:flex lg:items-center lg:justify-between">
        <div class="min-w-0 flex-1">
          <div class="max-w-2xl relative text-gray-400 focus-within:text-gray-500">
          <!--   <label for="desktop-search" class="sr-only">Search all inboxes</label>
            <input id="desktop-search" type="search" placeholder="Search all inboxes" class="block w-full border-transparent pl-12 placeholder-gray-500 focus:border-transparent sm:text-sm focus:ring-0" />
            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-4">
              <SearchIcon class="h-5 w-5" aria-hidden="true" />
            </div>-->
          </div>
        </div> 
        <div class="ml-10 pr-4 flex-shrink-0 flex items-center space-x-10">
          <nav aria-label="Global" class="flex space-x-10">
            <template v-for="item in navigation" :key="item.name">
              <Menu as="div" v-if="item.children.length" class="relative text-left">
                <MenuButton class="flex items-center text-sm font-medium text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600">
                  <span>{{ item.name }}</span>
                  <ChevronDownIcon class="ml-1 h-5 w-5 text-gray-500" aria-hidden="true" />
                </MenuButton>

                <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                  <MenuItems class="origin-top-right absolute z-30 right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div class="py-1">
                      <MenuItem v-for="child in item.children" :key="child.name" v-slot="{ active }">
                        <a @click="open = false" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">
                          {{ child.name }}
                        </a>
                      </MenuItem>
                    </div>
                  </MenuItems>
                </transition>
              </Menu>
              <a v-else :href="item.href" class="text-sm font-medium text-gray-900">{{ item.name }}</a>
            </template>
          </nav>
          <div class="flex items-center space-x-8">
            <span class="inline-flex">
              <a href="#" class="-mx-1 bg-white p-1 rounded-full text-gray-400 hover:text-gray-500">
                <span class="sr-only">View notifications</span>
                <BellIcon class="h-6 w-6" aria-hidden="true" />
              </a>
            </span>
          </div>
        </div>
      </div>

      <!-- Mobile menu, show/hide this `div` based on menu open/closed state -->
      <TransitionRoot as="template" :show="open">
        <Dialog as="div" class="fixed inset-0 z-40 lg:hidden" @close="open = false">
          <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100" leave-to="opacity-0">
            <DialogOverlay class="hidden sm:block sm:fixed sm:inset-0 sm:bg-gray-600 sm:bg-opacity-75" />
          </TransitionChild>

          <TransitionChild as="template" enter="transition ease-out duration-150 sm:ease-in-out sm:duration-300" enter-from="transform opacity-0 scale-110 sm:translate-x-full sm:scale-100 sm:opacity-100" enter-to="transform opacity-100 scale-100 sm:translate-x-0 sm:scale-100 sm:opacity-100" leave="transition ease-in duration-150 sm:ease-in-out sm:duration-300" leave-from="transform opacity-100 scale-100 sm:translate-x-0 sm:scale-100 sm:opacity-100" leave-to="transform opacity-0 scale-110 sm:translate-x-full sm:scale-100 sm:opacity-100">
            <nav class="fixed z-40 inset-0 h-full w-full bg-white sm:inset-y-0 sm:left-auto sm:right-0 sm:max-w-sm sm:w-full sm:shadow-lg" aria-label="Global">
              <div class="h-16 flex items-center justify-between px-4 sm:px-6">
                <a href="#">
                  <img class="block h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark.svg?color=cyan&shade=400" alt="Workflow" />
                </a>
                <button type="button" class="-mr-2 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-600" @click="open = false">
                  <span class="sr-only">Close main menu</span>
                  <XIcon class="block h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div class="mt-2 max-w-8xl mx-auto px-4 sm:px-6">
                <div class="relative text-gray-400 focus-within:text-gray-500">
                  <label for="mobile-search" class="sr-only">Search all inboxes</label>
                  <input id="mobile-search" type="search" placeholder="Search all inboxes" class="block w-full border-gray-300 rounded-md pl-10 placeholder-gray-500 focus:border-blue-600 focus:ring-blue-600" />
                  <div class="absolute inset-y-0 left-0 flex items-center justify-center pl-3">
                    <SearchIcon class="h-5 w-5" aria-hidden="true" />
                  </div>
                </div>
              </div>
              <div class="max-w-8xl mx-auto py-3 px-2 sm:px-4">
                <template v-for="item in navigation" :key="item.name">
                  <a @click="open = false" :href="item.href" class="block rounded-md py-2 px-3 text-base font-medium text-gray-900 hover:bg-gray-100">{{ item.name }}</a>
                  <a v-for="child in item.children" :key="child.name" :href="child.href" class="block rounded-md py-2 pl-5 pr-3 text-base font-medium text-gray-500 hover:bg-gray-100">{{ child.name }}</a>
                </template>
              </div>
            </nav>
          </TransitionChild>
        </Dialog>
      </TransitionRoot>
    </header>

    <!-- Bottom section -->
    <div class="min-h-0 flex-1 flex overflow-hidden">
      <!-- Main area -->
      <main class="min-w-0 flex-1 border-t border-gray-200 xl:flex">
        <section aria-labelledby="message-heading" class="min-w-0 flex-1 h-full flex flex-col overflow-hidden xl:order-last">
          <!-- Top section -->
          <div class="flex-shrink-0 bg-white border-b border-gray-200 py-6">
            <!-- Toolbar-->
            <div class="h-16 flex flex-col justify-center">
              <div class="px-4 sm:px-6 lg:px-8">
                <div class="py-3 flex justify-between">

                        <div class="flex items-center space-x-5 py-6">
                          <div class="flex-shrink-0">
                            <div class="relative">
                              <img class="h-16 w-16 rounded-full" src="https://scontent.fprg4-1.fna.fbcdn.net/v/t1.6435-9/106926036_1321479781529138_7875420984683671911_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=GwR7Tx8jQT0AX_o7z1f&_nc_ht=scontent.fprg4-1.fna&oh=a7ad94387a1f6d3249a4f8550d62d032&oe=616EBB36" alt="">
                              <span class="absolute inset-0 shadow-inner rounded-full" aria-hidden="true"></span>
                            </div>
                          </div>
                          <div>
                            <h1 class="text-2xl font-bold text-gray-900">Martin Cvešpr</h1>
                            <p class="text-sm font-medium text-gray-500">Vynálezce Kola <a href="#" class="text-gray-900">Dobrý kamarád</a> bohužel <time datetime="2020-08-25">moc daleko</time></p>
                          </div>
                        </div>
                  
                </div>
              </div>
            </div>
            <!-- Message header -->
          </div>

          <div class="min-h-0 flex-1 overflow-y-auto">
            <!-- Thread section-->
            <ul role="list" class="py-4 space-y-2 sm:px-6 sm:space-y-4 lg:px-8">
              <li v-for="item in message" :key="item.id" class="bg-white px-4 py-6 shadow sm:rounded-lg sm:px-6">
                <div class="sm:flex sm:justify-between sm:items-baseline">
                  <h3 class="text-base font-medium">
                    <span class="text-gray-900">{{ item.author }}</span>
                    {{ ' ' }}
                    <span class="text-gray-600">wrote</span>
                  </h3>
                  <p class="mt-1 text-sm text-gray-600 whitespace-nowrap sm:mt-0 sm:ml-3">
                    <time :datetime="item.datetime">{{ item.date }}</time>
                  </p>
                </div>
                <div class="mt-4 space-y-6 text-sm text-gray-800" v-html="item.body" />
              </li>
            </ul>
          </div>
          <div class="flex-shrink-0 bg-white border-b border-gray-200 py-6">
            <!-- Toolbar-->
            <div class="h-16 flex flex-col justify-center">
              <div class="px-4 sm:px-6 lg:px-8">
                <div class="py-3 flex justify-between">
                  <div class="w-full">
                        <textarea id="project-description" name="project-description" rows="3" class="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md"></textarea>
                      </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Message list-->
        <aside class="hidden xl:block xl:flex-shrink-0 xl:order-first">
          <div class="h-full relative flex flex-col w-96 border-r border-gray-200 bg-gray-100">
            <div class="flex-shrink-0">
              <div class="min-w-0 flex-1">
                <div class="max-w-2xl relative text-gray-400 focus-within:text-gray-500">
                  <label for="desktop-search" class="sr-only">Vyhledat uživatele</label>
                  <input id="desktop-search" type="search" placeholder="Vyhledat uživatele" class="block w-full border-transparent pl-12 placeholder-gray-500 focus:border-transparent sm:text-sm focus:ring-0" />
                  <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-4">
                    <SearchIcon class="h-5 w-5" aria-hidden="true" />
                  </div>
                </div>
              </div>
              <div class="border-t border-b border-gray-200 bg-gray-50 px-6 py-2 text-sm font-medium text-gray-500">
                Uživatelé online
              </div>
            </div>
            <nav aria-label="Message list" class="min-h-0 flex-1 overflow-y-auto">
              <ul role="list" class="border-b border-gray-200 divide-y divide-gray-200">
                <li v-for="person in team" :key="person.handle">
                    <div class="relative group py-6 px-5 flex items-center">
                      <a :href="person.href" class="-m-1 flex-1 block p-1">
                        <div class="absolute inset-0 group-hover:bg-gray-50" aria-hidden="true" />
                        <div class="flex-1 flex items-center min-w-0 relative">
                          <span class="flex-shrink-0 inline-block relative">
                            <img class="h-10 w-10 rounded-full" :src="person.imageUrl" alt="" />
                            <span :class="[person.status === 'online' ? 'bg-green-400' : 'bg-gray-300', 'absolute top-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white']" aria-hidden="true" />
                          </span>
                          <div class="ml-4 truncate">
                            <p class="text-sm font-medium text-gray-900 truncate">{{ person.name }}</p>
                            <p class="text-sm text-gray-500 truncate">{{ '@' + person.handle }}</p>
                          </div>
                        </div>
                      </a>
                      <Menu as="div" class="ml-2 flex-shrink-0 relative inline-block text-left">
                        <MenuButton class="group relative w-8 h-8 bg-white rounded-full inline-flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                          <span class="sr-only">Open options menu</span>
                          <span class="flex items-center justify-center h-full w-full rounded-full">
                            <DotsVerticalIcon class="w-5 h-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                          </span>
                        </MenuButton>
                        <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                          <MenuItems class="origin-top-right absolute z-10 top-0 right-9 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div class="py-1">
                              <MenuItem v-slot="{ active }">
                                <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">View profile</a>
                              </MenuItem>
                              <MenuItem v-slot="{ active }">
                                <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Send message</a>
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
</template>

<script>
import { ref } from 'vue'
import {
  Dialog,
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
  { name: 'Zavřít Chat', href: '#', children: [] },
]
const sidebarNavigation = [
  { name: 'Open', href: '#', icon: InboxIcon, current: true },
  { name: 'Archive', href: '#', icon: ArchiveIconOutline, current: false },
  { name: 'Customers', href: '#', icon: UserCircleIcon, current: false },
  { name: 'Flagged', href: '#', icon: FlagIcon, current: false },
  { name: 'Spam', href: '#', icon: BanIcon, current: false },
  { name: 'Drafts', href: '#', icon: PencilAltIcon, current: false },
]
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Sign out', href: '#' },
]
const message = [
    {
      id: 1,
      author: 'Největší Borec',
      date: 'Yesterday at 7:24am',
      datetime: '2021-01-28T19:24',
      body: "<p>Dodělat celé esportujeme bude ještě pořádní makačka.... Myslím si že se chat chylí ke zdárnému konci</p>",
    },
    {
      id: 2,
      author: 'Největší borec',
      date: 'Wednesday at 4:35pm',
      datetime: '2021-01-27T16:35',
      body: `
        <p>Budeme muset poladit ale tu text areu nějak at to není tak suchý ne?</p>
        <p>Marto mám tě rád... Seš dobrej kluk.... Nepočuráváš se a taaaak</p>
      `,
    },
    {
      id: 3,
      author: 'Největší borec',
      date: 'Wednesday at 4:09pm',
      datetime: '2021-01-27T16:09',
      body: `
        <p>Kryptoměny vydělají miliardy a bude :D </p>
        <p>A jestli nevydělají miliardy krypto... No tak budeme muset hodněěěě makaaaat :D</p>
      `,
    },
]
const team = [
  {
    name: 'Martin Cvešpr',
    handle: 'martincvespr',
    href: '#',
    imageUrl:
      'https://scontent.fprg4-1.fna.fbcdn.net/v/t1.6435-9/106926036_1321479781529138_7875420984683671911_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=GwR7Tx8jQT0AX_o7z1f&_nc_ht=scontent.fprg4-1.fna&oh=a7ad94387a1f6d3249a4f8550d62d032&oe=616EBB36',
    status: 'online',
  },
  {
    name: 'Martin Cvešpr',
    handle: 'martincvespr',
    href: '#',
    imageUrl:
      'https://scontent.fprg4-1.fna.fbcdn.net/v/t1.6435-9/106926036_1321479781529138_7875420984683671911_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=GwR7Tx8jQT0AX_o7z1f&_nc_ht=scontent.fprg4-1.fna&oh=a7ad94387a1f6d3249a4f8550d62d032&oe=616EBB36',
    status: 'online',
  },
  {
    name: 'Martin Cvešpr',
    handle: 'martincvespr',
    href: '#',
    imageUrl:
      'https://scontent.fprg4-1.fna.fbcdn.net/v/t1.6435-9/106926036_1321479781529138_7875420984683671911_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=GwR7Tx8jQT0AX_o7z1f&_nc_ht=scontent.fprg4-1.fna&oh=a7ad94387a1f6d3249a4f8550d62d032&oe=616EBB36',
    status: 'online',
  },
  {
    name: 'Martin Cvešpr',
    handle: 'martincvespr',
    href: '#',
    imageUrl:
      'https://scontent.fprg4-1.fna.fbcdn.net/v/t1.6435-9/106926036_1321479781529138_7875420984683671911_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=GwR7Tx8jQT0AX_o7z1f&_nc_ht=scontent.fprg4-1.fna&oh=a7ad94387a1f6d3249a4f8550d62d032&oe=616EBB36',
    status: 'online',
  },
  {
    name: 'Martin Cvešpr',
    handle: 'martincvespr',
    href: '#',
    imageUrl:
      'https://scontent.fprg4-1.fna.fbcdn.net/v/t1.6435-9/106926036_1321479781529138_7875420984683671911_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=GwR7Tx8jQT0AX_o7z1f&_nc_ht=scontent.fprg4-1.fna&oh=a7ad94387a1f6d3249a4f8550d62d032&oe=616EBB36',
    status: 'online',
  },
  {
    name: 'Martin Cvešpr',
    handle: 'martincvespr',
    href: '#',
    imageUrl:
      'https://scontent.fprg4-1.fna.fbcdn.net/v/t1.6435-9/106926036_1321479781529138_7875420984683671911_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=GwR7Tx8jQT0AX_o7z1f&_nc_ht=scontent.fprg4-1.fna&oh=a7ad94387a1f6d3249a4f8550d62d032&oe=616EBB36',
    status: 'online',
  },
  {
    name: 'Martin Cvešpr',
    handle: 'martincvespr',
    href: '#',
    imageUrl:
      'https://scontent.fprg4-1.fna.fbcdn.net/v/t1.6435-9/106926036_1321479781529138_7875420984683671911_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=GwR7Tx8jQT0AX_o7z1f&_nc_ht=scontent.fprg4-1.fna&oh=a7ad94387a1f6d3249a4f8550d62d032&oe=616EBB36',
    status: 'online',
  },
  {
    name: 'Martin Cvešpr',
    handle: 'martincvespr',
    href: '#',
    imageUrl:
      'https://scontent.fprg4-1.fna.fbcdn.net/v/t1.6435-9/106926036_1321479781529138_7875420984683671911_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=GwR7Tx8jQT0AX_o7z1f&_nc_ht=scontent.fprg4-1.fna&oh=a7ad94387a1f6d3249a4f8550d62d032&oe=616EBB36',
    status: 'online',
  },
  {
    name: 'Martin Cvešpr',
    handle: 'martincvespr',
    href: '#',
    imageUrl:
      'https://scontent.fprg4-1.fna.fbcdn.net/v/t1.6435-9/106926036_1321479781529138_7875420984683671911_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=GwR7Tx8jQT0AX_o7z1f&_nc_ht=scontent.fprg4-1.fna&oh=a7ad94387a1f6d3249a4f8550d62d032&oe=616EBB36',
    status: 'online',
  },
  {
    name: 'Martin Cvešpr',
    handle: 'martincvespr',
    href: '#',
    imageUrl:
      'https://scontent.fprg4-1.fna.fbcdn.net/v/t1.6435-9/106926036_1321479781529138_7875420984683671911_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=GwR7Tx8jQT0AX_o7z1f&_nc_ht=scontent.fprg4-1.fna&oh=a7ad94387a1f6d3249a4f8550d62d032&oe=616EBB36',
    status: 'online',
  },
  // More people...
]

export default {
  components: {
    Dialog,
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
    const open = ref(false)

    return {
      navigation,
      sidebarNavigation,
      userNavigation,
      message,
      open,
      team,
    }
  },
}
</script>