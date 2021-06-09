"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParamModule = void 0;
const common_1 = require("@nestjs/common");
const param_service_1 = require("./param.service");
const param_controller_1 = require("./param.controller");
let ParamModule = class ParamModule {
};
ParamModule = __decorate([
    common_1.Module({
        providers: [param_service_1.ParamService],
        controllers: [param_controller_1.ParamController]
    })
], ParamModule);
exports.ParamModule = ParamModule;