import * as util from 'util';
import * as fs from 'fs';
import * as sharp from 'sharp';

export const ImageResizeHelper = async (file: any, sizes: number[], fileName: string) => {
	const format = file.originalname.split('.')[1];
	const removeFile = util.promisify(fs.unlink);
	const [width, height] = sizes;
	const semiTransparentRedPng = await sharp(file.path)
		.resize({width, height})
		.png({
			quality: 50
		})
		.toFile(`${file.destination}/${fileName}.${format}`);
	await removeFile(file.path);
	return semiTransparentRedPng
};
