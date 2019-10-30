import { CreateAppInterface } from '@/Pages/CreateApp/CreateAppInterface';

const formInitData: CreateAppInterface = {
	stageOne: {
		appName: '',
		shortAppName: '',
		imageName: '',
		appLogo: null,
		ratingNumbers:  '',
		starsCount: '',
		developerName: '',
		developerEmail: '',
		developerSite: '',
		appSize: '',
		appVersion: '',
		ageRestrictions: '',
		appInstallCount: '',
		categorySelect: '',
	},
	stageTwo: {
		oneStar: '',
		twoStar: '',
		threeStar: '',
		fourStar: '',
		fiveStar: '',
	},
	stageThree: {
		lastAppChanges: '',
		fullAppDescription: '',
		shortDescription: '',
	},
	stageFour: {
		linkToPWA: '',
		languagePWA: '',
		backgroundPWA: '',
		iconSmallName: '',
		iconSmallPWA: null,
		iconMiddleName: '',
		iconMiddlePWA: null,
	},
	stageFive: [],
	stageSix: [],
};

export default formInitData;
