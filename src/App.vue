<template>
      <section id="app" class="hero is-dark is-fullheight">
        <div class="hero-head">
            <nav class="navbar" role="navigation" aria-label="Navigation">
                <div class="container">
                    <div class="navbar-brand">
                        <router-link to="/" class="navbar-item">
                            <img src="/static/img/logo_white.png" style="color:#fff;">
                        </router-link>
                        <button class="button is-dark navbar-burger"
                            @click="navMenuActive = !navMenuActive">
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                    <div class="navbar-menu" :class="{'is-active': navMenuActive}">
                        <div class="navbar-start">
                            <router-link to="Leaderboard" class="navbar-item">
                                <span>Leaderboard</span>
                            </router-link>
                            <a class="navbar-item" href="https://bans.maxdb.net" target="_blank">Bans</a>
                        </div>
                        <div class="navbar-end">
                            <a href="https://discord.gg/43ks88x" class="navbar-item" target="_blank">
                                <div class="button is-white is-outlined">
                                    <b-icon icon="discord" pack="fab"></b-icon>&nbsp;
                                    <span>Discord Server</span>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
        <div class="hero-body">
            <div class="container">
                <keep-alive><router-view></router-view></keep-alive>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'MaxDB',
    data() {
        return {
            navMenuActive: false,
        };
    },
};
</script>

<style lang="scss">
@import "~bulma/sass/utilities/_all";
@import "~bulmaswatch/cyborg/_variables";

$table-background-color: $black-ter;

@import "~bulma";
@import "~bulmaswatch/cyborg/_overrides";
@import "~buefy/src/scss/buefy";
</style>

<style>
.hero.is-dark {
    background: linear-gradient(
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0.5)
    ), url('/static/img/sandstormed_2-1080p-compressed.jpg')
    no-repeat center center fixed !important;
}
html {
    overflow-y: hidden;
}
</style>
