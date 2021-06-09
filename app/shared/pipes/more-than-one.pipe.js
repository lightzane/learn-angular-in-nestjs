"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoreThanOnePipe = void 0;
const common_1 = require("@nestjs/common");
let MoreThanOnePipe = class MoreThanOnePipe {
    transform(value, metadata) {
        const n = parseInt(value);
        if (isNaN(n)) {
            throw new common_1.BadRequestException(`Lightzane: The value of Total is not a number: ${value}`);
        }
        if (n < 2) {
            throw new common_1.BadRequestException(`Lightzane: Total should be more than 1`);
        }
        return n;
    }
};
MoreThanOnePipe = __decorate([
    common_1.Injectable()
], MoreThanOnePipe);
exports.MoreThanOnePipe = MoreThanOnePipe;