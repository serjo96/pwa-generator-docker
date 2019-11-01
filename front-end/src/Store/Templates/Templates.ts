import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { API_PATH } from '@/Core/APi/api';
import { TemplatesInterfaces, TemplatesListInterfaces } from '@/Store/Templates/TemplatesInterfaces';

@Module
export default class Templates extends VuexModule {
    public templatesList: TemplatesListInterfaces[] = [{
        name: '',
        id: '',
    }];
    public template!: TemplatesInterfaces;

    @Action
    public onCreateTemplate(formData: FormData) {
        axios.post(`${API_PATH}/template`, formData)
            .then((res: AxiosResponse) => {
                this.context.commit('addSnackBarMessage', {
                    message: res.data.status,
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
    public getTemplatesList() {
        axios.get(`${API_PATH}/templates`)
            .then((res: AxiosResponse) => {
                this.context.commit('setTemplateList', res.data);
            })
            .catch((err: AxiosError) => {
                this.context.commit('addSnackBarMessage', {
                    message: err.message,
                    color: 'error',
                });
                throw new Error(err.message);
            })
            .finally(() => this.context.commit('changeLoadingStatus', true));
    }

    @Mutation
    public setTemplateList(list: TemplatesListInterfaces[]) {
        this.templatesList = list;
    }

    @Action
    public onSelectTemplate({ id }: { id: string}) {
        this.context.commit('changeLoadingStatus', false);
        axios.get(`${API_PATH}/template/${id}`)
            .then((res: AxiosResponse) => {
                this.context.commit('setTemplate', res.data);
            }).catch((err: AxiosError) => {
                this.context.commit('addSnackBarMessage', {
                    message: err.message,
                    color: 'error',
                });
                throw new Error(err.message);
        })
            .finally(() => this.context.commit('changeLoadingStatus', true));
    }

    @Mutation
    public setTemplate(template: TemplatesInterfaces) {
        this.template = template;
    }
}
