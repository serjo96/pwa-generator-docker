import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import { State } from './state';
import UserModule from './User/User';
import Auth from './Auth/Auth';
import Global from '@/Store/Global/Global';
import Apps from '@/Store/Apps/Apps';
import Push from '@/Store/Push/Push';
import Templates from '@/Store/Templates/Templates';
import Files from '@/Store/Files/Files';

Vue.use(Vuex);

export default new Store < State > ({
    modules: {
        Global,
        UserModule,
        Auth,
        Apps,
        Templates,
        Files,
        Push,
    },
});
