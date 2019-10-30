import Vue from 'vue';
import { Mutation, Getter, Action } from 'vuex-class';
import { Watch, Component } from 'vue-property-decorator';


@Component({

})
export default class Header extends Vue {
	@Action public logOut: any;

}
