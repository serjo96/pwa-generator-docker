export const requireField = (value: string ) => !!value || 'Обязательное поле.';
export const emailRequired = (value: string ) => !!value || 'Необходимо ввести E-mail.';
export const hexColor = (value: string ) => /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/igm.test(value) || 'Color must be in hex';
export const urlValidate = (value: string ) => /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/.test(value) || 'Url must be valid';
export const validEmailRequired =  (value: string ) => /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(value) || 'E-mail должен быть валидным';
export const validateImageSize = (fsRes: any, size: { fixSize?: number, min?: number, max?: number }) => {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.src = fsRes;
		img.addEventListener('load', () => {
			if (size.min && size.max) {
				resolve(img.width >= size.min && img.height <= size.max);
			} else {
				resolve(img.width === size.fixSize && img.height === size.fixSize);
			}
		});
		img.addEventListener('error', () => {
			reject(new Error(`Failed to load image's URL:`));
		});
	});
};
export const validateImageSizeT = (fsRes: any, size: { fixSize?: number, min?: number, max?: number }) => {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.src = fsRes;
		img.addEventListener('load', () => {
			if (size.min && size.max) {
				resolve(img.width >= size.min && img.height >= size.min);
			} else {
				resolve(img.width === size.fixSize && img.height === size.fixSize);
			}
		});
		img.addEventListener('error', () => {
			reject(new Error(`Failed to load image's URL:`));
		});
	});
};

export const validateImages = (file: File, size: number) => {
	return new Promise((resolve, reject) => {
		if (file) {
			const fr = new FileReader();
			fr.readAsDataURL(file);
			fr.addEventListener('load', () => {
				const res = fr.result as string;
				const img = new Image();
				img.src = res;
				img.addEventListener('load', () => resolve(img.width === size && img.height === size));
				img.addEventListener('error', () => {
					reject(false);
				});
			});
		} else {
			reject(false);
		}
	});
};
