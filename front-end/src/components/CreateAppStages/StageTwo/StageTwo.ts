import Vue from 'vue';
import { Prop, Component } from 'vue-property-decorator';
import StageTwoInterface from '@/components/CreateAppStages/StageTwo/StageTwoInterface';
import StageOneInterface from '@/components/CreateAppStages/StageOne/StageOneInterface';


@Component({ })
export default class StageTwo extends Vue {
	@Prop(Function) public nextStep!: () => void;
	@Prop(Function) public prevStep!: () => void;
	@Prop(Function) public submitStepData!: (name: string, data: any) => void;
	@Prop(Object) public stepData!: StageTwoInterface;


	get maxStar(): number {
		return Math.max(...Object.values(this.stepData).map(x => parseFloat(x) || 0));
	}

	private getCount(value: string) {
		return ((parseFloat(value) || 0) * 100) / this.maxStar;
	}

	get getFive() {
		return this.getCount(this.stepData.fiveStar);
	}

	get getFour() {
		return this.getCount(this.stepData.fourStar);
	}

	get getThree() {
		return this.getCount(this.stepData.threeStar);
	}

	get getTwo() {
		return this.getCount(this.stepData.twoStar);
	}

	get getOne() {
		return this.getCount(this.stepData.oneStar);
	}


	public onPrevStep() {
		this.prevStep();
	}

	public onNextStep() {
		this.submitStepData('stageTwo', this.stepData);
		this.nextStep();
	}
}
