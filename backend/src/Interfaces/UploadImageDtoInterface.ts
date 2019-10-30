export interface UploadedFile extends File {
  buffer: Buffer;
  encoding: string;
}

export interface ValidateImageInterface {
  name: string;
  dimension: number[];
  extension: string[];
}

export interface UploadImageDtoInterface extends ValidateImageInterface {
  user: string;
  appName: string;
}
