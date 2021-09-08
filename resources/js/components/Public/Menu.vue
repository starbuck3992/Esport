<template>
        <div class="container-fluid">
            <nav class="container navbar navbar-expand-lg d-flex justify-content-between tex-white">
                <router-link class="p-1 tex-white menu-li" :to="{ name: 'home' }">Domů</router-link>
                <div v-if="loggedIn">Přihlášen uživatel : <span style="font-size:20px;">{{ user }}</span></div>
                <router-link v-else :to="{ name: 'login' }">
                    Přihlášení
                </router-link>
                <router-link :to="{ name: 'register' }"
                             v-if="!loggedIn">Registrace
                </router-link>
                <Logout v-else/>
            </nav>
        </div>
</template>

<script>
import {mapGetters} from 'vuex';
import Logout from '../Auth/Logout';
export default {
    name: 'Header',
    components: {
        Logout,
    },
    computed: {
        ...mapGetters(['loggedIn','user'])
    },
};
</script>
