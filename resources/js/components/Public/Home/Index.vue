<template>
  <div class="bg-white">
    <main>
      <!-- Hero section -->
      <div class="relative">
        <!-- Background image and overlap -->
        <div aria-hidden="true" class="hidden absolute inset-0 sm:flex sm:flex-col">
          <div class="flex-1 relative w-full bg-gray-800">
            <div class="absolute inset-0 overflow-hidden">
              <img src="https://scontent-prg1-1.xx.fbcdn.net/v/t1.6435-9/118409275_10157311805796651_3508298322493577023_n.jpg?_nc_cat=108&ccb=1-5&_nc_sid=e3f864&_nc_ohc=D_Iw2MZ9MeYAX8W9nhZ&_nc_ht=scontent-prg1-1.xx&oh=d144b5c692fe5f68f0d39b278c64215d&oe=6160D700" alt="" class="w-full h-full object-center object-cover" />
            </div>
            <div class="absolute inset-0 bg-gray-900 opacity-50" />
          </div>
          <div class="w-full bg-white h-32 md:h-40 lg:h-48" />
        </div>

        <div class="relative max-w-3xl mx-auto pb-96 px-4 text-center sm:pb-0 sm:px-6 lg:px-8">
          <!-- Background image and overlap -->
          <div aria-hidden="true" class="absolute inset-0 flex flex-col sm:hidden">
            <div class="flex-1 relative w-full bg-gray-800">
              <div class="absolute inset-0 overflow-hidden">
                <img src="https://tailwindui.com/img/ecommerce-images/home-page-04-hero-full-width.jpg" alt="" class="w-full h-full object-center object-cover" />
              </div>
              <div class="absolute inset-0 bg-gray-900 opacity-50" />
            </div>
            <div class="w-full bg-white h-48" />
          </div>
          <div class="relative py-32">
            <h1 class="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">Esportujeme</h1>
            <div class="mt-4 sm:mt-6">
              <a href="#" class="inline-block bg-indigo-600 border border-transparent rounded-md py-3 px-8 font-medium text-white hover:bg-indigo-700">Přihlásit se do turnaje!</a>
            </div>
          </div>
        </div>

        <section aria-labelledby="collection-heading" class="-mt-96 relative sm:mt-0">
          <h2 id="collection-heading" class="sr-only">Collections</h2>
          <div class="max-w-md mx-auto grid grid-cols-1 gap-y-6 px-4 sm:max-w-7xl sm:px-6 sm:grid-cols-3 sm:gap-y-0 sm:gap-x-6 lg:px-8 lg:gap-x-8">
            <div v-for="collection in collections" :key="collection.name" class="group relative h-96 bg-white rounded-lg shadow-xl sm:h-auto sm:aspect-w-4 sm:aspect-h-5">
              <div>
                <div aria-hidden="true" class="absolute inset-0 rounded-lg overflow-hidden">
                  <div class="absolute inset-0 overflow-hidden group-hover:opacity-75">
                    <img :src="collection.imageSrc" :alt="collection.imageAlt" class="w-full h-full object-center object-cover" />
                  </div>
                  <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50" />
                </div>
                <div class="absolute inset-0 rounded-lg p-6 flex items-end">
                  <div>
                    <p aria-hidden="true" class="text-sm text-white">
                      Klikni, zaregistruj se a hrej!
                    </p>
                    <h3 class="mt-1 font-semibold text-white">
                      <a :href="collection.href">
                        <span class="absolute inset-0" />
                        {{ collection.name }}
                      </a>
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

     

      <section aria-labelledby="perks-heading" class="bg-gray-50 border-t border-gray-200">
        <div class="max-w-7xl mx-auto py-24 px-4 sm:px-6 sm:py-32 lg:px-8">
          <div class="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-0">
            <div v-for="perk in perks" :key="perk.name" class="text-center md:flex md:items-start md:text-left lg:block lg:text-center">
              <div class="md:flex-shrink-0">
                <div class="flow-root">
                  <img class="-my-1 h-24 w-auto mx-auto" :src="perk.imageUrl" alt="" />
                </div>
              </div>
              <div class="mt-6 md:mt-0 md:ml-4 lg:mt-6 lg:ml-0">
                <h3 class="text-sm font-semibold tracking-wide uppercase text-gray-900">
                  {{ perk.name }}
                </h3>
                <p class="mt-3 text-sm text-gray-500">
                  {{ perk.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main> 
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


const collections = [
  {
    name: "FIFA22",
    href: '#',
    imageSrc: 'https://www.herni-svet.cz/wareImages/125/8/125872_or.jpg',
    imageAlt: 'Woman wearing a comfortable cotton t-shirt.',
  },
  {
    name: "NHL22",
    href: '#',
    imageSrc: 'https://www.xzone.cz/covergame/38893_original.jpg',
    imageAlt: 'Man wearing a comfortable and casual cotton t-shirt.',
  },
  {
    name: 'UFC22',
    href: '#',
    imageSrc: 'https://media.contentapi.ea.com/content/dam/gin/common/packart/ufc-ps4-packart.jpg',
    imageAlt: 'Person sitting at a wooden desk with paper note organizer, pencil and tablet.',
  },
]
const perks = [
  {
    name: 'Zaregistruj se u nás',
    imageUrl: 'https://tailwindui.com/img/ecommerce/icons/icon-returns-light.svg',
    description: 'No zjistil jsem že bude jebačka i tohle vymyslet nějaké texty nedělá mi to dobře',
  },
  {
    name: 'Přihlaš se do turnaje',
    imageUrl: 'https://tailwindui.com/img/ecommerce/icons/icon-calendar-light.svg',
    description:'Zároven by to chtělo sehnat i nějaké ikonky ted jsem se tím nechtěl zdržovat',
  },
  {
    name: 'Porovnej síly s ostatními soupeři',
    imageUrl: 'https://tailwindui.com/img/ecommerce/icons/icon-gift-card-light.svg',
    description: 'Je to Luxusní jak je propojené VUE + Template když to děláš takto neskutečný',
  },
  {
    name: 'Vyhrávej skvělé ceny',
    imageUrl: 'https://tailwindui.com/img/ecommerce/icons/icon-planet-light.svg',
    description: 'O hodně lepší docu než na BS o hodně lepší příklady ..... ',
  },
]

export default {
  components: {
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
    MenuIcon,
    QuestionMarkCircleIcon,
    SearchIcon,
    ShoppingBagIcon,
    XIcon,
  },
  setup() {
    const open = ref(false)

    return {
      collections,
      perks,
      open,
    }
  },
}
</script>