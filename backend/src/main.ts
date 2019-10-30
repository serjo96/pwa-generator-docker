import { NestFactory } from '@nestjs/core';
const admin = require('firebase-admin');
const express = require('express');
import {NestExpressApplication} from '@nestjs/platform-express';
const path = require('path');
import { AppModule } from './app.module';
import serviceAccount from './Firebase/serviceAccountKey';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.useStaticAssets(path.resolve(  'assembledHTML'));
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://play777-fa962.firebaseio.com',
  });
  await app.listen(3000);
}

bootstrap();
