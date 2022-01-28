import api from "../../services/api";

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
            return state.open
        },
        room(state) {
            return state.room
        },
        rooms(state) {
            return state.rooms
        },
        roomExist(state) {
            return !!state.room.id
        }
    },
    mutations: {
        setOpen(state, newState) {
            state.open = newState
        },
        setRoom(state, room) {
            Object.assign(state.room, room)
        },
        setRooms(state, rooms) {
            state.rooms.push(...rooms)
        },
        filterRoom(state, roomId) {
            Object.assign(state.room, state.rooms.filter(function (room) {
                return room.id === roomId
            })[0])
        },
        setMessages(state, messages) {
            state.room.messages = messages
        },
        addMessage(state, message) {
            state.room.messages.push(message)
        },
        setTyping(state, user) {
            state.room.typing.user = user
        }
    },
    actions: {
        async getRooms({commit, state, dispatch}) {

            try {

                const rooms = await api.getRooms();

                if (rooms.data.length) {
                    commit('setRooms', rooms.data);
                    commit('setRoom', rooms.data[0]);
                    await dispatch('connectToChannel', state.room.id);
                }

            } catch (error) {
                dispatch('exceptionModule/showException', error.response.data.message, {root: true});
            }

        },

        async getMessages({commit, state, dispatch}, roomId) {
            return await api.getMessages(roomId).then((response) => commit('setMessages', response.data))
        },

        async connectToChannel({commit, state, dispatch}, roomId) {

            let timer
            let payload = {
                roomId: roomId
            }

            try {

                await api.setOnline(payload);

                await Echo.private('chat.' + roomId)
                    .listen('MessageSent', (e) => {
                        commit('addMessage', e)
                    })
                    .listenForWhisper('Typing', (e) => {
                        commit('setTyping', e.user)

                        clearTimeout(timer)

                        timer = setTimeout(() => {
                            commit('setTyping', null)
                        }, 1000)
                    })
            } catch (error) {
                dispatch('closeChat', state.room.id)
                dispatch('exceptionModule/showException', error.response.data.message, {root: true})
            }
        },

        async disconnectChannel({commit, state}, roomId) {
            await Echo.leave('chats.' + roomId)
        },

        async openChat({commit, state, dispatch, getters}, roomId) {
            try {

                commit('setOpen', true)
                if (!getters.roomExist) {
                    dispatch('getRooms')
                } else {

                    let id = roomId ? roomId : state.room.id;

                    if (id !== state.room.id) {
                        commit('filterRoom', id)
                    }
                    console.log(1)
                    await dispatch('getMessages', id)
                    console.log(2)
                    await dispatch('connectToChannel', id)
                }
            } catch (error) {
                dispatch('closeChat', state.room.id)
                dispatch('exceptionModule/showException', error.response.data.message, {root: true})
            }
        },

        async closeChat({commit, dispatch}, roomId) {
            commit('setOpen', false)
            await dispatch('disconnectChannel', roomId)
        },

        async switchRoom({commit, state, dispatch}, newRoomId) {
            if (state.room.id !== newRoomId) {
                try {

                    dispatch('disconnectChannel', state.room.id)
                    commit('filterRoom', newRoomId)
                    await dispatch('getMessages', newRoomId)
                    console.log(1)
                    await dispatch('connectToChannel', newRoomId)
                } catch (error) {
                    dispatch('closeChat', state.room.id)
                    dispatch('exceptionModule/showException', error.response.data.message, {root: true})
                }
            }
        }
    }
}

export default chatModule
