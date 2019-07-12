<template>
    <div class="box has-text-centered server-container" :style="`background-image:url(${map})`">
        <article class="media">
            <figure class="media-left server-box server-info-box">
                <article class="media" id="info">
                    <figure class="media-left ">
                        <img :src="`/static/img/${status ? 'online' : 'dnd'}.png`"
                                height="48"
                                width="48">
                    </figure>
                    <div class="media-content">
                        <span class="status">{{ status ? 'Online' : 'Offline' }}</span>
                    </div>
                    <div class="media-right">
                        <a href="steam://connect/play.maxdb.net:27015" class="button is-info is-rounded join-button">Join Server</a>
                    </div>
                </article>
                <div class="extensive" v-if="status">
                    <b-field>
                        <b-icon icon="map"></b-icon>
                        <span class="padvalue">{{ data.info.map }}</span>
                    </b-field>
                    <b-field>
                        <b-icon icon="users"></b-icon>
                        <span class="padvalue">{{ data.info.players }}/{{ data.info.maxplayers }}</span>
                    </b-field>
                </div>
            </figure>
            <div class="media-content server-box">
                <b-table
                    :data="umap"
                    hoverable
                    mobile-cards
                    focusable
                    :row-class="(row) => (row.team === 'red') ? 'is-danger' : 'is-info'">

                    <template slot-scope="props">
                        <b-table-column field="name" label="Name">
                            <a :href="'https://steamcommunity.com/profiles/' + props.row.id" target="_blank">{{ props.row.name }}</a>
                            <b-tag type="is-primary" v-if="hasOwnProperty.call(Prefixes, props.row.id)">{{ Prefixes[props.row.id] }}</b-tag>
                        </b-table-column>

                        <b-table-column field="frags" label="Frags">
                            {{ props.row.frags }}
                        </b-table-column>

                        <b-table-column field="deaths" label="Deaths">
                            {{ props.row.deaths }}
                        </b-table-column>

                        <b-table-column field="latency" label="Latency">
                            {{ Math.round(props.row.latency * 1000) }} ms
                        </b-table-column>
                    </template>

                    <template slot="empty">
                        <section class="section">
                            <div class="content has-text-grey has-text-centered">
                                <p>
                                    <b-icon
                                        icon="frown"
                                        pack="far"
                                        size="is-large">
                                    </b-icon>
                                </p>
                                <p>OwO, no one is on. Go spam Dragon.</p>
                                <a href="steam://connect/play.maxdb.net:27015" class="button is-info">Be the first one to join</a>
                            </div>
                        </section>
                    </template>
                </b-table>
            </div>
        </article>
        <b-loading :is-full-page=false :active.sync="loading"></b-loading>
    </div>
</template>

<script>
import Prefixes from '@/assets/data/Prefixes.json';
import Renders from '@/assets/data/Renders.json';
import Axios from 'axios';
import leven from 'leven';
import to from 'await-to-js';

export default {
    name: 'Home',
    data() {
        return {
            status: false,
            loading: true,
            data: null,
            umap: [],
            tindex: 0,
            tlist: [],
            map: "",
            Prefixes,
            Renders,
        };
    },
    methods: {
        findMapThumbnail(needle) {
            let r = [];
            for (const Render of Renders.children) {
                if (leven(needle, Render.name) < 5) {
                    for (const c of Render.children) {
                        let baseName = c.name.replace(/\.[^/.]+$/, "");

                        r.push(`https://dl.maxdb.net/thumbnails/${Render.name}/${baseName}_blurred${c.extension}`);
                    }
                    return r;
                }
            }
            return ['/static/img/unknown.png'];
        },
        rotate() {
            if (this.tindex + 1 >= this.tlist.length) {
                this.tindex = 0;
                this.map = this.tlist[this.tindex];
            }
            else
                this.map = this.tlist[++this.tindex];
        },
    },
    async mounted() {
        let err, result;

        [ err, result ] = await to(
            Axios.get('https://unruly-pepper.glitch.me/')
        );

        if (!err) {
            this.status = true;
            this.data = result.data;

            for (const team in this.data.teams)
                for (const player in this.data.teams[team])
                    this.umap.push(Object.assign(this.data.teams[team][player], { id: player, team: team }));

            this.tlist = this.findMapThumbnail(this.data.info.map);
            this.map = this.tlist[0];

            setInterval(this.rotate, 1000 * 10);
        }

        this.loading = false;
    }
};
</script>

<style lang="css">
.table {
    background-color: rgba(0, 0, 0, 0);
}
.table.is-hoverable tbody tr:not(.is-selected):hover {
    background-color: rgba(0, 0, 0, 0.1);
}
</style>

<style scoped>
.status {
    line-height: 3em;
}
.join-button {
    margin-top: 7px;
}
.extensive {
    margin-left: 10px;
}
.padvalue {
    margin-left: 30px;
}
#info {
    border-top: none;
}
.server-container {
    height: 60vh;
    background-size: cover;
    background-position: center;
}
.server-box {
    display: block;
    padding: 1.25rem;
    border-radius: 6px;
    background-color: rgba(0, 0, 0, 0.5);
}
.server-info-box {
    padding-top: 0.5rem;
}
</style>
