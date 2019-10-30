import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import WrapperPreloader from '@/UI/WrapperPreloader/WrapperPreloader';
import { CreateAppInterface } from '@/Pages/CreateApp/CreateAppInterface';
import { api_path } from '@/Core/APi/api';




@Component({
	components: { WrapperPreloader },
})
export default class AppsListContent extends Vue {
	@Prop(Array) public appsList!: CreateAppInterface[];
	@Prop(Boolean) public loadingStatus!: boolean;
	@Prop(Function) public removeApp!: (appName: string) => void;

	get url() {
		return api_path;
	}

}
