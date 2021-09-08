window._ = require('lodash');
window.Vue = require('vue');
window.Pusher = require('pusher-js');
window.axios = require('axios');
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

import router from './router';
import store from './store'
import Echo from 'laravel-echo';

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: process.env.MIX_PUSHER_APP_KEY,
    cluster: process.env.MIX_PUSHER_APP_CLUSTER,
    forceTLS: true
});

const app = Vue.createApp({
    el: '#app',
    components: {
        'App': { template: '<router-view></router-view>' },
    }
})
app.use(router);
app.use(store);
app.mount('#app');

//
// const app = new Vue({
//     el: '#app',
//
//     data: {
//         messages: []
//     },
//
//     created() {
//         this.fetchMessages();
//         Echo.private('chat')
//             .listen('MessageSent', (e) => {
//                 this.messages.push({
//                     message: e.message.message,
//                     user: e.user
//                 });
//             });
//     },
//
//     methods: {
//         fetchMessages() {
//             axios.get('/messages').then(response => {
//                 this.messages = response.data;
//             });
//         },
//
//         addMessage(message) {
//             this.messages.push(message);
//
//             axios.post('/messages', message).then(response => {
//                 console.log(response.data);
//             });
//         }
//     }
// });
