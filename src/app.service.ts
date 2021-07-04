import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  logger = new Logger('AppService', true);

  getHello(): any {
    this.logger.debug('Client has connected to the server...');
    return {
      text: 'Hello World!',
    };
  }
}
