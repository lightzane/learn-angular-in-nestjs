"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryService = void 0;
const common_1 = require("@nestjs/common");
const fibonacci_model_1 = require("../shared/models/fibonacci.model");
let QueryService = class QueryService {
    constructor() {
        this.logger = new common_1.Logger('QueryService', true);
    }
    getFibonacci(x, y, total) {
        this.logger.debug('Client has requested for a fibonacci sequence');
        this.logger.log({
            x,
            y,
            total,
        });
        let sum = x + y;
        let n = total ? total - 1 : 9;
        let sequence = [];
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
};
QueryService = __decorate([
    common_1.Injectable()
], QueryService);
exports.QueryService = QueryService;
//# sourceMappingURL=query.service.js.map