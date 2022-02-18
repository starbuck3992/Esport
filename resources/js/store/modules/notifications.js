import Api from "../../services/api";

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
        }
    },
    actions: {
        getNotifications({commit, rootGetters}) {
            return new Promise((resolve, reject) => {
                Api.get('/api/notifications').then((response) => {
                    commit('setNotifications', response.data);
                    Echo.private('user.' + rootGetters['userModule/user'].id)
                        .notification((notification) => {
                            commit('setNotification', notification)
                        })
                    resolve(response)
                }).catch((error) => {
                    reject(error)
                })
            })
        },
        readSingleNotification({commit, state}, index) {
            Api.put('/api/notifications', null, {id: state.notifications[index].id}).then(() =>
                commit('deleteSingleNotification', index)
            )
        },
        readAllNotifications({commit}) {
            Api.put('/api/notifications', null, null).then(() =>
                commit('deleteAllNotifications')
            )
        }
    }
}

export default notificationModule;
