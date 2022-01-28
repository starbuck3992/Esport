const exceptionModule = {
    namespaced: true,
    state: {
        show: false,
        exception: {
            message: null
        }
    },
    getters: {
        show(state) {
            return state.show
        },
        exception(state) {
            return state.exception
        }
    },
    mutations: {
        setShow(state) {
            state.show = true
        },
        setException(state, exception) {
            state.exception.message = exception
        },
        clearException(state) {
            state.show = false
            state.exception.message = null
        }
    },
    actions: {
        showException({commit}, exception) {
            commit('setShow')
            commit('setException', exception)
        },
        closeException({commit}) {
            commit('clearException')
        }
    }
}

export default exceptionModule
