import api from '../../services/api'
import router from '../../router'

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
            return state.user
        },
        loggedIn(state) {
            return !!state.user.id
        }
    },
    mutations: {
        createSession(state, user) {
            Object.assign(state.user, user)
        },
        destroySession(state) {
            Object.keys(state.user).forEach(k => state.user[k] = null)
        }
    },
    actions: {
        login({commit, dispatch}, payload) {
            return api.login(payload)
                .then(response =>
                    commit('createSession', response.data)
                )
        },
        logout({commit}) {
            return api.logout()
                .then(() => {
                    commit('destroySession')
                })
                .finally(() => {
                    router.push({name: 'homeIndex'})
                })
        }
    }
}

export default user
