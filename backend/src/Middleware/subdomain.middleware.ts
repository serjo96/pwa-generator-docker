import { Injectable, NestMiddleware } from '@nestjs/common';
import { get, set } from 'lodash';

@Injectable()
export class SubdomainMiddleware implements NestMiddleware<Express.Request> {
  use(req, res: any, next: () => void) {
    const host = get(req, 'headers.host', '');
    const hostSplit = host.split('.');

    if (hostSplit.length < 3) {
      set(req, 'pwa.hasSubDomain', false);
      next();

      return;
    }

    const path = hostSplit.slice(0, 2).reverse().join('/');
    const targetHost = hostSplit.slice(2).join('.');

    set(req, 'pwa.path', path + req.baseUrl);
    set(req, 'pwa.host', `${req.protocol}://${targetHost}`);
    set(req, 'pwa.hasSubDomain', true);

    next();
  }
}
