import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { api_path } from '@/Core/APi/api';
import { firestore } from 'firebase';
import { CreateAppInterface } from '@/Pages/CreateApp/CreateAppInterface';

interface CreateAppAction {
	appData: FormData;
	appName: string;
}

@Module
export default class Apps extends VuexModule {
	public isLoading: boolean = true;
	public submitForm: boolean = false;
	public filesValidate = {};
	public appList: CreateAppInterface[] = [];

	@Action
	public createApp({ appData, appName}: CreateAppAction) {
		this.context.commit('onSubmitForm', true);
		this.context.commit('changeLoadingStatus', false);
		const userId = this.context.rootState.UserModule.currentUser.uid;
		const email = this.context.rootState.UserModule.currentUser.email;
		axios.post(`${api_path}/generatePWA?UID=${userId}&email=${email}&appName=${appName}`, appData)
			.then((res: AxiosResponse) => {
				this.context.commit('addSnackBarMessage', {
					message: res.data,
					color: 'success',
				});
			})
			.catch((err: AxiosError) => {
				this.context.commit('addSnackBarMessage', {
					message: err.message,
					color: 'error',
				});
				throw new Error(err.message);
			})
			.finally(() => {
				this.context.commit('changeLoadingStatus', true);
			});
	}

	@Action
	public getAppList() {
		const userId = this.context.rootState.UserModule.currentUser.uid;

		firestore()
			.collection('users')
			.doc(userId)
			.collection('apps')
			.onSnapshot((docList) => {
					const data = docList.docs.map((doc) => {
						return doc.data();
					});
					this.context.commit('setAppsList', data);
				},
				(err: Error): void =>  {
					this.context.commit('addSnackBarMessage', {
						message: err.message,
						color: 'error',
					});
				});
	}

	@Action
	public removeApp(appName: string) {
		const email = this.context.rootState.UserModule.currentUser.email;
		const userId = this.context.rootState.UserModule.currentUser.uid;
		axios.delete(`${api_path}/deleteApp?UID=${userId}&email=${email}&appName=${appName}`)
			.then((res: AxiosResponse) => {
				this.context.commit('addSnackBarMessage', {
					message: 'success deleted',
					color: 'success',
				});
			})
			.catch((err: AxiosError) => {
				this.context.commit('addSnackBarMessage', {
					message: err.message,
					color: 'error',
				});
				throw new Error(err.message);
			});
	}

	@Action
	public async onBrakeForm({ userID, appID}: { userID: string, appID: string } ) {
		try {
			await axios.get(`${api_path}/generatePWA/break/${userID}/${appID}`);
		} catch (err) {
			this.context.commit('addSnackBarMessage', {
				message: err.message,
				color: 'error',
			});
			throw new Error(err.message);
		}
	}

	@Mutation
	public setAppsList(list: CreateAppInterface[]) {
		this.appList = list;
		this.isLoading = true;
	}

	@Mutation
	public changeLoadingStatus(status: boolean) {
		this.isLoading = status;
	}

	@Mutation
	public onSubmitForm(state: boolean) {
		this.submitForm = state;
	}

}
