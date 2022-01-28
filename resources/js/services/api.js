import axios from "axios";
import store from "../store/index";

export const api = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    withCredentials: true,
});

// api.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     function (error) {
//         if (
//             [401, 403, 419].includes(error.response.status) &&
//             store.getters['authUser']
//         ) {
//             store.dispatch('logout')
//         }
//         return Promise.reject(error);
//     }
// );

export default {
    async login(payload) {
        await api.get("/sanctum/csrf-cookie");
        return api.post("/login", payload);
    },
    async socialAuth(provider) {
        await api.get("/sanctum/csrf-cookie");
        return api.get(`/api/authorize/${provider}/redirect`)
    },
    async socialLogin(provider, payload) {
        return api.get(`/api/authorize/${provider}/login`, {
                params: payload
            }
        )
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
    async register(payload) {
        await api.get("/sanctum/csrf-cookie");
        return api.post("/register", payload);
    },
    sendVerification(payload) {
        return api.post("/email/verification-notification", payload);
    },
    getUser(id) {
        return api.get(`/api/user/${id}`);
    },

    //Chat
    setOnline(payload) {
        return api.post('/api/chat/rooms', payload)
    },

   getRooms() {
        return api.get('/api/chat/rooms')
    },

    getMessages(roomId) {
        return api.get(`/api/chat/rooms/${roomId}/messages`)
    },

    sendMessage(roomId, payload) {
        return api.post(`/api/chat/rooms/${roomId}/messages`,
            payload, {
                headers: {
                    "X-Socket-Id": Echo.socketId()
                }
            }
        );
    },

    getNotifications() {
        return api.get('/api/notifications')
    },

    markAsRead(id) {
        if (id) {

            return api.put('/api/notifications',null,{params: {id: id}})

        } else {

            return api.put('/api/notifications')

        }
    },

    // searchUsers(payload){
    //     return api.post('api/users', payload)
    // }
};
