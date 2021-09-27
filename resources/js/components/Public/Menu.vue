<template>
  <div class="bg-white">
    <!-- Login Modal -->
    <Login ref="login" />
    <!-- Register Modal -->
    <Register ref="register" />
    <!-- Chat User -->
    <ChatUsers ref="chatUsers" />
    <!-- Mobile menu -->
    <TransitionRoot as="template" :show="open">
      <Dialog as="div" class="fixed inset-0 flex z-10 lg:hidden" @close="open = false">
        <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100" leave-to="opacity-0">
          <DialogOverlay class="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <TransitionChild as="template" enter="transition ease-in-out duration-300 transform" enter-from="-translate-x-full" enter-to="translate-x-0" leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0" leave-to="-translate-x-full">
          <div class="relative max-w-xs w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto">
            <div class="px-4 pt-5 pb-2 flex">
              <button type="button" class="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400" @click="open = false">
                <span class="sr-only">Close menu</span>
                <XIcon class="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            <!-- Links -->
            <TabGroup as="div" class="mt-2">
              <div class="border-b border-gray-200">
                <TabList class="-mb-px flex px-4 space-x-8">
                  <Tab as="template" v-for="category in navigation.categories" :key="category.name" v-slot="{ selected }">
                    <button :class="[selected ? 'text-indigo-600 border-indigo-600' : 'text-gray-900 border-transparent', 'flex-1 whitespace-nowrap py-4 px-1 border-b-2 text-base font-medium']">
                      {{ category.name }}
                    </button>
                  </Tab>
                </TabList>
              </div>
              <TabPanels as="template">
                <TabPanel v-for="category in navigation.categories" :key="category.name" class="px-4 py-6 space-y-12">
                  <div class="grid grid-cols-2 gap-x-4 gap-y-10">
                    <div v-for="item in category.featured" :key="item.name" class="group relative">
                      <div class="aspect-w-1 aspect-h-1 rounded-md bg-gray-100 overflow-hidden group-hover:opacity-75">
                        <img :src="item.imageSrc" :alt="item.imageAlt" class="object-center object-cover" />
                      </div>
                      <a :href="item.href" class="mt-6 block text-sm font-medium text-gray-900">
                        <span class="absolute z-10 inset-0" aria-hidden="true" />
                        {{ item.name }}
                      </a>
                      <p aria-hidden="true" class="mt-1 text-sm text-gray-500">Zaregistrovat se!</p>
                    </div>
                  </div>
                </TabPanel>
              </TabPanels>
            </TabGroup>

            <div class="border-t border-gray-200 py-6 px-4 space-y-6">
              <div v-for="page in navigation.pages" :key="page.name" class="flow-root">
                <a :href="page.href" class="-m-2 p-2 block font-medium text-gray-900">{{ page.name }}</a>
              </div>
            </div>

            <div class="border-t border-gray-200 py-6 px-4 space-y-6">
              <div class="flow-root">
                <a href="#" class="-m-2 p-2 block font-medium text-gray-900" @click="openRegister">Vytvořit účet</a>
              </div>
              <div class="flow-root">
                <a href="#" class="-m-2 p-2 block font-medium text-gray-900" @click="openLogin">Přihlásit se</a>
              </div>
            </div>

            <div class="border-t border-gray-200 py-6 px-4 space-y-6">
              <!-- Currency selector -->
              <form>
                <div class="inline-block">
                  <div class="-ml-2 group relative border-transparent rounded-md focus-within:ring-2 focus-within:ring-white">
                    <div class="absolute right-0 inset-y-0 flex items-center pointer-events-none">
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </TransitionChild>
      </Dialog>
    </TransitionRoot>

    <header class="relative">
      <nav aria-label="Top">
        <!-- Top navigation -->
        <div class="bg-gray-900">
          <div class="max-w-7xl mx-auto h-10 px-4 flex items-center justify-between sm:px-6 lg:px-8">
            <!-- Currency selector -->
            <form>
              <div>
                <div class="-ml-2 group relative bg-gray-900 border-transparent rounded-md focus-within:ring-2 focus-within:ring-white">
                  <div class="absolute right-0 inset-y-0 flex items-center pointer-events-none">
                  </div>
                </div>
              </div>
            </form>

            <div class="flex items-center space-x-6">
              <a href="#" class="text-sm font-medium text-white hover:text-gray-100" @click="openLogin">Přihlásit se</a>
              <a href="#" class="text-sm font-medium text-white hover:text-gray-100" @click="openRegister">Vytvořit účet</a>
            </div>
          </div>
        </div>

        <!-- Secondary navigation -->
        <div class="bg-white">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="h-16 flex items-center justify-between">
              <!-- Logo (lg+) -->
              <div class="hidden lg:flex-1 lg:flex lg:items-center">
                <a href="#">
                  <span class="sr-only">Workflow</span>
                  <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600" alt="" />
                </a>
              </div>

              <div class="hidden h-full lg:flex">
                <!-- Flyout menus -->
                <PopoverGroup class="px-4 bottom-0 inset-x-0">
                  <div class="h-full flex justify-center space-x-8">
                    <Popover v-for="category in navigation.categories" :key="category.name" class="flex" v-slot="{ open }">
                      <div class="relative flex">
                        <PopoverButton :class="[open ? 'text-indigo-600' : 'text-gray-700 hover:text-gray-800', 'relative flex items-center justify-center transition-colors ease-out duration-200 text-sm font-medium']">
                          {{ category.name }}
                          <span :class="[open ? 'bg-indigo-600' : '', 'absolute z-10 -bottom-px inset-x-0 h-0.5 transition ease-out duration-200']" aria-hidden="true" />
                        </PopoverButton>
                      </div>

                      <transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0" enter-to-class="opacity-100" leave-active-class="transition ease-in duration-150" leave-from-class="opacity-100" leave-to-class="opacity-0">
                        <PopoverPanel class="absolute z-10 top-full inset-x-0 bg-white text-sm text-gray-500">
                          <!-- Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow -->
                          <div class="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />
                          <!-- Fake border when menu is open -->
                          <div class="absolute inset-0 top-0 h-px max-w-7xl mx-auto px-8" aria-hidden="true">
                            <div :class="[open ? 'bg-gray-200' : 'bg-transparent', 'w-full h-px transition-colors ease-out duration-200']" />
                          </div>

                          <div class="relative">
                            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                              <div class="grid grid-cols-4 gap-y-10 gap-x-8 py-16">
                                <div v-for="item in category.featured" :key="item.name" class="group relative">
                                  <div class="aspect-w-1 aspect-h-1 rounded-md bg-gray-100 overflow-hidden group-hover:opacity-75">
                                    <img :src="item.imageSrc" :alt="item.imageAlt" class="object-center object-cover" />
                                  </div>
                                  <a :href="item.href" class="mt-4 block font-medium text-gray-900">
                                    <span class="absolute z-10 inset-0" aria-hidden="true" />
                                    {{ item.name }}
                                  </a>
                                  <p aria-hidden="true" class="mt-1">Zaregistrovat se!</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </PopoverPanel>
                      </transition>
                    </Popover>

                    <a v-for="page in navigation.pages" :key="page.name" :href="page.href" class="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">{{ page.name }}</a>
                  </div>
                </PopoverGroup>
              </div>

              <!-- Mobile menu and search (lg-) -->
              <div class="flex-1 flex items-center lg:hidden">
                <button type="button" class="-ml-2 bg-white p-2 rounded-md text-gray-400" @click="open = true">
                  <span class="sr-only">Open menu</span>
                  <MenuIcon class="h-6 w-6" aria-hidden="true" />
                </button>

                <!-- Search -->
                <a href="#" class="ml-2 p-2 text-gray-400 hover:text-gray-500">
                  <span class="sr-only">Search</span>
                  <SearchIcon class="w-6 h-6" aria-hidden="true" />
                </a>
              </div>

              <!-- Logo (lg-) -->
              <a href="#" class="lg:hidden">
                <span class="sr-only">Workflow</span>
                <img src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600" alt="" class="h-8 w-auto" />
              </a>

              <div class="flex-1 flex items-center justify-end">
                <!-- Profile dropdown -->
                  <Menu as="div" class="ml-3 relative z-10">
                    <div>
                      <MenuButton class="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                        <span class="sr-only">Open user menu</span>
                        <img class="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                      </MenuButton>
                    </div>
                    <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                    <MenuItems class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                      <MenuItem v-slot="{ active }">
                        <a href="#" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">Your Profile</a>
                      </MenuItem>
                      <MenuItem v-slot="{ active }">
                        <a href="#" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">Settings</a>
                      </MenuItem>
                      <MenuItem v-slot="{ active }">
                        <a href="#" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">Sign out</a>
                      </MenuItem>
                    </MenuItems>
                  </transition>
                </Menu>

                <div class="flex items-center lg:ml-8">
                  <!-- Help -->
                  <a href="#" class="p-2 text-gray-400 hover:text-gray-500 lg:hidden">
                    <span class="sr-only">Info</span>
                    <QuestionMarkCircleIcon class="w-6 h-6" aria-hidden="true" />
                  </a>
                  <a href="#" class="hidden text-sm font-medium text-gray-700 hover:text-gray-800 lg:block">INFO</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>   
  </div>
