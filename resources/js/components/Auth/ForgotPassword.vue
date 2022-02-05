<template>
    <div class="container">
        <h2>Zapomenuté heslo</h2>
        <div class="center">
            <form @submit.prevent="forgotPassword">
                <label for="email">Email</label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    v-model="form.email"
                    autocomplete="email"
                    placeholder="messi@barcelona.com"
                    class="mb-4"
                    required
                />
                <button class="btn btn-primary" type="submit">Odešli</button>
            </form>
        </div>
    </div>
</template>

<script>
import {reactive} from "vue";
import {useStore} from "vuex";
import Form from "../../utilities/form";
import router from "../../router";

export default {
    setup() {
        const form =
            reactive(new Form({
                email: ''
            }))
        const store = useStore();

        async function forgotPassword() {
            try {
                await store.dispatch('userModule/forgotPassword', form.data());
                form.reset()
                store.commit('messagesModule/setSuccess', 'E-mail s instrukcemi pro resetování hesla byl odeslán.')
                await router.push({name: 'homeIndex'});
            } catch (error) {
                if (error.response) {
                    form.reset()
                    store.commit('messagesModule/setException', error.response.data.message)
                } else {
                    console.log(error);
                }
            }
        }

        return {
            form,
            forgotPassword
        }
    }
}
</script>


