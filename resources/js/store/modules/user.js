import router from "../../router";
import Api from "../../services/api";

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
        async register({dispatch}, payload) {
            await Api.get('/sanctum/csrf-cookie');
            return Api.post('/register', payload);
        },
        async login({commit, dispatch}, payload) {
            await Api.get('/sanctum/csrf-cookie');
            return Api.post('/login', payload);
        },
        logout({commit, dispatch}) {
            Api.post('/logout').then(() => {
                commit('destroySession')
                dispatch('chatModule/clearRooms', null, {root: true})
            }).catch((error) => {
                    if (error.response) {
                        dispatch('exceptionModule/showException', error.response.data.message, {root: true});
                    } else {
                        console.log(error);
                    }
                }
            ).finally(
                router.push({name: 'homeIndex'})
            )
        }
    }
};

export default user;
