import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';
import { auth } from 'firebase';
import { SnackBarInterface } from '@/Store/Global/Interfaces/Interface';



@Module
export default class Global extends VuexModule {
	public snackBarData: SnackBarInterface = { message: '', color: ''};


	@Action
	public onAuthChange() {
		auth().onAuthStateChanged((user) => {
			if (user) {
				this.context.commit('setCurrentUser', user);
			} else {
				this.context.dispatch('logOut');
			}
		});
	}


	@Mutation
	public addSnackBarMessage(message: SnackBarInterface) {
		this.snackBarData = message;
	}

	@Mutation
	public clearSnackBar() {
		this.snackBarData = { message: '', color: ''};
	}
}
