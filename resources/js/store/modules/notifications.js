import api from "../../services/api";
import store from "../index";

const notificationModule = {
    namespaced: true,
    state: {
        notifications: [],
    },
    getters: {
        notifications(state) {
            return state.notifications
        },
        notificationsCount(state) {
            return state.notifications.length
        }
    },
    mutations: {
        setNotification(state, notification) {
            state.notifications.push(notification)
        },
        setNotifications(state, notifications) {
            state.notifications.push(...notifications)
        },
        deleteSingleNotification(state, index) {
            state.notifications.splice(index, 1)
        },
        deleteAllNotifications(state) {
            state.notifications.splice(0)
        },
    },
    actions: {
        async getNotifications({commit, dispatch, rootGetters}) {

            try {

                const notifications = await api.getNotifications();
                commit('setNotifications', notifications.data);

                await Echo.private('user.' + rootGetters['userModule/user'].id)
                    .notification((notification) => {
                        commit('setNotification', notification)
                    })
            } catch (error) {

                dispatch('exceptionModule/showException', error.response.data.message, {root: true});

            }
        },
        readSingleNotification({commit, state}, index) {
            return api.markAsRead(state.notifications[index].id)
                .then(() => commit('deleteSingleNotification', index))
        },
        readAllNotifications({commit}) {
            return api.markAsRead()
                .then(() => commit('deleteAllNotifications'))
        }
    }
}

export default notificationModule;
