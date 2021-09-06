<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12">
                <form @submit.prevent="login">
                    <div class="form-label-group">
                        <input id="email" type="email" class="form-control" placeholder="Email" v-model="email"
                               required>
                    </div>
                    <div class="form-label-group">
                        <input id="password" type="password" class="form-control" placeholder="Heslo" v-model="password"
                               required autocomplete="on">
                    </div>
                    <button class="btn-primary" type="submit">Přihlásit</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            email: null,
            password: null,
            remember: null,
            error: null,
        };
    },
    methods: {
        async login() {
            const payload = {
                email: this.email,
                password: this.password,
            };
            await this.$store.dispatch('login', payload).then(() => {
                this.$router.push({path: '/'});
            }).catch((error) => {
            });
        }
    }
};
</script>
