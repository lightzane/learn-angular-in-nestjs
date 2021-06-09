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
exports.ParamController = void 0;
const common_1 = require("@nestjs/common");
const movie_model_1 = require("../shared/models/movie.model");
const pokemon_model_1 = require("../shared/models/pokemon.model");
const param_service_1 = require("./param.service");
let ParamController = class ParamController {
    constructor(paramService) {
        this.paramService = paramService;
    }
    getAllPokemon() {
        return this.paramService.getAllPokemon();
    }
    getPokemon(id) {
        return this.paramService.getPokemon(id);
    }
    getAllMovies() {
        return this.paramService.getAllMovies();
    }
    getMovie(name) {
        return this.paramService.getMovie(name);
    }
};
__decorate([
    common_1.Get('pokemon'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Array)
], ParamController.prototype, "getAllPokemon", null);
__decorate([
    common_1.Get('pokemon/:id'),
    __param(0, common_1.Param('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Object)
], ParamController.prototype, "getPokemon", null);
__decorate([
    common_1.Get('movies'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Array)
], ParamController.prototype, "getAllMovies", null);
__decorate([
    common_1.Get('movies/:name'),
    __param(0, common_1.Param('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Object)
], ParamController.prototype, "getMovie", null);
ParamController = __decorate([
    common_1.Controller('param'),
    __metadata("design:paramtypes", [param_service_1.ParamService])
], ParamController);
exports.ParamController = ParamController;