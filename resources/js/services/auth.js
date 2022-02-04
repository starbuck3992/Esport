import axios from "axios";

export const auth =

export default class Auth{

    constructor() {
        axios.create({
            baseURL: process.env.VUE_APP_API_URL,
            withCredentials: true,
        })
    }


    async socialAuth(provider) {
        await auth.get("/sanctum/csrf-cookie");
        return auth.get(`/api/authorize/${provider}/redirect`);
    }
    socialLogin(provider, payload) {
        return auth.get(`/api/authorize/${provider}/login`, {
                params: payload
            }
        )
    }
    async forgotPassword(payload) {
        await auth.get("/sanctum/csrf-cookie");
        return auth.post("/forgot-password", payload);
    }
    async resetPassword(payload) {
        await auth.get("/sanctum/csrf-cookie");
        return auth.post("/reset-password", payload);
    }
    updatePassword(payload) {
        return auth.put("/user/password", payload);
    }

    sendVerification(payload) {
        return auth.post("/email/verification-notification", payload);
    }
}
