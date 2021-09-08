<template>
    <div @click="logout">Odhlášení</div>
</template>

<script>
export default {
    name: 'Logout',
    methods: {
        logout() {
            this.$store.dispatch('logout');
        },
    },
};
</script>
