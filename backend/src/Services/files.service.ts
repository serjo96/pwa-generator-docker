import { Injectable } from '@nestjs/common';

import * as fs from 'fs';
import * as util from 'util';
import { IconsInterfaces } from '../Interfaces/FilesInterfaces';

const rename = util.promisify(fs.rename);

@Injectable()
export class FilesService {
  files: any;
  icons: IconsInterfaces = {
    iconSmallPWA: null,
    iconMiddlePWA: null,
  };

  formatReceivedFiles(files) {
    this.files = files;
    this.icons = {
      iconSmallPWA: (files.iconSmallPWA) ? files.iconSmallPWA[0] : '',
      iconMiddlePWA: (files.iconMiddlePWA) ? files.iconMiddlePWA[0] : '',
    };
  }

  async renameImages(filesArray: any[], field: string, user: string, appName: string) {
    filesArray.forEach(async file => {
      const oldPath = `src/View/images/${user}/${appName}/${filesArray[file]}.png`;
      const newPath = `/path/to/${file}.png`;

      try {
        await rename(oldPath, newPath);
      } catch (error) {
        console.log(`Error = ${JSON.stringify(error)}`);
      }
    });
  }

  get returnFormFiles() {
    return this.files;
  }

  get returnIcons() {
    return this.icons;
  }
}
