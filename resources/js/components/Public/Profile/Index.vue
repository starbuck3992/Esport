<template>
  <div>
    <Disclosure as="div" class="relative bg-sky-700 pb-32 overflow-hidden" v-slot="{ open }">
      <div aria-hidden="true" :class="[open ? 'bottom-0' : 'inset-y-0', 'absolute inset-x-0 left-1/2 transform -translate-x-1/2 w-full overflow-hidden lg:inset-y-0']">
        <div class="absolute inset-0 flex">
          <div class="h-full w-1/2" style="background-color: #0a527b;" />
          <div class="h-full w-1/2" style="background-color: #065d8c;" />
        </div>
        <div class="relative flex justify-center">
          <svg class="flex-shrink-0" width="1750" height="308" viewBox="0 0 1750 308" xmlns="http://www.w3.org/2000/svg">
            <path d="M284.161 308H1465.84L875.001 182.413 284.161 308z" fill="#0369a1" />
            <path d="M1465.84 308L16.816 0H1750v308h-284.16z" fill="#065d8c" />
            <path d="M1733.19 0L284.161 308H0V0h1733.19z" fill="#0a527b" />
            <path d="M875.001 182.413L1733.19 0H16.816l858.185 182.413z" fill="#0a4f76" />
          </svg>
        </div>
      </div>
      <header class="relative py-10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 class="text-3xl font-bold text-white">
            Uživatelský profil
          </h1>
        </div>
      </header>
    </Disclosure>

    <main class="relative -mt-32">
      <div class="max-w-screen-xl mx-auto pb-6 px-4 sm:px-6 lg:pb-16 lg:px-8">
        <div class="bg-white rounded-lg shadow overflow-hidden">
          <div class="divide-y divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-y-0 lg:divide-x">
            <aside class="py-6 lg:col-span-3">
              <nav class="space-y-1">
                <router-link :to="{ name: 'profileInformation' }" @click="activate(1)" :class="[active_el === 1 ? 'bg-teal-50 border-teal-500 text-teal-700 hover:bg-teal-50 hover:text-teal-700' : 'border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900', 'group border-l-4 px-3 py-2 flex items-center text-sm font-medium']">
                  <component :is="UserCircleIcon" :class="[active_el === 1 ? 'text-teal-500 group-hover:text-teal-500' : 'text-gray-400 group-hover:text-gray-500', 'flex-shrink-0 -ml-1 mr-3 h-6 w-6']" />
                  <span class="truncate">
                    Profil
                  </span>
                </router-link>
                <router-link :to="{ name: 'profilePassword' }" @click="activate(2)" :class="[active_el === 2 ? 'bg-teal-50 border-teal-500 text-teal-700 hover:bg-teal-50 hover:text-teal-700' : 'border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900', 'group border-l-4 px-3 py-2 flex items-center text-sm font-medium']">
                  <component :is="KeyIcon" :class="[active_el === 2 ? 'text-teal-500 group-hover:text-teal-500' : 'text-gray-400 group-hover:text-gray-500', 'flex-shrink-0 -ml-1 mr-3 h-6 w-6']" />
                  <span class="truncate">
                    Heslo
                  </span>
                </router-link>
              </nav>
            </aside>
             <router-view></router-view>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { ref } from 'vue'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/vue'
import { SearchIcon } from '@heroicons/vue/solid'
import {
  BellIcon,
  CogIcon,
  CreditCardIcon,
  KeyIcon,
  MenuIcon,
  UserCircleIcon,
  ViewGridAddIcon,
  XIcon,
} from '@heroicons/vue/outline'

/*
const subNavigation = [
        { name: 'Profil', href: profile, icon: UserCircleIcon, current: true, },
        { name: 'Účet', href: '#', icon: CogIcon, current: false },
        { name: 'Heslo', href: password, icon: KeyIcon, current: false },
        { name: 'Upozornění', href: '#', icon: BellIcon, current: false },
        //{ name: 'Billing', href: '#', icon: CreditCardIcon, current: false },
        //{ name: 'Integrations', href: '#', icon: ViewGridAddIcon, current: false },
      ]
*/
export default {
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    BellIcon,
    MenuIcon,
    SearchIcon,
    XIcon,
  },
  setup() {
    const active_el = 1;
    return {
      UserCircleIcon,
      KeyIcon,
      active_el,
    }
  },
  methods:{
    activate:function(el){
        this.active_el = el;
    }
  }
}
</script>
