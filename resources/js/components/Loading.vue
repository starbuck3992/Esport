<template>
    <div class="fixed w-screen h-screen bg-gray-300 z-75 top-0 opacity-70" v-show="show">
    </div>
    <div class="loader" v-show="show"><img src="https://icon-library.com/images/carpentry-icon/carpentry-icon-15.jpg" alt=""/></div>
</template>

<script>
import {computed, ref, watch} from 'vue'
import {useStore} from 'vuex'

export default {
    setup() {
        const store = useStore()
        const show = ref(false)
        const loading = computed(() => store.getters['loadingModule/loading'])

        watch(loading, (val) => {
            show.value = !!val
        })
        return {
            show
        }
    }
}
</script>
