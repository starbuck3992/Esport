import axios from "axios";
import store from "../store/index";

export const api = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    withCredentials: true,
});

api.interceptors.response.use(
    (response) => {
        return response;
    },
    function (error) {
        if (
            [401, 403, 419].includes(error.response.status) &&
            store.getters['authUser']
        ) {
            store.dispatch('logout')
        }
        return Promise.reject(error);
    }
);

export default {
    async login(payload) {
        await api.get("/sanctum/csrf-cookie");
        return api.post("/login", payload);
    },
    logout() {
        return api.post("/logout");
    },
    async forgotPassword(payload) {
        await api.get("/sanctum/csrf-cookie");
        return api.post("/forgot-password", payload);
    },
    async resetPassword(payload) {
        await api.get("/sanctum/csrf-cookie");
        return api.post("/reset-password", payload);
    },
    updatePassword(payload) {
        return api.put("/user/password", payload);
    },
    async registerUser(payload) {
        await api.get("/sanctum/csrf-cookie");
        return api.post("/register", payload);
    },
    sendVerification(payload) {
        return api.post("/email/verification-notification", payload);
    }
};
