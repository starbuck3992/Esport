import Api from "../../services/api";
import Echo from "laravel-echo";

const user = {
    namespaced: true,
    state: {
        user: {
            id: null,
            nick: null,
            avatar: null
        },
    },
    getters: {
        user(state) {
            return state.user;
        },
        loggedIn(state) {
            return !!state.user.id;
        }
    },
    mutations: {
        createSession(state, user) {
            state.user.id = user.id;
            state.user.nick = user.nick;
            state.user.avatar = user.avatar;
        },
        destroySession(state) {
            Object.keys(state.user).forEach(k => state.user[k] = null);
        }
    },
    actions: {
        authorizePusher({}) {
            window.Echo = new Echo({
                broadcaster: 'pusher',
                key: process.env.MIX_PUSHER_APP_KEY,
                cluster: process.env.MIX_PUSHER_APP_CLUSTER,
                forceTLS: true,
                authorizer: (channel) => {
                    return {
                        authorize: (socketId, callback) => {
                            Api.post('/api/broadcasting/auth', {
                                socket_id: socketId,
                                channel_name: channel.name
                            })
                                .then(response => {
                                    callback(false, response.data)
                                })
                                .catch(error => {
                                    callback(true, error)

                                })
                        }
                    }
                },
            })
        },

        async register({}, payload) {
            await Api.get('/sanctum/csrf-cookie');
            return new Promise((resolve, reject) => {
                Api.post('/register', payload).then((response) => {
                    resolve(response)
                }).catch((error) => {
                    reject(error)
                })
            })
        },
        async socialAuth({}, provider) {
            console.log(provider)
            await Api.get('/sanctum/csrf-cookie');
            return new Promise((resolve, reject) => {
                Api.get(`/api/authorize/${provider}/redirect`).then((response) => {
                    resolve(response)
                }).catch((error) => {
                    reject(error)
                })
            })
        },
        socialLogin({commit, getters}, payload) {
            return new Promise((resolve, reject) => {
                Api.get(`/api/authorize/${payload.provider}/login`, payload.parameters).then((response) => {
                    if (!getters['loggedIn']) {
                        commit('createSession', response.data.data);
                    }
                    resolve(response)
                }).catch((error) => {
                    reject(error)
                })
            })
        },
        async login({commit}, payload) {
            await Api.get('/sanctum/csrf-cookie');
            return new Promise((resolve, reject) => {
                Api.post('/login', payload).then((response) => {
                    commit('createSession', response.data);
                    resolve(response)
                }).catch((error) => {
                    reject(error)
                })
            })
        },
        async forgotPassword({}, payload) {
            await Api.get('/sanctum/csrf-cookie');
            return new Promise((resolve, reject) => {
                Api.post('/forgot-password', payload).then((response) => {
                    resolve(response)
                }).catch((error) => {
                    reject(error)
                })
            })
        },
        logout({commit}) {
            return new Promise((resolve, reject) => {
                Api.post('/logout').then((response) => {
                    commit('destroySession')
                    resolve(response)
                }).catch((error) => {
                    reject(error)
                })
            })
        }
    }
};

export default user;
