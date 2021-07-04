import { Injectable, Logger } from '@nestjs/common';
import { Fibonacci } from 'src/shared/models/fibonacci.model';

@Injectable()
export class QueryService {
  logger = new Logger('QueryService', true);

  // return fibonacci sequence
  getFibonacci(x: number, y: number, total: number): Fibonacci {
    this.logger.debug('Client has requested for a fibonacci sequence');
    this.logger.log({
      x,
      y,
      total,
    });

    let sum: number = x + y;
    let n = total ? total - 1 : 9;
    let sequence: number[] = [];

    sequence.push(x);
    sequence.push(y);

    for (let i = 1; i < n; i++) {
      sequence.push(sum);
      sum = sequence[i] + sequence[i + 1];
    }

    return {
      first: x,
      second: y,
      sequence,
    };
  }
}
