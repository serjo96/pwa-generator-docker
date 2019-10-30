import { Injectable } from '@nestjs/common';
import { FormDataInterface } from '../Interfaces/FormData';

@Injectable()
export class FormatDataService {
  formData: FormDataInterface;
  user: string;

  formatReceivedData(formData: string, email: string) {
    this.formData = JSON.parse(formData);
    this.setUser(email);
  }

  setUser(email: string) {
    this.user = email;
  }

  get returnFormData() {
    return this.formData;
  }

  get returnUser() {
    return this.user.split('@')[0];
  }

  get userEmail() {
    return this.user;
  }
}
