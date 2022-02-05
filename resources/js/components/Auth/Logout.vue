<template>
    <a href="#" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']" @click="logout">Odhlášení</a>
</template>

<script>
import {useStore} from "vuex";
import {toRefs} from "vue";
import router from "../../router";

export default {
    props: {
        active: {
            type: Boolean
        }
    },
    setup(props) {
        const {active} = toRefs(props);
        const store = useStore();

        async function logout() {
            try {
                await store.dispatch('userModule/logout');
                await store.dispatch('notificationsModule/clearNotifications');
                await store.dispatch('chatModule/clearRooms');
                await router.push({name: 'homeIndex'});
            } catch (error) {
                if (error.response) {
                    setTimeout(() => store.commit('messagesModule/showException', error.response.data.message), 250)
                } else {
                    console.log(error);
                }
            }
        }

        return {
            active,
            logout
        }
    }
};
</script>
