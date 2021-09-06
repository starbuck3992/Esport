<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12">
                <form @submit.prevent="registerUser">
                    <div class="form-label-group">
                        <input id="name" type="text" class="form-control" placeholder="Jméno"
                               v-model="name" required>
                    </div>
                    <div class="form-label-group">
                        <input id="email" type="email" class="form-control" placeholder="Email"
                               v-model="email" required>
                    </div>
                    <div class="form-label-group">
                        <input id="password" type="password" class="form-control" placeholder="Heslo"
                               v-model="password" required autocomplete="on">
                    </div>
                    <div class="form-label-group">
                        <input id="password_confirm" type="password" class="form-control"
                               placeholder="Heslo znovu" v-model="passwordConfirm" required autocomplete="on">
                    </div>
                    <button
                        class="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2"
                        type="submit" :disabled="disabled">Zaregistrovat se
                    </button>
                    <div class="text-center">
                        <router-link :to="{ name: 'login' }" class="text-sm base-link">Už jsi
                            zaregistrován? Pokračuj na přihlášení
                        </router-link>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            name: null,
            email: null,
            password: null,
            passwordConfirm: null,
            error: null,
            disabled: false
        }
    },
    methods: {
        async registerUser() {
            this.error = null;
            this.disabled = true;
            const payload = {
                name: this.name,
                email: this.email,
                password: this.password,
                password_confirmation: this.passwordConfirm,
            };
            await this.$store.dispatch('register', payload).then(() => {
                this.$router.push({path: '/'});
            }).catch((error) => {
                this.disabled = false;
            });
        },
    }
}
</script>
