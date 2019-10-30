import Vue from 'vue';
import * as firebase from 'firebase';
import { ResponseError } from '@/Core/Interfaces/Global';
import { emailRequired, requireField, validEmailRequired } from '@/Helpers/FormValidate';
import { Watch, Component } from 'vue-property-decorator';
import { Action, Getter, Mutation, State } from 'vuex-class';


@Component({ })
export default class Auth extends Vue {
	@State((state) => state.Auth.currentUser) public userData!: firebase.User ;
	@Getter public AuthError!: ResponseError;
	@Action public loginAction: any;
	@Mutation public clearErrorData: any;

	public valid: boolean = true;
	public showPassword: boolean = false;
	public email: string = '';
	public password: string = '';

	public rules = {
		required: requireField,
		emailRequired,
		validEmailRequired,
	};

	@Watch('User', { deep: true})
	public onUserChange(auth: any) {
		if (auth) {
			this.$router.replace(this.nextRoute);
		}
	}

	get nextRoute(): string {
		return this.$route.query.redirect ? `${this.$route.query.redirect && '/'}` : '/';
	}



	get formValidate(): boolean {
		return (this.$refs.form as Vue & { validate: () => boolean }).validate();
	}


	public login() {
		if (this.formValidate) {
			this.loginAction({ email: this.email, password: this.password});
		}
	}

	public beforeDestroy() {
		this.clearErrorData();
	}

}
