import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './Controller/app.controller';
import { AppService } from './Services/app.service';
import { FirebaseService } from './Services/firebase.service';
import { FormatDataService } from './Services/formatData.service';
import { FilesService } from './Services/files.service';
import { DeleteAppService } from './Services/deleteApp.service';
import { ConfigService } from './Services/config.service';
import { SubdomainMiddleware } from './Middleware/subdomain.middleware';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, FormatDataService, FirebaseService, FilesService, DeleteAppService, {
    provide: ConfigService,
    useValue: new ConfigService('./src/.env'),
  }],
  exports: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
        .apply(SubdomainMiddleware)
        .forRoutes('*');
  }
}
