<template>
    <div class="box has-text-centered server-container" :style="serverStyle">
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
                        <a :href="`steam://connect/${server}`" class="button is-info is-rounded join-button">Join Server</a>
                    </div>
                </article>
                <div class="extensive" v-if="status">
                    <b-field>
                        <b-icon icon="map"></b-icon>
                        <span class="padvalue">{{ data.Info.Map }}</span>
                    </b-field>
                    <b-field>
                        <b-icon icon="users"></b-icon>
                        <span class="padvalue">{{ data.Info.Players }}/{{ data.Info.MaxPlayers }}</span>
                    </b-field>
                    <b-field>
                        <b-icon icon="tag"></b-icon>
                        <span class="padvalue">{{ data.Info.Name }}</span>
                    </b-field>
                </div>
            </figure>
            <div class="media-content server-box">
                <b-table
                    :data="getPlayers()"
                    hoverable
                    mobile-cards
                    focusable>

                    <template slot-scope="props">
                        <b-table-column field="name" label="Name">
                            {{ props.row.Name }}
                        </b-table-column>

                        <b-table-column field="score" label="Score">
                            {{ props.row.Score }}
                        </b-table-column>

                        <b-table-column field="duration" label="Duration">
                            {{ formatDuration(props.row.Duration) }}
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
                                <a :href="`steam://connect/${server}`" class="button is-info">Be the first one to join</a>
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
import Renders from '@/assets/data/Renders.json';
import Axios from 'axios';
import to from 'await-to-js';

export default {
    name: 'Server',
    props: {
        server: String,
    },
    data() {
        return {
            status: false,
            loading: true,
            data: null,
            tindex: 0,
            tlist: [],
            map: "",
            transition: false,
            Renders,
        };
    },
    computed: {
        serverStyle() {
            let a = {
                "background-image": `url(${this.map})`,
            };

            if (this.transition) {
                a.transition = "3s"
            }

            return a;
        }
    },
    methods: {
        findMapThumbnail(needle) {
            let r = [];
            for (const Render of Renders.children) {
                if (needle == Render.name) {
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
        getPlayers() {
            if (this.data == null || !hasOwnProperty.call(this.data, 'Player')) {
                return [];
            }

            return this.data.Player.Players;
        },
        formatDuration(duration) {
            return (duration / 60).toFixed(0) + ' minutes';
        }
    },
    async mounted() {
        let err, result;

        [ err, result ] = await to(
            Axios.get(`https://api.maxdb.net/server/a2s/${this.server}`)
        );

        if (!err) {
            this.status = true;

            this.data = result.data;

            this.tlist = this.findMapThumbnail(this.data.Info.Map);

            // Precache images to prevent flashes
            this.tlist.forEach(i => {
                new Image().src = i;
            });

            this.map = this.tlist[0];

            this.$nextTick(() => this.transition = true);

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
    margin-top: 12vh;
    margin-bottom: 10vh;
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
