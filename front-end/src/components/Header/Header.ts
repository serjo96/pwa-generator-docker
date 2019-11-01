import Vue from 'vue';
import { Action } from 'vuex-class';
import { Component } from 'vue-property-decorator';


@Component({

})
export default class Header extends Vue {
    @Action public logOut: any;

}
