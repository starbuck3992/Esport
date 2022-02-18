<template>
    <div>
        <div>{{ tournament.name }}</div>
        <div>{{ tournament.platform }}</div>
        <div>{{ tournament.game }}</div>
        <div>{{ tournament.information }}</div>
        <div>{{ tournament.tournamentType.name }}</div>
        <div>{{ tournament.tournamentType.maxPlayers }}</div>
        <div>{{ tournament.tournamentStatus.name }}</div>
        <div>{{ tournament.fee }}</div>
        <div>{{ tournament.currency.code }}</div>
        <div>{{ tournament.scheduleStart }}</div>
        <div>{{ tournament.scheduleEnd }}</div>
        <div>{{ tournament.registeredCount }}</div>
    </div>
</template>

<script>
import {onMounted, reactive} from "vue";
import {useStore} from "vuex";
import {useRouter, useRoute} from "vue-router";
import Api from "../../../services/api";

export default {
    setup() {
        const store = useStore();
        const route = useRoute();
        const router = useRouter();

        const tournament = reactive({
            'name': null,
            'platform': null,
            'game': null,
            'information': null,
            'tournamentType': {
                'name': null,
                'maxPlayers': null
            },
            'tournamentStatus': {
                'name': null,
            },
            'fee': null,
            'currency': {
                'code': null,
            },
            'scheduleStart': null,
            'scheduleEnd': null,
            'registeredCount': 0
        })

        onMounted(() => {
                Api.get(`/api/tournaments/${route.params.slug}`).then((response) => {
                    Object.assign(tournament, response.data)
                    setTimeout(() => store.dispatch('messagesModule/showSuccess', response.data), 250)
                }).catch((error) => {
                    if (error.response) {

                            setTimeout(() => store.dispatch('messagesModule/showException', error.response.data.message), 250)

                    } else {
                        console.log(error);
                    }
                })
            }
        )

        function register() {
        }

        return {
            tournament,
            register
        }
    },
}
</script>
