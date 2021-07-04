import { Logger } from '@nestjs/common';
import { Fibonacci } from 'src/shared/models/fibonacci.model';
export declare class QueryService {
    logger: Logger;
    getFibonacci(x: number, y: number, total: number): Fibonacci;
}
