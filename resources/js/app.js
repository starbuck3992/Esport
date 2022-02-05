import {onMounted, computed} from "vue";
import router from './router'
import store from './store'
import Loading from './components/Loading';
import Success from './components/Success';
import Exception from './components/Exception';
import {useStore} from "vuex";

window.Vue = require('vue')
window.Pusher = require('pusher-js')
window.axios = require('axios')
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

//import * as PusherPushNotifications from '@pusher/push-notifications-web'
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
                '<success></success>' +
                '<exception></exception>'
        },
    },
    setup() {
        const store = useStore();
        const loggedIn = computed(() => store.getters['userModule/loggedIn']);

        onMounted(async () => {
            if (loggedIn.value)
                try {
                    await store.dispatch('userModule/authorizePusher');
                    await store.dispatch('notificationsModule/getNotifications');
                    await store.dispatch('chatModule/getRooms');
                } catch (error) {
                    if (error.response) {
                        store.commit('exceptionModule/setException', error.response.data.message);
                    } else {
                        console.log(error);
                    }
                }
        })
    }
})

app.component('loading', Loading);
app.component('success', Success);
app.component('exception', Exception);
app.use(router);
app.use(store);
app.mount('#app');
