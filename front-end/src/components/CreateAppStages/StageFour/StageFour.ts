import Vue from 'vue';
import { Prop, Component } from 'vue-property-decorator';
import { hexColor, requireField, urlValidate, validateImageSize } from '@/Helpers/FormValidate';
import StageFourInterface from '@/components/CreateAppStages/StageFour/StageFourInterface';
import languagesList from '@/Helpers/LaungagesHelper';
import { FilesPayloadInterface } from '@/Store/Files/FilesInterfaces';

@Component({ })
export default class StageFour extends Vue {
	@Prop(Function) public nextStep!: () => void;
	@Prop(Function) public prevStep!: () => void;
	@Prop(Function) public submitStepData!: (name: string, data: any) => void;
	@Prop(Function) public onUploadFiles!: (payload: FilesPayloadInterface) => void;
	@Prop(Object) public stepData!: StageFourInterface;
	@Prop(String) public fileResponse!: string;

	public imageError: string = '';
	public valid: boolean = true;
	public languages = languagesList;

	public fieldRules = {
		requireField,
		urlValidate,
		hexColor,
	};

	public onFilePicked(file: File, name: string, dimension: number[]) {
		this.onUploadFiles({
			file,
			name,
			dimension,
			extension: ['png'],
		});
	}


	get formValidate() {
		return (this.$refs.form as Vue & { validate: () => boolean }).validate();
	}

	public onNextStep() {
		if (this.formValidate) {
			this.submitStepData('stageFour', this.stepData);
			this.nextStep();
		}
	}


	public onPrevStep() {
		this.prevStep();
	}

}
