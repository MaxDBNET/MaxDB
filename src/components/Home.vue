<template>
    <div class="box has-text-centered">
        <article class="media is-centered is-vcentered">
            <figure class="media-left">
                <div>
                    <img src="/static/img/256x256.png"
                    height="256"
                    width="256"
                    class="is-circle">
                </div>
                <article class="media is-centered is-vcentered">
                    <figure class="media-left">
                        <img src="/static/img/online.png"
                                height="48"
                                width="48">
                    </figure>
                    <div class="media-content">
                        <span class="status">Online</span>
                    </div>
                </article>
            </figure>
            <div class="media-content box">
                <b-table
                    :data="dummy"
                    hoverable
                    mobile-cards>

                    <template slot-scope="props">
                        <b-table-column field="name" label="Name">
                            {{ props.row.name }}
                        </b-table-column>

                        <b-table-column field="score" label="Score">
                            {{ props.row.score }}
                        </b-table-column>
                    </template>

                    <template slot="empty">
                        <section class="section">
                            <div class="content has-text-grey has-text-centered">
                                <p>
                                    <b-icon
                                        icon="emoticon-sad"
                                        size="is-large">
                                    </b-icon>
                                </p>
                                <p>Go spam Dragon.</p>
                            </div>
                        </section>
                    </template>
                </b-table>
            </div>
        </article>
    </div>
</template>

<script>
export default {
    name: 'Home',
    data() {
        return {
            loading: true,
            data: null,
            dummy: [
                { name: 'Fishy!', score: 50 },
                { name: 'Dragon', score: 20 },
                { name: 'Blank', score: 10 },
            ],
        };
    },
};
</script>

<style scoped>
.is-circle {
    border-radius: 50%;
}
.status {
    line-height: 3em;
}
</style>
