import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import {  Action } from 'vuex-class';


@Component({
})
export default class App extends Vue {

    @Action public onAuthChange: any;

    public created() {
        this.onAuthChange();
    }

}
