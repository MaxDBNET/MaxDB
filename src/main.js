// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';

import Buefy from 'buefy';

import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { faMap, faUsers, faTag }from '@fortawesome/free-solid-svg-icons';
import { faFrown } from '@fortawesome/free-regular-svg-icons';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';

import 'animate.css/animate.min.css';

import App from './App';
import router from './router';

Vue.config.productionTip = false;

Vue.use(Buefy, {
    defaultIconPack: 'fas',
});

library.add(faTag);
library.add(faDiscord);
library.add(faMap);
library.add(faUsers);
library.add(faFrown);

dom.watch();

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>',
});
