import Vue from 'vue';
import { Prop, Component } from 'vue-property-decorator';
import { requireField } from '@/Helpers/FormValidate';
import StageSixInterface from '@/components/CreateAppStages/StageSix/StageSixInterface';

@Component({ })
export default class StageSix extends Vue {
	@Prop(Array) public stepData!: StageSixInterface[];
	@Prop(Function) public nextStep!: () => void;
	@Prop(Function) public prevStep!: () => void;
	@Prop(Function) public submitForm!: Function;
	@Prop(Function) public submitStepData!: (name: string, data: any) => void;

	public fieldRules = {
		requireField,
	};

	get disabledButton() {
		return this.stepData.length >= 5;
	}

	public addReview() {
		const id = `f${(+new Date).toString(16)}`;
		this.stepData.push({
			name: `Отзыв `,
			authorName: '',
			authorLastName: '',
			starCount: '',
			likesCount: '',
			text: '',
			id,
			avatar: {
				name: '',
				nameID: '',
				file: null,
			},
		});
	}

	public removeReview(index: number) {
		this.$delete(this.stepData, index);
	}

	public onPrevStep() {
		this.prevStep();
	}

	public onNextStep() {
		this.nextStep();
	}

	public pickFile() {
		(this.$refs.image as HTMLInputElement).click ();
	}

	public onFilePicked(e: Event, inputIndex: number, id: string) {
		const files = (e.target as HTMLInputElement).files!;
		const avatarsList = (this as any).reviewList[inputIndex].avatar;
		if (files[0]) {
			const fr = new FileReader ();
			const blob = files[0].slice(0, files[0].size, 'image/png');
			const newFile = new File([blob], `${id}-${files[0].name}`, { type: 'image/png'});

			fr.readAsDataURL(files[0]);
			fr.addEventListener('load', () => {
				avatarsList.file = newFile;
				avatarsList.nameID = newFile.name;
				avatarsList.name = files[0].name;
				// this is an image file that can be sent to server...
			});
		}
	}

	public onSubmitForm() {
		// const stageSixData = {
		// 	reviewList: this.reviewList,
		// };
		//
		// this.submitStepData('stageSix', stageSixData);
		this.submitForm();
	}

}
