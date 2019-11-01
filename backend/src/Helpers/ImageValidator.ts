import { ValidateImageInterface } from 'src/Interfaces/UploadImageDtoInterface';
import * as util from 'util';
import * as sharp from 'sharp';
import * as assert from 'assert';


export class ImageValidator {
  public static async validate(dto: ValidateImageInterface, path: Blob) {
    const { dimension, extension } = dto;
    const { format, width, height} = await sharp(path).metadata();
    const actualDimension = [ width, height ];
    const errors = [];

    try {
      assert.deepStrictEqual(actualDimension, dimension);
    } catch (error) {
      errors.push({ field: 'dimension', expected: dimension, actual: actualDimension });
    }

    try {
      assert(extension.includes(format.toLowerCase()));
    } catch (error) {
      errors.push({ field: 'extension', expected: extension, actual: format.toLowerCase() });
    }

    if (errors.length > 0) {
      throw errors;
    }
  }
}
