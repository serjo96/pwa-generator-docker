import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { Action, State } from 'vuex-class';
import AppsListContent from '@/components/AppsListContent/AppsListContent';
import { CreateAppInterface } from '@/Pages/CreateApp/CreateAppInterface';


@Component({
		components: { AppsListContent },
})
export default class Apps extends Vue {
		@Action public getAppList!: () => void;
		@Action public removeApp!: (appNAme: string) => void;
		@State((state) => state.Apps.appList) public apps!: CreateAppInterface[];
		@State((state) => state.Apps.isLoading) public isLoading!: boolean;

		public created() {
				this.getAppList();
		}
}
