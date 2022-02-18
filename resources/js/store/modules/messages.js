const messagesModule = {
    namespaced: true,
    state: {
        success: {
            show: false,
            message: null
        },
        exception: {
            show: false,
            message: null
        }
    },
    getters: {
        success(state) {
            return state.success;
        },
        exception(state) {
            return state.exception;
        }
    },
    mutations: {
        setSuccess(state, message) {
            state.success.message = message;
            state.success.show = true;
        },
        setException(state, message) {
            state.exception.message = message;
            state.exception.show = true;
        },
        clearSuccess(state) {
            state.success.show = false;
            state.success.message = null;
        },
        clearException(state) {
            state.exception.show = false;
            state.exception.message = null;
        }
    },
    actions: {
        showSuccess({commit}, message) {
            commit('setSuccess', message);
        },
        showException({commit}, message) {
            commit('setException', message);
        }
    }
}

export default messagesModule;
