<template>
            <form class="divide-y divide-gray-200 lg:col-span-9" action="#" method="POST">
              <!-- Profile section -->
              <div class="py-6 px-4 sm:p-6 lg:pb-8">
                <div>
                  <h2 class="text-lg leading-6 font-medium text-gray-900">Password</h2>
                  <p class="mt-1 text-sm text-gray-500">
                    Nějaký text že to uvidí všichni spoluhráči/protihráči?
                  </p>
                </div>

                <div class="mt-6 flex flex-col lg:flex-row">
                  <div class="flex-grow space-y-6">
                    <div>
                      <label for="password" class="block text-sm font-medium text-gray-700">
                        Původní heslo
                      </label>
                      <div class="mt-1 rounded-md shadow-sm flex">
                        <input type="password" name="password" id="password" class="focus:ring-sky-500 focus:border-sky-500 flex-grow block w-full min-w-0 rounded-md sm:text-sm border-gray-300" :value="user.nickname" />
                      </div>
                    </div>

                    <div>
                      <label for="password_new" class="block text-sm font-medium text-gray-700">
                        Nové heslo
                      </label>
                      <div class="mt-1 rounded-md shadow-sm flex">
                        <input type="password" name="password_new" id="password_new" class="focus:ring-sky-500 focus:border-sky-500 flex-grow block w-full min-w-0 rounded-md sm:text-sm border-gray-300" :value="user.nickname" />
                      </div>
                    </div>

                    <div>
                      <label for="password_repeat" class="block text-sm font-medium text-gray-700">
                        Nové Heslo znovu
                      </label>
                      <div class="mt-1 rounded-md shadow-sm flex">
                        <input type="password" name="password_repeat" id="password_repeat" class="focus:ring-sky-500 focus:border-sky-500 flex-grow block w-full min-w-0 rounded-md sm:text-sm border-gray-300" :value="user.nickname" />
                      </div>
                    </div>
                    <div class="mt-4 py-4 px-4 flex justify-start sm:px-6">
                      <button type="button" class="ml-2 bg-blue-600	border border-gray-300 rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
                        Změnit heslo
                      </button>
                    </div>
                  </div>

                  <div class="mt-6 flex-grow lg:mt-0 lg:ml-6 lg:flex-grow-0 lg:flex-shrink-0">
                    <p class="text-sm font-medium text-gray-700" aria-hidden="true">
                      Profilová fotka
                    </p>
                    <div class="mt-1 lg:hidden">
                      <div class="flex items-center">
                        <div class="flex-shrink-0 inline-block rounded-full overflow-hidden h-12 w-12" aria-hidden="true">
                          <img class="rounded-full h-full w-full" :src="user.imageUrl" alt="" />
                        </div>
                        <div class="ml-5 rounded-md shadow-sm">
                          <div class="group relative border border-gray-300 rounded-md py-2 px-3 flex items-center justify-center hover:bg-gray-50 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-sky-500">
                            <label for="mobile-user-photo" class="relative text-sm leading-4 font-medium text-gray-700 pointer-events-none">
                              <span>Změnit</span>
                              <span class="sr-only"> Profilová fotka</span>
                            </label>
                            <input id="mobile-user-photo" name="user-photo" type="file" class="absolute w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md" />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div class="hidden relative rounded-full overflow-hidden lg:block">
                      <img class="relative rounded-full w-40 h-40" :src="user.imageUrl" alt="" />
                      <label for="desktop-user-photo" class="absolute inset-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center text-sm font-medium text-white opacity-0 hover:opacity-100 focus-within:opacity-100">
                        <span>Změnit</span>
                        <span class="sr-only"> Profilová fotka</span>
                        <input type="file" id="desktop-user-photo" name="user-photo" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md" />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </form>
</template>

<script>
import { ref } from 'vue'
import {
  XIcon,
} from '@heroicons/vue/outline'

const user = {
  name: 'Jaroslav',
  surname: 'Švardala',
  nickname: 'Svardys',
  email: 'j.svardala@example.com',
  imageUrl:
    'https://scontent.fprg4-1.fna.fbcdn.net/v/t1.18169-9/26994222_2020418768198719_4770828897441220768_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=174925&_nc_ohc=LCl173tKptIAX9zGL3q&_nc_ht=scontent.fprg4-1.fna&oh=43a176a3b57f95f1e8a5ce1cc4faebee&oe=616314A2',
}

export default {
  components: {
    XIcon,
  },
  setup() {

    return {
      user,
    }
  },
}
</script>