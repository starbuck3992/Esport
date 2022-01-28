<template>
    <div>
        <h1>Probíhá přihlašování, počkejte chvíli.</h1>
    </div>
</template>

<script>

import {onMounted} from 'vue'
import {useStore} from 'vuex'
import {useRoute} from 'vue-router'

export default {
    setup() {
        const route = useRoute()
        const store = useStore()
        const payload = {
            provider: route.params.provider,
            parameters: {
                state: route.query.state,
                code: route.query.code
            }
        }
        onMounted(() => {
            store.dispatch('socialLogin', payload).then(response =>
                window.location.href = response.data.meta.url
            )
        })
    }
}

</script>
