import { storage } from 'firebase';
import { CreateAppInterface } from '@/Pages/CreateApp/CreateAppInterface';
import StageSixInterface from '@/components/CreateAppStages/StageSix/StageSixInterface';
import StageFiveInterface from '@/components/CreateAppStages/StageFive/StageFiveInterface';

export const formFilesHelper = (fullForm: CreateAppInterface): FormData => {
	const formData = new FormData();
	console.log(fullForm);
	const {
		stageOne: { appLogo },
		stageFour: { iconSmallPWA, iconMiddlePWA },
		stageFive,
		stageSix,
	} = fullForm;
	formData.append('createAppForm', JSON.stringify(fullForm));

	if (stageFive.length) {
		stageFive.forEach(({ file }: StageFiveInterface) => {
			if (file) {
				formData.append('screenshots', file);
			}
		});
	}

	if (stageSix.length) {
		stageSix.forEach( (review: StageSixInterface) => {
			if (review.avatar.file) {
				formData.append('usersAvatars', review.avatar.file);
			}
		});
	}

	if (appLogo) {
		formData.append('appLogo', appLogo);
	}
	if (iconSmallPWA) {
		formData.append('iconSmallPWA', iconSmallPWA);
	}
	if (iconMiddlePWA) {
		formData.append('iconMiddlePWA', iconMiddlePWA);
	}

	return formData;
};


function uploadImageAsPromise(imageFile: File, UID: string, imgType: string,  appName: string) {
	return new Promise(function(resolve, reject) {
		const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
		const path = `${UID}/apps/${appName}/${imgType}/${imageFile.name}-${randomName}`;
		const storageRef = storage().ref(path);
		// Upload file
		const task = storageRef.put(imageFile);

		// Update progress bar
		task.on(storage.TaskEvent.STATE_CHANGED,
			function progress(snapshot) {

			},
			function error(err) {

			},
			function complete() {
				task.snapshot.ref.getDownloadURL()
					.then((downloadURL) => {
						console.log(downloadURL);
						resolve(downloadURL);
					})
				;
			},
		);
	});
}


export const uploadToStore = (fullForm: CreateAppInterface, UID: string): FormData => {
	const formData = new FormData();
	const {
		stageOne: { appLogo },
		stageFour: {  iconSmallPWA, iconMiddlePWA },
		stageFive,
		stageSix,
	} = fullForm;

	stageFive.forEach(({ file }: StageFiveInterface) => {
		if (file) {
			uploadImageAsPromise(file, UID, 'screenshots', fullForm.stageOne.appName);
		}
	});

	stageSix.forEach( (review: StageSixInterface) => {
		if (review.avatar.file) {
			uploadImageAsPromise(review.avatar.file, UID, 'usersAvatars', fullForm.stageOne.appName)
				.then((link) => {
					// console.log(link);
				});
		}
	});

	if (appLogo) {
		uploadImageAsPromise(appLogo, UID, 'appLogo', fullForm.stageOne.appName)
			.then((link) => {
				// console.log(link);
			});
	}

	if (iconSmallPWA) {
		uploadImageAsPromise(iconSmallPWA, UID, 'iconSmallPWA', fullForm.stageOne.appName);
	}

	if (iconMiddlePWA) {
		uploadImageAsPromise(iconMiddlePWA, UID, 'iconMiddlePWA', fullForm.stageOne.appName);
	}

	formData.append('createAppForm', JSON.stringify(fullForm));

	return formData;
};
