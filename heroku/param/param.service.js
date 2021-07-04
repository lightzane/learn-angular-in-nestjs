"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParamService = void 0;
const common_1 = require("@nestjs/common");
const collections_1 = require("../shared/mocks/collections");
const movie_model_1 = require("../shared/models/movie.model");
const pokemon_model_1 = require("../shared/models/pokemon.model");
let ParamService = class ParamService {
    constructor() {
        this.logger = new common_1.Logger('ParamService', true);
    }
    getAllPokemon() {
        this.logger.debug('Client requested for all the Pokemon...');
        return collections_1.getPokemon();
    }
    getPokemon(id) {
        this.logger.debug(`Client requested for a specific Pokemon with an id of ${id}`);
        let pkmn = collections_1.getPokemon().filter((pkmn) => pkmn.id == id)[0];
        if (!pkmn)
            throw new common_1.NotFoundException('Lightzane: Pokemon Not Found');
        return pkmn;
    }
    getAllMovies() {
        this.logger.debug(`Client requested for all the movies`);
        return collections_1.getMovies();
    }
    getMovie(name) {
        this.logger.debug(`Client requested for a specific movie: ${name}`);
        let movie = collections_1.getMovies().filter((mvi) => mvi.url == name)[0];
        if (!movie)
            throw new common_1.NotFoundException('Lightzane: Movie not on list!');
        return movie;
    }
};
ParamService = __decorate([
    common_1.Injectable()
], ParamService);
exports.ParamService = ParamService;
//# sourceMappingURL=param.service.js.map