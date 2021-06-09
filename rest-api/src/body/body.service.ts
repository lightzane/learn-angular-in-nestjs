import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class BodyService {
  logger = new Logger('BodyService', true);

  submitPOST(data: any): any {
    this.logger.debug('Client has submitted some items...');
    this.logger.debug({
      items: data.items,
    });

    const timestamp = new Date().toISOString();
    const dateReceived = new Date().toLocaleDateString();
    const timeReceived = new Date().toLocaleTimeString();
    const totalItems = data.totalItems;
    const overallPrice = data.overallPrice;

    return {
      lightzane: {
        timestamp,
        dateReceived,
        timeReceived,
        totalItems,
        overallPrice,
        items: data.items,
      },
    };
  }
}
