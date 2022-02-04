<template>
    <a href="#" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']" @click="logout">Odhlášení</a>
</template>

<script>
import {useStore} from 'vuex'
import {toRefs} from 'vue'
export default {
    props: {
        active: {
            type: Boolean
        }
    },
    setup(props) {
        const {active} = toRefs(props)
        const store = useStore()
        async function logout(){
            await store.dispatch('userModule/logout')
        }
        return {
            active,
            logout
        }
    }
};
</script>