</template>

<script>
import Login from '../Auth/Login'
import Register from '../Auth/Register'
import ChatUsers from '../Public/Chat/ChatUsers.vue'
import { ref } from 'vue'
import {
  Dialog,
  DialogOverlay,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import { MenuIcon, QuestionMarkCircleIcon, SearchIcon, ShoppingBagIcon, XIcon } from '@heroicons/vue/outline'

const navigation = {
  categories: [
    {
      name: 'Hry',
      featured: [
        {
          name: 'FIFA22',
          href: '#',
          imageSrc: 'https://www.herni-svet.cz/wareImages/125/8/125872_or.jpg',
          imageAlt: 'Nejnovětší a nejhranější simulátor fotbalu.',
        },
        {
          name: 'NHL',
          href: '#',
          imageSrc: 'https://www.xzone.cz/covergame/38893_original.jpg',
          imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
        },
        {
          name: 'UFC',
          href: '#',
          imageSrc: 'https://www.herni-svet.cz/wareImages/125/8/125872_or.jpg',
          imageAlt: 'Model wearing minimalist watch with black wristband and white watch face.',
        },
        {
          name: 'NBA',
          href: '#',
          imageSrc: 'https://www.xzone.cz/covergame/38893_original.jpg',
          imageAlt: 'Model opening tan leather long wallet with credit card pockets and cash pouch.',
        },
      ],
    },
    {
      name: 'Zařízení',
      featured: [
        {
          name: 'Playstation',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-01.jpg',
          imageAlt: 'Hats and sweaters on wood shelves next to various colors of t-shirts on hangers.',
        },
        {
          name: 'Xbox',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-02.jpg',
          imageAlt: 'Model wearing light heather gray t-shirt.',
        },
      ],
    },
    {
      name: 'Turnaje',
      featured: [
        {
          name: 'Turnaj FIFA22',
          href: '#',
          imageSrc: 'https://www.herni-svet.cz/wareImages/125/8/125872_or.jpg',
          imageAlt: '21.9.2021 Proběhne turnaj o skvělé ceny!!',
        },
        {
          name: 'Turnaj NHL22',
          href: '#',
          imageSrc: 'https://www.xzone.cz/covergame/38893_original.jpg',
          imageAlt: '21.9.2021 Proběhne turnaj o skvělé ceny!!',
        },
        {
          name: 'Turnaj NBA22',
          href: '#',
          imageSrc: 'https://www.xzone.cz/covergame/38893_original.jpg',
          imageAlt: '21.9.2021 Proběhne turnaj o skvělé ceny!!',
        },
        {
          name: 'Turnaj NHL22',
          href: '#',
          imageSrc: 'https://www.herni-svet.cz/wareImages/125/8/125872_or.jpg',
          imageAlt: '21.9.2021 Proběhne turnaj o skvělé ceny!!',
        },
        {
          name: 'Turnaj FIFA22',
          href: '#',
          imageSrc: 'https://www.xzone.cz/covergame/38893_original.jpg',
          imageAlt: '21.9.2021 Proběhne turnaj o skvělé ceny!!',
        },
        {
          name: 'Turnaj něco',
          href: '#',
          imageSrc: 'https://www.herni-svet.cz/wareImages/125/8/125872_or.jpg',
          imageAlt: '21.9.2021 Proběhne turnaj o skvělé ceny!!',
        },
      ],
    },
    {
      name: 'Další',
      featured: [
        {
          name: 'Ještě nevím něco vymyslíme',
          href: '#',
          imageSrc: 'https://www.herni-svet.cz/wareImages/125/8/125872_or.jpg',
          imageAlt: 'Hats and sweaters on wood shelves next to various colors of t-shirts on hangers.',
        },
        {
          name: 'Ještě nevím něco vymyslíme',
          href: '#',
          imageSrc: 'https://www.xzone.cz/covergame/38893_original.jpg',
          imageAlt: 'Model wearing light heather gray t-shirt.',
        },
        {
          name: 'Ještě nevím něco vymyslíme',
          href: '#',
          imageSrc: 'https://www.herni-svet.cz/wareImages/125/8/125872_or.jpg',
          imageAlt:
            'Grey 6-panel baseball hat with black brim, black mountain graphic on front, and light heather gray body.',
        },
        {
          name: 'Ještě nevím něco vymyslíme',
          href: '#',
          imageSrc: 'https://www.xzone.cz/covergame/38893_original.jpg',
          imageAlt: 'Model putting folded cash into slim card holder olive leather wallet with hand stitching.',
        },
      ],
    },
  ],
 /* pages: [
    { name: 'Company', href: '#' },
    { name: 'Stores', href: '#' },
  ],
  */
}

export default {
  components: {
    ChatUsers,
    Dialog,
    DialogOverlay,
    Login,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
    Register,
    Tab,
    TabGroup,
    TabList,
    TabPanel,
    TabPanels,
    TransitionChild,
    TransitionRoot,
    MenuIcon,
    QuestionMarkCircleIcon,
    SearchIcon,
    ShoppingBagIcon,
    XIcon,
  },
  setup() {
    const open = ref(false)

    return {
      navigation,
      open,
    }
  },
  methods: {
    openLogin() {
            this.$refs.login.open = true;
    },
    openRegister() {
            this.$refs.register.open = true;
    },
  }
}
</script>