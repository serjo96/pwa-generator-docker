import Vue from 'vue';
import { Mutation, State } from 'vuex-class';
import { Watch, Component } from 'vue-property-decorator';
import { SnackBarInterface } from '@/Store/Global/Interfaces/Interface';


@Component({

})
export default class SnackBar extends Vue {
	public show: boolean = false;
	public timeout: number = 4000;

	@Mutation public clearSnackBar: any;
	@State((state) => state.Global.snackBarData) public snackBar!: SnackBarInterface;

	@Watch('show')
	public onClearSnackBar(val: boolean) {
		if (!val) {
			this.clearSnackBar();
		}
	}

	@Watch('snackBar', { deep: true})
	public showSnackBar(val: SnackBarInterface) {
		if (val.message) {
			this.show = true;
		}
	}

}
