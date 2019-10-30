import { HttpException, Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { QueryInterface } from '../Interfaces/requestInterfaces';
import { FormatDataService } from './formatData.service';
import { TemplateInterface } from 'src/Interfaces/TemplateInterface';

interface LinksInterface {
  subDomain: string;
  link: string;
}

@Injectable()
export class FirebaseService {
  constructor(private readonly formData: FormatDataService) {
  }

  saveData({ UID, appName }: QueryInterface, userName: string, links: LinksInterface) {
    const formData = this.formData.returnFormData;
    admin
      .firestore()
      .collection('users')
      .doc(UID)
      .collection('apps')
      .doc(appName)
      .set({
        userName,
        formData,
        links,
      })
      .then(() => console.log('Success'))
      .catch(err => {
        throw new Error(err);
      });

  }

  removeApp({ UID, appName }: QueryInterface) {
    admin
      .firestore()
      .collection('users')
      .doc(UID)
      .collection('apps')
      .doc(appName)
      .delete()
      .then(() => console.log('Success deleted'))
      .catch(err => {
        throw new Error(err);
      });
  }

  public static async getTemplates() {
    return admin
      .firestore()
      .collection('templates')
      .select('id', 'name')
      .get();
  }

  public static async getTemplate(id: string) {
    return admin
      .firestore()
      .collection('templates')
      .doc(id)
      .get();
  }

  public static async createTemplate(data: TemplateInterface) {
    const { name } = data;

    return admin
      .firestore()
      .collection('templates')
      .doc(name)
      .set(data);
  }

  public static async removeTemplate(id: string) {
    const doc = admin
    .firestore()
    .collection('templates')
    .doc(id);
    const template = await doc.get();

    if (!template.exists) {
      throw new HttpException({ id, status: 'Not found' }, 404);
    }

    return doc.delete();
  }
}
