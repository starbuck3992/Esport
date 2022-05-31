import Api from "../../services/api";

const user = {
    namespaced: true,
    state: {
        user: {
            id: null,
            nick: null,
            avatar: null
        },
        language: 'cs'
    },
    getters: {
        user(state) {
            return state.user;
        },
        language(state) {
            return state.language;
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
        updateSession(state, user) {
            state.user.nick = user.nick;
            state.user.avatar = user.avatar;
        },
        destroySession(state) {
            Object.keys(state.user).forEach(k => state.user[k] = null);
        }
    },
    actions: {
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
                    commit('notificationsModule/deleteAllNotifications', null, {root: true})
                    commit('chatModule/clearRooms', null, {root: true})
                    resolve(response)
                }).catch((error) => {
                    reject(error)
                })
            })
        }
    }
};

export default user;
