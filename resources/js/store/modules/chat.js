import Api from '../../services/api';
import moment from 'moment';

const chatModule = {
    namespaced: true,
    state: {
        open: false,
        rooms: [],
        activeRoom: {
            id: null,
            name: null,
            users: [],
            messages: []
        }
    },
    getters: {
        open(state) {
            return state.open;
        },
        activeRoom(state) {
            return state.activeRoom;
        },
        rooms(state) {
            return state.rooms;
        },
        roomExist(state) {
            return !!state.activeRoom.id;
        }
    },
    mutations: {
        setOpen(state, newState) {
            state.open = newState;
        },
        setActiveRoom(state, room) {
            state.activeRoom.id = room.id;
            state.activeRoom.name = room.name;
            state.activeRoom.users = room.users;
        },
        setRooms(state, rooms) {
            state.rooms.push(...rooms);
        },
        filterRoom(state, roomId) {
            let filteredRoom = state.rooms.filter(function (room) {
                return room.id === roomId;
            })[0];
            state.activeRoom.id = filteredRoom.id;
            state.activeRoom.name = filteredRoom.name;
            state.activeRoom.users = filteredRoom.users;
        },
        setUnreadMessagesCount(state, roomId) {
            let roomIndex = state.rooms.findIndex((obj => obj.id === roomId));
            state.rooms[roomIndex].unreadMessagesCount = 0;
        },
        setMessages(state, messages) {
            state.activeRoom.messages = messages;
        },
        addMessage(state, message) {
            state.activeRoom.messages.push(message);
        },
        setLatestMessage(state, payload) {
            let roomIndex = state.rooms.findIndex((obj => obj.id === payload.roomId));
            state.rooms[roomIndex].latestMessage = payload.message;
        },
        setTyping(state, newState) {
            state.activeRoom.users[0].typing = newState;
        },
        setOnline(state, payload) {
            let roomIndex = state.rooms.findIndex((obj => obj.id === state.activeRoom.id));

            state.rooms[roomIndex].users[0].online = payload.newState;
            state.activeRoom.users[0].online = payload.newState;
        },
        clearRooms(state) {
            state.rooms = [];
            state.activeRoom.id = null;
            state.activeRoom.name = null;
            state.activeRoom.image = null;
            state.activeRoom.users = [];
            state.activeRoom.messages = [];
        }
    },
    actions: {
        clearRooms({commit}) {
            commit('clearRooms');
        },

        getRooms({commit}) {
            return new Promise((resolve, reject) => {
                Api.get('/api/chat/rooms').then((response) => {
                    if (response.data.data.length) {
                        commit('setRooms', response.data.data);
                        commit('setActiveRoom', response.data.data[0]);
                    }
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                })
            })
        },

        getMessages({commit, state}) {
            return new Promise((resolve, reject) => {
                Api.get(`/api/chat/rooms/${state.activeRoom.id}/messages`).then((response) => {
                        commit('setMessages', response.data);
                        resolve(response);
                    }
                ).catch((error) => {
                    reject(error);
                })
            })
        },

        setOnline({state}) {
            return new Promise((resolve, reject) => {
                Api.post(`/api/chat/rooms/${state.activeRoom.id}/setOnline`, null).then((response) => {
                        resolve(response);
                    }
                ).catch((error) => {
                    reject(error);
                })
            })
        },

        postMessage({commit, state}, message) {
            return new Promise((resolve, reject) => {
                Api.post(`/api/chat/rooms/${state.activeRoom.id}/messages`, {message: message}, {
                    "X-Socket-Id": Echo.socketId()
                }).then((response) => {
                        resolve(response);
                    }
                ).catch((error) => {
                    reject(error);
                })
            })
        },

        async connectChannel({commit, state, dispatch}, roomId) {

            let timer;

            if (roomId !== state.activeRoom.id) {
                commit('filterRoom', roomId);
            }

            await dispatch('getMessages');
            await dispatch('setOnline');

            commit('setUnreadMessagesCount', roomId);

            await Echo.join('chat.' + roomId)
                .joining((e) => {
                    let payload = {
                        userId: e.id,
                        newState: 1
                    }
                    commit('setOnline', payload);
                })
                .leaving((e) => {
                    let payload = {
                        userId: e.id,
                        newState: 0
                    }
                    commit('setOnline', payload);
                })
                .listen('MessageSent', (e) => {
                    commit('addMessage', e);
                })
                .listenForWhisper('Typing', (e) => {
                    commit('setTyping', 1);
                    clearTimeout(timer);
                    timer = setTimeout(() => {
                        commit('setTyping', 0);
                    }, 1000)
                })
        },

        async disconnectChannel({commit, state}, roomId) {
            await Echo.leave('chat.' + roomId);
        },

        async openChat({commit, state, dispatch, getters}, roomId = state.activeRoom.id) {
            commit('setOpen', true);
            await dispatch('connectChannel', roomId);
        },

        async closeChat({commit, dispatch}, roomId) {
            commit('setOpen', false);
            await dispatch('disconnectChannel', roomId);
        },

        async switchRoom({commit, state, dispatch}, newRoomId) {
            if (state.activeRoom.id !== newRoomId) {
                await dispatch('disconnectChannel', state.activeRoom.id);
                await dispatch('connectChannel', newRoomId);
            }
        },

        async sendMessage({commit, state, dispatch, rootGetters}, newMessage) {

            await dispatch('postMessage', newMessage);

            let timestamp = moment().format('DD MMMM');
            let payload = {
                roomId: state.activeRoom.id,
                message: {
                    message: 'Já: ' + newMessage,
                    timestamp: timestamp
                }
            }
            commit('setLatestMessage', payload);
            commit('addMessage', {
                    message: newMessage,
                    timestamp: timestamp,
                    self: true
                }
            )
        }
    }
}

export default chatModule;
