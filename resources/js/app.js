import {onMounted, computed} from "vue";
import router from './router'
import store from './store'
import api from "./services/api"
import Echo from 'laravel-echo'
import * as PusherPushNotifications from '@pusher/push-notifications-web'

import Loading from './components/Loading'
import Exception from './components/Exception'
import {useStore} from "vuex";

window._ = require('lodash')
window.Vue = require('vue')
window.Pusher = require('pusher-js')
window.axios = require('axios')
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
window.Echo = new Echo({
    broadcaster: 'pusher',
    key: process.env.MIX_PUSHER_APP_KEY,
    cluster: process.env.MIX_PUSHER_APP_CLUSTER,
    forceTLS: true,
    authorizer: (channel) => {
        return {
            authorize: (socketId, callback) => {
                axios.post('/api/broadcasting/auth', {
                    socket_id: socketId,
                    channel_name: channel.name
                })
                    .then(response => {
                        callback(false, response.data)
                    })
                    .catch(error => {
                        callback(true, error)
                    })
            }
        }
    },
})

// const beamsClient = new PusherPushNotifications.Client({
//     instanceId: process.env.MIX_PUSHER_BEAMS_INSTANCE_ID,
// });
//
// beamsClient.start()
//     .then(() => beamsClient.addDeviceInterest('hello'))
//     .then(() => console.log('Successfully registered and subscribed!'))
//     .catch(console.error)

const app = Vue.createApp({
    el: '#app',
    components: {
        'App': {
            template:
                '<loading></loading>' +
                '<router-view></router-view>' +
                '<exception></exception>'
        },
    },
    setup() {
        const store = useStore();
        const loggedIn = computed(() => store.getters['userModule/loggedIn']);

        onMounted(async () => {
            if (loggedIn.value) {
                await store.dispatch('notificationsModule/getNotifications');
                await store.dispatch('chatModule/getRooms');
            }
        })
    }
})

app.component('loading', Loading);
app.component('exception', Exception);
app.use(router);
app.use(store);
app.mount('#app');
