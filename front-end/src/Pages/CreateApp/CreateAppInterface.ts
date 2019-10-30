import StageOneInterface from '@/components/CreateAppStages/StageOne/StageOneInterface';
import StageTwoInterface from '@/components/CreateAppStages/StageTwo/StageTwoInterface';
import StageThreeInterface from '@/components/CreateAppStages/StageThree/StageThreeInterface';
import StageFourInterface from '@/components/CreateAppStages/StageFour/StageFourInterface';
import StageFiveInterface from '@/components/CreateAppStages/StageFive/StageFiveInterface';
import StageSixInterface from '@/components/CreateAppStages/StageSix/StageSixInterface';

export interface CreateAppInterface {
		stageOne: StageOneInterface;
		stageTwo: StageTwoInterface;
		stageThree: StageThreeInterface;
		stageFour: StageFourInterface;
		stageFive: StageFiveInterface[];
		stageSix: StageSixInterface[];
}


export class AppInterface implements CreateAppInterface {
		public stageOne!: StageOneInterface;
		public stageTwo!: StageTwoInterface;
		public stageThree!: StageThreeInterface;
		public stageFour!: StageFourInterface;
		public stageFive!: StageFiveInterface[];
		public stageSix!: StageSixInterface[];
}

