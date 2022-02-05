import {createStore} from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import userModule from './modules/user'
import chatModule from './modules/chat'
import notificationsModule from './modules/notifications'
import loadingModule from './modules/loading'
import messagesModule from './modules/messages'

const store = createStore(
    {
        plugins: [createPersistedState({
            paths: ['userModule']
        })],
        modules: {
            userModule,
            chatModule,
            notificationsModule,
            loadingModule,
            messagesModule
        },
    }
)

export default store
