<template>
      <section id="app" class="hero is-fullheight">
        <div class="hero-head">
            <nav class="navbar" role="navigation" aria-label="Navigation">
                <div class="container">
                    <div class="navbar-brand">
                        <router-link to="/" class="navbar-item">
                            <img src="/static/favicon/favicon.png">
                        </router-link>
                        <button class="button is-dark navbar-burger"
                            @click="navMenuActive = !navMenuActive">
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                    <div class="navbar-menu" :class="{'is-active': navMenuActive}">
                    </div>
                </div>
            </nav>
        </div>
        <div class="hero-body">
            <div class="container">
                <keep-alive><router-view></router-view></keep-alive>
            </div>
        </div>
        <div class="hero-footer">
            <div class="container">
                <footer class="footer">
                    <div class="content has-text-centered">
                        Constructed and curated by <a href="https://keybase.io/rumblefrog" target="_blank">Fishy!#6593</a>
                    </div>
                </footer>
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
@import "~bulma";
@import "~buefy/src/scss/buefy";
</style>

