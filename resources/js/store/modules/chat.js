import Api from "../../services/api";

const chatModule = {
    namespaced: true,
    state: {
        open: false,
        rooms: [],
        room: {
            id: null,
            name: null,
            image: null,
            typing: {
                user: null
            },
            messages: []
        }
    },
    getters: {
        open(state) {
            return state.open;
        },
        room(state) {
            return state.room;
        },
        rooms(state) {
            return state.rooms;
        },
        roomExist(state) {
            return !!state.room.id;
        }
    },
    mutations: {
        setOpen(state, newState) {
            state.open = newState;
        },
        setRoom(state, room) {
            Object.assign(state.room, room);
        },
        setRooms(state, rooms) {
            state.rooms.push(...rooms);
        },
        filterRoom(state, roomId) {
            Object.assign(state.room, state.rooms.filter(function (room) {
                return room.id === roomId;
            })[0])
        },
        setMessages(state, messages) {
            state.room.messages = messages;
        },
        addMessage(state, message) {
            state.room.messages.push(message);
        },
        setTyping(state, user) {
            state.room.typing.user = user;
        },
        clearRooms(state) {
            state.rooms = [];
            state.room.id = null;
            state.room.name = null;
            state.room.image = null;
            state.room.typing.user = null;
            state.room.messages = [];
        }
    },
    actions: {
        clearRooms({commit}) {
            commit('clearRooms');
        },

        getRooms({commit}) {
            return new Promise((resolve, reject) => {
                Api.get('/api/chat/rooms').then((response) => {
                    if (response.data.length) {
                        commit('setRooms', response.data);
                        commit('setRoom', response.data[0]);
                    }
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                })
            })
        },

        getMessages({commit}, roomId) {
            return new Promise((resolve, reject) => {
                Api.get(`/api/chat/rooms/${roomId}/messages`).then((response) => {
                        commit('setMessages', response.data);
                        resolve(response);
                    }
                ).catch((error) => {
                    reject(error);
                })
            })
        },

        setOnline({commit}, roomId) {
            return new Promise((resolve, reject) => {
                Api.post(`/api/chat/rooms/${roomId}/setOnline`, null).then((response) => {
                        resolve(response);
                    }
                ).catch((error) => {
                    reject(error);
                })
            })
        },

        postMessage({commit, state}, message) {
            return new Promise((resolve, reject) => {
                Api.post(`/api/chat/rooms/${state.room.id}/messages`, {message: message}, {
                    "X-Socket-Id": Echo.socketId()
                }).then((response) => {
                        resolve(response);
                    }
                ).catch((error) => {
                    reject(error);
                })
            })
        },

        async connectToChannel({commit, state, dispatch}, roomId) {

            let timer;

            try {
                await dispatch('getMessages', roomId);
                await dispatch('setOnline', roomId);

                await Echo.private('chat.' + roomId)
                    .listen('MessageSent', (e) => {
                        commit('addMessage', e);
                    })
                    .listenForWhisper('Typing', (e) => {
                        commit('setTyping', e.user);

                        clearTimeout(timer);

                        timer = setTimeout(() => {
                            commit('setTyping', null);
                        }, 1000)
                    })
            } catch (error) {
                await dispatch('closeChat', state.room.id)
                if (error.response) {
                    setTimeout(() => dispatch('messagesModule/showException', error.response.data.message, {root: true}), 250)
                } else {
                    console.log(error);
                }
            }
        },

        async disconnectChannel({commit, state}, roomId) {
            await Echo.leave('chats.' + roomId);
        },

        async openChat({commit, state, dispatch, getters}, roomId) {
            try {
                commit('setOpen', true);
                let id = roomId ? roomId : state.room.id;

                if (state.room.id) {
                    if (id !== state.room.id) {
                        commit('filterRoom', id);
                    }
                    await dispatch('connectToChannel', id);
                }
            } catch (error) {
                await dispatch('closeChat', state.room.id)
                if (error.response) {
                    setTimeout(() => dispatch('messagesModule/showException', error.response.data.message, {root: true}), 250)
                } else {
                    console.log(error);
                }
            }
        },

        async closeChat({commit, dispatch}, roomId) {
            await dispatch('disconnectChannel', roomId);
            commit('setOpen', false);
        },

        async switchRoom({commit, state, dispatch}, newRoomId) {
            if (state.room.id !== newRoomId) {
                await dispatch('disconnectChannel', state.room.id);
                commit('filterRoom', newRoomId);
                await dispatch('connectToChannel', newRoomId);
            }
        },

        async sendMessage({commit, state, dispatch}, newMessage) {
            try {
                await dispatch('postMessage', newMessage);

                let timestamp = new Date()
                timestamp.toLocaleString()

                commit('addMessage', {
                        message: newMessage,
                        timestamp: timestamp,
                        self: true
                    }
                )

            } catch (error) {
                await dispatch('closeChat', state.room.id)
                if (error.response) {
                    setTimeout(() => dispatch('messagesModule/showException', error.response.data.message, {root: true}), 250)
                } else {
                    console.log(error);
                }
            }
        }
    }
}

export default chatModule
