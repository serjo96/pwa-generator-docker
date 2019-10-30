import { Injectable } from '@nestjs/common';
import { FormatDataService } from './formatData.service';
import { FilesService } from './files.service';
import { cleanImageFolder } from '../Helpers/FolderHelper';

const webpack = require('webpack'); // to access webpack runtime
const configuration = require('../../webpack.config');
const join = require('path').join;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
const fs = require('fs');

@Injectable()
export class AppService {
  constructor(private readonly formData: FormatDataService, private readonly filesServices: FilesService) {
  }

  async generateHtml() {
    const promiseWrapper = { res: null, rej: null };
    const promise = new Promise((res, rej) => {
      promiseWrapper.res = res;
      promiseWrapper.rej = rej;
    });
    const formData = this.formData.returnFormData;
    const user = this.formData.returnUser;
    const userEmail = this.formData.userEmail;
    const icons = this.filesServices.returnIcons;
    const compiler = webpack(configuration(`${user}/${formData.stageOne.appName}`));
    const imageDir = `src/View/images/${userEmail}/${formData.stageOne.appName}`;
    const hasScreenshots = fs.existsSync(join(process.cwd(), `${imageDir}/screenshots`));
    const hasAvatars = fs.existsSync(join(process.cwd(), `${imageDir}/usersAvatars`));
    const { languagePWA } = formData.stageFour;
    new webpack.ProgressPlugin().apply(compiler);
    compiler.apply(new HtmlWebpackPlugin({
      inject: true,
      hash: true,
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
      },
      templateParameters: {
        formData,
        user,
        lang: languagePWA.toLowerCase(),
      },
      template: join(process.cwd(), 'src/View/index.hbs'),
    }));

    compiler.apply(new webpack.DefinePlugin({
      userEmail: JSON.stringify(userEmail),
      user: JSON.stringify(user),
      appName: (formData.stageOne) ? JSON.stringify(formData.stageOne.appName) : '',
      redirectUrl: (formData.stageFour) ? JSON.stringify(formData.stageFour.linkToPWA) : '',
      appSize: JSON.stringify(formData.stageOne.appSize),
      hasScreenshots,
      lang: JSON.stringify(languagePWA.toLowerCase()),
      hasAvatars,
    }));

    compiler.apply(new WebpackPwaManifest({
      name: (formData.stageOne) ? formData.stageOne.appName : '',
      short_name: (formData.stageOne) ? formData.stageOne.shortAppName : '',
      description: (formData.stageThree) ? formData.stageThree.shortDescription : '',
      background_color: (formData.stageFour) ? formData.stageFour.backgroundPWA : '',
      theme_color: (formData.stageFour) ? formData.stageFour.backgroundPWA : '',
      display: 'fullscreen',
      start_url: `.?utm_source=homescreen`,
      includeDirectory: true,
      icons: [
        {
          src: icons.iconSmallPWA.path,
          sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
          destination: join('icons', 'small'),
        },
        {
          src: (icons.iconMiddlePWA) ? icons.iconMiddlePWA.path : '',
          size: '1024x1024', // you can also use the specifications pattern
          destination: join('icons', 'middle'),
        },
      ],
    }));
    compiler.apply(new ServiceWorkerWebpackPlugin({
      entry: join(process.cwd(), 'src/View/service-worker.js'),
      filename: 'service-worker.js',
      publicPath: `./`,
      excludes: ['**/.*', '**/*.map', '*.html'],
      minimize: false,
    }));
    compiler.run(async (err, stats) => {
      // ...
      if (err) {
        console.error(err.stack || err);
        if (err.details) {
          console.error(err.details);
        }

        promiseWrapper.rej(err);
        return;
      }

      const info = stats.toJson();
      if (stats.hasErrors()) {
        console.error(info.errors);

        promiseWrapper.rej(info.errors);

        return;
      }

      if (stats.hasWarnings()) {
        console.warn(info.warnings);
      }

      // console.log(stats.toJson({
      //   assets: false,
      //   hash: true,
      // }));
      // uncommit if need more info about build

      console.log(stats.toString({
        chunks: false,  // Makes the build much quieter
        colors: true,   // Shows colors in the console
      }));

      await cleanImageFolder(imageDir);
      promiseWrapper.res('build end');
    });

    return promise;
  }
}
