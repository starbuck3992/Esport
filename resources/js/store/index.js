import {createStore} from 'vuex'
import createPersistedState from 'vuex-persistedstate';
import router from '../router/index';
import API from "../services/api";

const store = createStore(
    {
        plugins: [createPersistedState()],
        state: {
            user: null,
            permission: [],
            loading: false
        },
        getters: {
            authUser(state) {
                return state.user;
            },
            loggedIn(state) {
                return !!state.user;
            },
            loading(state) {
                return state.loading;
            },
        },
        mutations: {
            createSession(state, user) {
                state.user = user.name
                state.permission = user.permissions
            },
            destroySession(state) {
                state.user = null
                state.permission = []
            },
            setLoading(state, loading) {
                state.loading = loading
            }
        },
        actions: {
            register({commit}, payload) {
                return API.registerUser(payload)
                    .then(response => commit('createSession', response.data))
            },
            login({commit}, payload) {
                commit('setLoading', true);
                return API.login(payload)
                    .then(response =>
                            commit('createSession', response.data,),
                        commit('setLoading', false))
            },
            logout({commit}) {
                return API.logout()
                    .then(() => {
                        commit('destroySession');
                        if (router.currentRoute.name !== 'login')
                            router.push({name: 'login'})
                    })
            },
        }
    }
)

export default store;
