"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryController = void 0;
const common_1 = require("@nestjs/common");
const more_than_one_pipe_1 = require("../shared/pipes/more-than-one.pipe");
const query_service_1 = require("./query.service");
let QueryController = class QueryController {
    constructor(queryService) {
        this.queryService = queryService;
    }
    getFibonacci(x, y, total) {
        return this.queryService.getFibonacci(x, y, total);
    }
};
__decorate([
    common_1.Get('fibonacci'),
    __param(0, common_1.Query('x', common_1.ParseIntPipe)),
    __param(1, common_1.Query('y', common_1.ParseIntPipe)),
    __param(2, common_1.Query('total', more_than_one_pipe_1.MoreThanOnePipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", void 0)
], QueryController.prototype, "getFibonacci", null);
QueryController = __decorate([
    common_1.Controller('query'),
    __metadata("design:paramtypes", [query_service_1.QueryService])
], QueryController);
exports.QueryController = QueryController;