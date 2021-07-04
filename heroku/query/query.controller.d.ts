import { QueryService } from './query.service';
export declare class QueryController {
    private readonly queryService;
    constructor(queryService: QueryService);
    getFibonacci(x: number, y: number, total: number): import("../shared/models/fibonacci.model").Fibonacci;
}
