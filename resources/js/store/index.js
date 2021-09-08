import {createStore} from 'vuex'
import createPersistedState from 'vuex-persistedstate';
import router from '../router/index';
import API from "../services/api";

const store = createStore(
    {
        plugins: [createPersistedState()],
        state: {
            user: null
        },
        getters: {
            user(state) {
                return state.user;
            },
            loggedIn(state) {
                return !!state.user;
            }
        },
        mutations: {
            createSession(state, user) {
                state.user = user.name
            },
            destroySession(state) {
                state.user = null
            }
        },
        actions: {
            register({commit}, payload) {
                return API.registerUser(payload)
                    .then(response => commit('createSession', response.data))
            },
            login({commit}, payload) {
                return API.login(payload)
                    .then(response => commit('createSession', response.data))
            },
            logout({commit}) {
                return API.logout()
                    .then(() => {
                        commit('destroySession');
                        router.push({name: 'login'})
                    })
            },
        }
    }
)

export default store;
