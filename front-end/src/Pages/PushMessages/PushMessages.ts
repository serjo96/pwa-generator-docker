import Vue from 'vue';
import { State, Action } from 'vuex-class';
import { Component } from 'vue-property-decorator';
import { requireField, urlValidate } from '@/Helpers/FormValidate';
import { PushMessageActionPayloadInterface } from '@/Store/Push/InterfacesPush';

@Component({
})
export default class PushMessages extends Vue {
    @State((state) => state.Apps.appList) public appList!: [];
    @Action public getAppList!: () => void;
    @Action public onPushMessage!: ({ message, app}: PushMessageActionPayloadInterface) => void;
    public selectedApp: string = '';
    public pushTitle: string = '';
    public pushText: string = '';
    public pushAction: string = '';
    public pushIcon: string = '';
    public valid: boolean = true;

    public fieldRules = {
        urlValidate,
        requireField,
    };

    get formValidate() {
        return (this.$refs.form as Vue & { validate: () => boolean }).validate();
    }

    public onPush() {
        if (this.formValidate) {
            const message = {
                title: this.pushTitle,
                body: this.pushAction,
                icon: this.pushIcon,
                click_action: this.pushAction,
            };

            this.onPushMessage({
                message,
                app: this.selectedApp,
            });
        }
    }

    public created() {
        this.getAppList();
    }

}
