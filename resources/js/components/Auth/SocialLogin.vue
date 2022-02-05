<template>
    <div>
        <h1>Probíhá přihlašování, počkejte chvíli.</h1>
    </div>
</template>

<script>

import {onMounted} from "vue";
import {useStore} from "vuex";
import {useRoute} from "vue-router";
import router from "../../router";

export default {
    setup() {
        const route = useRoute();
        const store = useStore();
        const payload = {
            provider: route.params.provider,
            parameters: {
                state: route.query.state,
                code: route.query.code
            }
        }
        onMounted(async () => {
            try{
                let response = await store.dispatch('userModule/socialLogin', payload);
                window.location.href = response.data.meta.url;
            } catch (error) {
                if (error.response) {
                    setTimeout(() => store.dispatch('messagesModule/showException', error.response.data.message), 250);
                    await router.push({name: 'homeIndex'});
                } else {
                    console.log(error);
                }
            }
        })
    }
}

</script>
