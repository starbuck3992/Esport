<template>
        <div class="container">
            <h2>Zapomenuté heslo</h2>
            <div class="center">
                <form
                    @submit.prevent="forgotPassword"
                >
                    <label for="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        v-model="email"
                        autocomplete="email"
                        placeholder="messi@barcelona.com"
                        class="mb-4"
                    />
                    <button class="btn btn-primary" type="submit" :disabled="disabled">Odešli</button>
                </form>
            </div>
        </div>
</template>

<script>
import API from "../../services/api";
import {mapState} from "vuex";
export default {
    name: "ForgotPassword",
    data() {
        return {
            email: null,
            error: null,
            message: null,
            disabled: false,
        };
    },
    computed: {
        ...mapState(['loading'])
    },
    methods: {
        forgotPassword() {
            this.error = null;
            this.message = null;
            const payload = {
                email: this.email,
            };
            this.disabled = true;
            this.$store.commit('setLoading', true);
            API.forgotPassword(payload)
                .then(
                    () => {
                        this.message = 'E-mail s instrukcemi pro resetování hesla byl odeslán.'
                        this.$store.commit('setLoading', false)
                    }
                )
                .catch((error) => {
                    this.$store.commit('setLoading', false)
                    this.disabled = false;
                })
        },
    },
};
</script>
