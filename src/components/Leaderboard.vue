<template>
    <div class="box has-text-centered">
        <table class="table is-fullwidth is-hoverable">
            <thead>
                <tr>
                    <th>Position</th>
                    <th>Name</th>
                    <th>Prestige</th>
                    <th>XP</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(p, index) in data" v-bind:key="p.id">
                    <th>{{ index+1 }}</th>
                    <td><a :href="profile(p.steamid)" target="_blank">{{ p.name }}</a></td>
                    <td>{{ p.prestige }}</td>
                    <td>{{ p.xp }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import Axios from 'axios';
import to from 'await-to-js';

export default {
    name: 'Leaderboard',
    data() {
        return {
            data: [],
        }
    },
    methods: {
        profile(id) {
            return 'https://steamcommunity.com/profiles/' + id;
        },
    },
    async mounted() {
        let err, result;

        [ err, result ] = await to(
            Axios.get('https://api.maxdb.net/leaderboard.php')
        );

        if (!err) {
            this.status = true;
            this.data = result.data;
        }
    }
}
</script>
