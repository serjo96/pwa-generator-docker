import { FormDataInterface } from 'src/Interfaces/FormData';

interface ImageInterface {
  name: string;
  data: string;
}

export interface TemplateInterface {
  formData: FormDataInterface;
  name: string;
  images: ImageInterface[];
}
