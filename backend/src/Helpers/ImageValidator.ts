import { ValidateImageInterface } from 'src/Interfaces/UploadImageDtoInterface';
import * as util from 'util';
import * as imagemagick from 'imagemagick';
import * as assert from 'assert';

const identify = util.promisify(imagemagick.identify);

export class ImageValidator {
  public static async validate(dto: ValidateImageInterface, path: Blob) {
    const { dimension, extension } = dto;
    const actualResult = await identify(['-format', '{ "dimension": [%w, %h], "extension": \"%m\" }', path]);
    const actual = JSON.parse(actualResult);
    const [width, height] = dimension;
    const errors = [];

    try {
      assert.deepStrictEqual(actual.dimension, dimension);
    } catch (error) {
      errors.push({ field: 'dimension', expected: dimension, actual: actual.dimension });
    }

    try {
      assert(extension.includes(actual.extension.toLowerCase()));
    } catch (error) {
      errors.push({ field: 'extension', expected: extension, actual: actual.extension.toLowerCase() });
    }

    if (errors.length > 0) {
      throw errors;
    }
  }
}
