import Vue from 'vue';
import { Prop, Component } from 'vue-property-decorator';
import { requireField, validateImageSize, validateImageSizeT } from '@/Helpers/FormValidate';
import StageFiveInterface from '@/components/CreateAppStages/StageFive/StageFiveInterface';

@Component({ })
export default class StageFive extends Vue {
	@Prop(Function) public nextStep!: () => void;
	@Prop(Function) public prevStep!: () => void;
	@Prop(Function) public submitStepData!: (name: string, data: any) => void;

	public listOfInputs: StageFiveInterface[] = [];
	public count: number = 0;

	public fieldRules = {
		requireField,
		validateSize: this.onValidateSize,
	};

	get disabledButton() {
		return this.listOfInputs.length >= 5;
	}

	public addInputImage() {
		this.count++;
		const id = `f${(+new Date).toString(16)}`;
		this.listOfInputs.push({
			name: `Скриншот ${this.count}*`,
			nameID: '',
			id,
			file: null,
			index: this.count,
		});
	}

	public removeInputImage(index: number) {
		this.count--;
		this.$delete(this.listOfInputs, index);
	}

	public onNextStep() {
		const stageFive = this.listOfInputs;
		this.submitStepData('stageFive', stageFive);
		this.nextStep();
	}

	public onPrevStep() {
		this.prevStep();
	}

	public pickFile() {
		(this.$refs.image as HTMLInputElement).click ();
	}

	public onFilePicked(file: File, inputIndex: number, id: string) {
		const screenshotsList = (this as any).listOfInputs[inputIndex];
		if (file) {
			const fr = new FileReader ();
			const blob = file.slice(0, file.size, 'image/png');
			const newFile = new File([blob], `${id}-${file.name}`, { type: 'image/png'});
			fr.readAsDataURL(file);
			fr.addEventListener('load', () => {
				const res = fr.result as any;
				validateImageSize(res, { min: 200, max: 750} )
					.then((res) => {
						 if (res) {
							 screenshotsList.file = newFile;
							 screenshotsList.nameID = newFile.name;
							 screenshotsList.name = file.name;
						} else {
							 console.log('Размеры изображения должны быть не менее 200 и не более 750');
						 }
					})
					.catch((err) =>  new Error(err));
			});
		}
	}

	public onValidateSize(file: File) {
		if (file) {
			const fr = new FileReader ();
			fr.readAsDataURL(file);
			fr.addEventListener('load', () => {
				const res = fr.result as any;
				validateImageSize(res, { min: 200, max: 750} )
					.then((res) => {
						if (res) {
							return 'lol'
						} else {
							return 'Размеры изображения должны быть не менее 200px и не более 750px';
						}
					})
					.catch((err) =>  new Error(err));
			});
		}
	}

}
