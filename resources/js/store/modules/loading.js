const loadingModule = {
    namespaced: true,
    state: {
        loading: false
    },
    getters: {
        loading(state) {
            return state.loading
        }
    },
    mutations: {
        setLoading(state, newLoadingStatus) {
            state.loading = newLoadingStatus
        }
    },
    actions: {
        loading({commit}, payload) {
            commit('setLoading', payload)
        }
    }
}

export default loadingModule
