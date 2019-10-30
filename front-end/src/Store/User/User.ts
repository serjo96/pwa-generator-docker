import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';
import { auth } from 'firebase';
import { ResponseError } from '@/Core/Interfaces/Global';

const localUser = localStorage.getItem('user')!;

@Module
export default class UserModule extends VuexModule {
	public currentUser = localUser ? JSON.parse(localUser) : null;
	public requestResponse: boolean  = false;


	@Action
	public takeCurrentUser() {
		this.context.commit('setCurrentUser', auth().currentUser);
	}

	@Mutation
	public setCurrentUser(payload: any) {
		const userInfo = payload ? { ...payload.providerData[0], uid: payload.uid} : null;
		localStorage.setItem('user', JSON.stringify(userInfo));
		this.currentUser = userInfo;
	}

	@Action({ rawError: true})
	public updateName(name: string) {
		auth().currentUser!.updateProfile({
			displayName: name,
			photoURL: this.currentUser.photoURL,
		})
			.then(() => {
				this.context.dispatch('takeCurrentUser');
				this.context.commit('addSnackBarMessage', {
					message: 'Name success changed',
					color: 'success',
				});
			})
			.catch((err: ResponseError) => {
				const errorMessage = JSON.parse(err.message);
				this.context.commit('addSnackBarMessage', {
					message: errorMessage.error.message,
					color: 'error',
				});
			});
	}

	@Action({ rawError: true})
	public changeEmail({ email, password}: { email: string; password: string}) {
		this.context.dispatch('reauthenticate', password)
			.then(
				() => {
					auth().currentUser!.updateEmail(email)
						.then(() => {
							this.context.commit('changeRequestResponse', true);
							this.context.dispatch('takeCurrentUser');
							this.context.commit('addSnackBarMessage', {
								message: 'Email success changed',
								color: 'success',
							});
						})
						.catch((err: ResponseError) => {
							this.context.commit('changeRequestResponse', false);
							this.context.commit('addSnackBarMessage', {
								message: err.message,
								color: 'error',
							});
						});
				})
			.catch((err: ResponseError) => {
				this.context.commit('changeRequestResponse', false);
				this.context.commit('addSnackBarMessage', {
					message: err.message,
					color: 'error',
				});
			});
	}

	@Action({ rawError: true})
	public reauthenticate(currentPassword: string) {
		const user = auth().currentUser;
		const cred = auth.EmailAuthProvider.credential(
			this.currentUser.email, currentPassword);
		return user!.reauthenticateWithCredential(cred);
	}

	@Action
	public updateProfilePhoto(photo: string) {
		auth().currentUser!.updateProfile({
			displayName: this.currentUser.displayName,
			photoURL: photo,
		})
			.then(() => {
				this.context.dispatch('takeCurrentUser');
				this.context.commit('addSnackBarMessage', {
					message: 'Photo success changed',
					color: 'success',
				});
			})
			.catch((err: ResponseError) => {
				this.context.commit('addSnackBarMessage', {
					message: err.message,
					color: 'error',
				});
			});
	}

	@Mutation
	public changeRequestResponse(status: boolean) {
		this.requestResponse = status;
	}


	get getRequestResponse() {
		return this.requestResponse;
	}

	get userName() {
		return this.currentUser.email.split('@')[0];
	}


}
