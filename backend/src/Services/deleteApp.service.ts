import { Injectable } from '@nestjs/common';
import {removeDir} from '../Helpers/FolderHelper';

@Injectable()
export class DeleteAppService {
    removeApp(user: string, appName: string) {
        removeDir(`./assembledHTML/${user}/${appName}/`);
    }

}
