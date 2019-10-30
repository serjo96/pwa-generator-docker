import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';
import { Action, State } from 'vuex-class';
const uuidv1 = require('uuid/v1');

import { formFilesHelper } from '@/Helpers/FormDataHelper';
import Preloader from '@/UI/Preloader/Preloader';
import StageOne from '@/components/CreateAppStages/StageOne/StageOne.vue';
import StageTwo from '@/components/CreateAppStages/StageTwo/StageTwo.vue';
import StageThree from '@/components/CreateAppStages/StageThree/StageThree.vue';
import StageFour from '@/components/CreateAppStages/StageFour/StageFour.vue';
import StageFive from '@/components/CreateAppStages/StageFive/StageFive.vue';
import StageSix from '@/components/CreateAppStages/StageSix/StageSix.vue';
import { TemplatesInterfaces, TemplatesListInterfaces } from '@/Store/Templates/TemplatesInterfaces';
import formInitData from '@/Helpers/FormData';
import { FilesActionPayloadInterface, FilesPayloadInterface } from '@/Store/Files/FilesInterfaces';

Component.registerHooks([
	'beforeRouteLeave',
]);

@Component({
	components: { Preloader, StageOne, StageTwo, StageThree, StageFour, StageFive, StageSix },
})
export default class CreateApp extends Vue {
	@Action public getTemplatesList!: () => void;
	@Action public createApp!: (data: any) => void;
	@Action public onSelectTemplate!: ({ id }: { id: string}) => void;
	@Action public onUploadFiles!: (payload: FilesActionPayloadInterface) => void;
	@Action public onBrakeForm!: ({ userID, appID}: { userID: string, appID: string }) => void;
	@State((state) => state.UserModule.currentUser.uid) public UID!: string;
	@State((state) => state.Apps.isLoading) public isLoading!: boolean;
	@State((state) => state.Templates.templatesList) public templatesList!: TemplatesListInterfaces;
	@State((state) => state.Templates.template) public template!: TemplatesInterfaces;
	@State((state) => state.Files.fileResponse) public fileResponse!: string;
	public formData = formInitData;
	public appUID: string = '';
	private step: number = 1;

	public uploadFiles(payload: FilesPayloadInterface) {
		const appUID = this.appUID;
		this.onUploadFiles({ ...payload, appUID });
	}

	public onNextStep() {
		this.step++;
	}

	public onBuckStep() {
		this.step--;
	}

	public takeDataFromStep(propName: string, data: any) {
		this.$set(this.formData, propName, data);
	}

	public onSubmitForm() {
		this.$set(this.formData, 'uidApp', this.appUID);
		const createAppPayload = {
			appData: formFilesHelper(this.formData),
			appName: this.formData.stageOne.appName,
		};

		this.createApp(createAppPayload);
		// uploadToStore(this.formData, this.UID);
	}

	public generateUID() {
		this.appUID = uuidv1();
	}

	public created() {
		this.getTemplatesList();
		this.generateUID();
	}

	public beforeRouteLeave(to: any, from: any, next: any) {
		const userID = this.UID;
		const appID = this.appUID;
		this.onBrakeForm({
			userID,
			appID,
		});
		next();
	}
}
