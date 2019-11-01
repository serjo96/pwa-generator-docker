import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';
import * as firebase from 'firebase';
import Router from '@/Core/Routes/router';
import { ResponseError } from '@/Core/Interfaces/Global';


@Module
export default class Auth extends VuexModule {
    public singUpData: any;
    public authError: ResponseError = {
        code: '',
        message: '',
    };
    public successResetPasswordMessage: string = '';

    get AuthError() {
        return this.authError;
    }

    get restPasswordMessage() {
        return this.successResetPasswordMessage;
    }


    @Action({ rawError: true})
    public loginAction(payload: any) {
        firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
            .then((res: any) => {
                this.context.commit('login', res);
                this.context.commit('setCurrentUser', firebase.auth().currentUser);
                Router.push('/');
            })
            .catch((error: ResponseError) => {
                this.context.commit('error', error);
            });
    }

    @Mutation
    public error(error: ResponseError) {
        this.authError = error;
    }

    @Mutation
    public successResetPassword() {
        this.successResetPasswordMessage = 'A message with instructions for resetting the password has been sent to your email.';
    }

    @Mutation
    public login(payload: any) {
        this.singUpData = payload.result;
    }

    @Action
    public logOut() {
        firebase.auth().signOut()
            .then((res) => {
                this.context.commit('setCurrentUser', firebase.auth().currentUser);
                localStorage.removeItem('user');
                Router.push('/auth');
            })
            .catch((error) => {
                this.context.commit('setCurrentUser', firebase.auth().currentUser);
                throw new Error(error);
            });
    }

    @Action
    public resetPassword(email: string) {
        const actionCodeSettings = { url: 'http://localhost:8080'};

        firebase.auth().sendPasswordResetEmail(email, actionCodeSettings)
            .then(() => {
                this.context.commit('successResetPassword');
            })
            .catch((error) => {
                this.context.commit('error', error);
            });
    }


    @Mutation
    public clearErrorData() {
        this.authError = {
            code: '',
            message: '',
        };
    }

    @Mutation
    public clearPasswordMessage() {
        this.successResetPasswordMessage = '';
    }

}
