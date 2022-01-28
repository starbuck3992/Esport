import {createStore} from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import userModule from './modules/user'
import chatModule from './modules/chat'
import notificationsModule from './modules/notifications'
import loadingModule from './modules/loading'
import exceptionModule from './modules/exceptions'

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
            exceptionModule
        },
    }
)

export default store
