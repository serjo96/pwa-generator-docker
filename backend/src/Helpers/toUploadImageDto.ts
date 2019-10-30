import { ValidateImageInterface } from 'src/Interfaces/UploadImageDtoInterface';

export function toValidateImageDto({ name, ...data }: any): ValidateImageInterface {
  const dimension = JSON.parse(data.dimension);
  const extension = JSON.parse(data.extension);

  return {
    name,
    dimension,
    extension,
  };
}
