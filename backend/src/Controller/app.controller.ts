import {
  Controller,
  Body,
  Post,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  Query,
  Get,
  Res,
  Delete,
  Header,
  HttpException,
  Req,
} from '@nestjs/common';

import * as fs from 'fs';
import * as util from 'util';
import { diskStorage } from 'multer';
import { AppService } from '../Services/app.service';
import { FirebaseService } from '../Services/firebase.service';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { mkDirByPathSync, removeDir } from '../Helpers/FolderHelper';
import { QueryInterface } from '../Interfaces/requestInterfaces';
import { FormatDataService } from '../Services/formatData.service';
import { FilesService } from '../Services/files.service';
import { DeleteAppService } from '../Services/deleteApp.service';
import { ConfigService } from '../Services/config.service';
import { get } from 'lodash';
import request = require('request');
import * as Url from 'url';
import { ImageValidator } from '../Helpers/ImageValidator';
import { toValidateImageDto } from '../Helpers/toUploadImageDto';
import { getApplicationFilePath, getApplicationFolderPath, getTemplateFilePath, getTemplateFolderPath } from '../Helpers/ApplicationFolderHelper';

const removeFile = util.promisify(fs.unlink);
const readFile = util.promisify(fs.readFile);

const storage = {
  storage: diskStorage({
    destination: (req, file, callback) => {
      const user = req.query.email;
      const appName = req.query.appName;
      const path = getApplicationFilePath(user, appName, file.fieldname);

      if (!fs.existsSync(path)) {
        mkDirByPathSync(path, { sep: '/' });
      }

      callback(null, path);
    },

    filename: (req, file, callback) => {
      const fileName = file.fieldname === 'appLogo' ? `${file.fieldname}.png` : `${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};

const templateDataStorage = {
  storage: diskStorage({
    destination: (req, file, callback) => {
      const templateName = req.body.name;
      const path = getTemplateFolderPath(templateName);

      if (!fs.existsSync(path)) {
        mkDirByPathSync(path, { sep: '/' });
      }

      callback(null, path);
    },

    filename: (req, file, callback) => {
      const fileName = file.fieldname === 'appLogo' ? `${file.fieldname}.png` : `${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};

const imageUploadDataStorage = {
  storage: diskStorage({
    destination: (req, file, callback) => {
      const { name, user, appName } = req.body;
      const { isTemplate } = req.query;

      let path = getApplicationFilePath(user, appName, name);

      if (isTemplate) {
        path = getTemplateFilePath(appName, name);
      }

      if (!fs.existsSync(path)) {
        mkDirByPathSync(path, { sep: '/' });
      }

      callback(null, path);
    },

    filename: (req, file, callback) => {
      const {name: fileName } = req.body;
      const format = file.originalname.split('.')[1];

      return callback(null, `${fileName}.${format}`);
    },
  }),
};

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly formatDataService: FormatDataService,
    private readonly filesService: FilesService,
    private readonly firebaseService: FirebaseService,
    private readonly deleteAppService: DeleteAppService,
    private readonly config: ConfigService,
  ) {
  }

  @Post('/generatePWA')
  @Header('Content-Type', 'application/json')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'appLogo', maxCount: 1 },
    { name: 'iconSmallPWA', maxCount: 1 },
    { name: 'iconMiddlePWA', maxCount: 1 },
    { name: 'usersAvatars', maxCount: 20 },
    { name: 'screenshots', maxCount: 20 },
  ], storage))
  async receiveData(@UploadedFiles() images, @Body() fileDto: any, @Query() urlQuery: QueryInterface, @Req() req) {

    this.formatDataService.formatReceivedData(fileDto.createAppForm, urlQuery.email);

    const user = this.formatDataService.userEmail;
    const userName = this.formatDataService.returnUser;
    const appName = this.formatDataService.returnFormData.stageOne.appName;
    const links = {
      subDomain: Url.format({
        protocol: req.protocol,
        hostname: `${appName}.${userName}.${req.hostname}`,
      }),
      link: `https://playshow.online/${userName}/${appName}`,
    };

    this.filesService.formatReceivedFiles(images);
    await this.filesService.renameImages(this.formatDataService.returnFormData.stageFive, 'name', user, appName);
    await this.filesService.renameImages(this.formatDataService.returnFormData.stageSix, 'avatar', user, appName);

    try {
      await this.appService.generateHtml();

      await this.firebaseService.saveData(urlQuery, userName, links);

      return 'success created';
    } catch (error) {
      throw new HttpException({ error }, 500);
    }
  }

  @Delete('/deleteApp')
  deleteApp(@Query() urlQuery) {
    this.formatDataService.setUser(urlQuery.email);
    const user = this.formatDataService.returnUser;
    this.deleteAppService.removeApp(user, urlQuery.appName);
    this.firebaseService.removeApp(urlQuery);
    return 'deleted';
  }

  @Get('/templates')
  async getTemplates() {
    const templates = await FirebaseService.getTemplates();
    const result = templates.docs.map(x => ({ ...x.data(), id: x.id }));

    return JSON.stringify(result);
  }

  @Get('/template/:id')
  async getTemplate(@Req() { params }) {
    const { id } = params;
    const template = await FirebaseService.getTemplate(id);

    if (!template.exists) {
      throw new HttpException({ id }, 404);
    }

    return JSON.stringify(template.data());
  }

  @Post('/template')
  @Header('Content-Type', 'application/json')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'appLogo', maxCount: 1 },
    { name: 'iconSmallPWA', maxCount: 1 },
    { name: 'iconMiddlePWA', maxCount: 1 },
  ], templateDataStorage))
  async createTemplate(@UploadedFiles() images, @Body() fileDto: any) {
    try {
      this.filesService.formatReceivedFiles(images);
      const files = this.filesService.returnFormFiles;
      const imageObjects = await Promise.all(Object
      .values(files)
      .map(async ([{ path, fieldname }]) => {
        return {
          name: fieldname,
          data: await readFile(path, 'base64'),
        };
      }));
      const { createAppForm, name } = fileDto;

      await FirebaseService.createTemplate({
        formData: createAppForm,
        images: imageObjects,
        name,
      });
    } catch (err) {
      return err;
    }

    return JSON.stringify({ status: 'OK' });
  }

  @Get('/template/:id/delete')
  async deleteTemplate(@Req() { params }) {
    const { id } = params;

    await FirebaseService.removeTemplate(id);

    return JSON.stringify({ status: 'OK' });
  }

  @Post('/image/upload')
  @UseInterceptors(FileInterceptor('file', imageUploadDataStorage))
  async uploadImage(@Req() req, @UploadedFile('file') file, @Body() uploadImageDto: any) {
    try {
      const { needValidate = false } = req.query;

      if (needValidate) {
        const imageDto = toValidateImageDto(req.body);
        await ImageValidator.validate(imageDto, file.path);
      }

      return JSON.stringify({ status: 'OK', path: file.path });
    } catch (error) {
      await removeFile(file.path);
      throw new HttpException({ errors: error }, 400);
    }
  }

  @Get('/generatePWA/break/:userId/:tempFolderId')
  async breakGeneratePwa(@Req() req) {
    const { userId, tempFolderId } = req.params;

    await removeDir(getApplicationFolderPath(userId, tempFolderId));

    return JSON.stringify({ status: 'OK' });
  }

  @Get('*')
  get(@Req() req, @Res() res) {
    const hasSubDomain = get(req, 'pwa.hasSubDomain', false);

    if (hasSubDomain) {
      const { path: targetPath, host } = get(req, 'pwa');
      const url = new URL(targetPath, host).toString();

      request(url).pipe(res);
    }

    throw new HttpException(req.url, 404);
  }
}
