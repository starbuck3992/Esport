<template>
    <div class="grid-rows-1 gap-3">
        <div>
            <button v-on:click="socialAuth('google')"
                    class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <img class="w-12 h-12" src="/storage/images/social/btn_google_light_normal_ios.svg" alt="google_logo">
                <span>Pokračovat přes Google</span>
            </button>
        </div>
        <div>
            <button v-on:click="socialAuth('discord')"
                    class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <img class="w-12 h-12" src="/storage/images/social/f_logo_RGB-Blue_58.png" alt="discord_logo">
                <span>Pokračovat přes Discord</span>
            </button>
        </div>
        <div>
            <button v-on:click="socialAuth('twitch')"
                    class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <img class="w-12 h-12" src="/storage/images/social/TwitchExtrudedWordmarkPurple.svg" alt="twitch_logo">
                <span>Pokračovat přes Twitch</span>
            </button>
        </div>
    </div>
</template>

<script>
import {useStore} from "vuex";

export default {
    setup() {
        const store = useStore();

        function socialAuth(provider) {
            store.dispatch('userModule/socialAuth', provider).then((response) => {
                window.location.href = response.data.url;
            }).catch((error) => {
                if (error.response) {
                    setTimeout(() => store.dispatch('messagesModule/showException', error.response.data.message), 250);
                } else {
                    console.log(error);
                }
            })
        }
        return {
            socialAuth
        }
    }
}
</script>
