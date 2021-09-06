<template>
    <div class="container">
        <h2>Reset Password</h2>
        <form
            @submit.prevent="resetPassword"
        >
            <div>
                <label for="email">Email</label>
                <input
                    type="email"
                    id="email"
                    v-model="email"
                />
            </div>
            <div>
                <label for="password">Password</label>
                <input
                    type="password"
                    id="password"
                    v-model="password"
                />
            </div>
            <div>
                <label for="password-confirm">Confirm Password</label><br>
                <input
                    type="password"
                    id="password-confirm"
                    v-model="passwordConfirm"
                />
            </div>
            <button type="submit">Reset Password</button>
        </form>
    </div>
</template>

<script>
import API from "../../services/api";
export default {
    name: "ResetPassword",
    data() {
        return {
            email: null,
            password: null,
            passwordConfirm: null,
            error: null,
            message: null,
        };
    },
    methods: {
        resetPassword() {
            this.error = null;
            this.message = null;
            const payload = {
                email: this.email,
                password: this.password,
                password_confirmation: this.passwordConfirm,
                token: this.$route.query.token,
            };
            API.resetPassword(payload)
                .then(() => (this.message = "Password reset."))
        },
    },
};
</script>
