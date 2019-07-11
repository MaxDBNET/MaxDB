// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';

import Buefy from 'buefy';

import { library, dom } from '@fortawesome/fontawesome-svg-core';
import faSolid from '@fortawesome/free-solid-svg-icons';
import faRegular from '@fortawesome/free-regular-svg-icons';
import faBrands from '@fortawesome/free-brands-svg-icons';

import 'animate.css/animate.min.css';

import App from './App';
import router from './router';

Vue.config.productionTip = false;

Vue.use(Buefy, {
    defaultIconPack: 'fas',
});

library.add(faSolid);
library.add(faRegular);
library.add(faBrands);

dom.watch();

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>',
});
