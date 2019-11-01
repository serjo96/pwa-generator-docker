// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable */
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import Vue from 'vue';
import Vuex from 'vuex';
import vuetify from '@/plugins/vuetify';
import * as firebase from 'firebase';

import App from './App.vue';
import Route from '@/Core/Routes/router';
import store from '@/Store/index';
import { firebaseConfig } from '@/Core/APi/api_config/apiConfig';
import './registerServiceWorker';
import './Themes/index.sass';


Vue.config.devtools = true;
Vue.config.productionTip = false;
firebase.initializeApp(firebaseConfig);

Vue.use(Vuex);


/* eslint-disable no-new */
new Vue({
    router: Route,
    store,
    vuetify,
    render: (h) => h(App),
}).$mount('#app');
