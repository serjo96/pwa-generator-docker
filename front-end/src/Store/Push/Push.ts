import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';
import axios from 'axios';
import { PushMessageActionPayloadInterface } from '@/Store/Push/InterfacesPush';

@Module
export default class Push extends VuexModule {

    @Action
    public onPushMessage({ message, app}: PushMessageActionPayloadInterface) {
        const headers = {
            headers: {
                authorization: 'key=AAAA6I1m93s:APA91bFKWm_X-zcZDfeypqeyq3AyT2g6ArxPMefXHiHiKM_kMKBL1VD8O9lQ4kzeR2Kx7o4zvKou9CrUi-nWsHZ0OcEHHG9bTY1OXMhOpAllc-1ZzekOxDpTmuoLHSX8BVfeFGteoHbg',
            },
        };
        const user = this.context.getters.userName;
        axios.post('https://fcm.googleapis.com/fcm/send', {
            notification: message,
            to: `/topics/${user}-${app}`,
        }, headers);
    }


}
