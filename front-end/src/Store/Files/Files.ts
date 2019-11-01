import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';
import axios from 'axios';
import { API_PATH } from '@/Core/APi/api';
import { FilesActionPayloadInterface } from '@/Store/Files/FilesInterfaces';

@Module
export default class Files extends VuexModule {
    public fileResponse: string = '';

    @Action
    public async onUploadFiles(payload: FilesActionPayloadInterface) {
        const formData = new FormData();
        const user = this.context.rootGetters.userName;
        const { file, dimension, extension, name, appUID } = payload;

        this.context.commit('setResponse', '');
        formData.append('name', name);
        formData.append('dimension', JSON.stringify(dimension));
        formData.append('extension', JSON.stringify(extension));
        formData.append('user', user);
        formData.append('appUID', appUID);
        formData.append('file', file);

        try {
            await axios.post(`${API_PATH}/image/upload`, formData);
            // this.context.commit('setResponse', result.statusText);
        } catch (error) {
            const message = error.response.data.message;
            this.context.commit('setResponse', message);
        }
    }

    @Mutation
    public setResponse(resp: string) {
        this.fileResponse = resp;
    }
}
