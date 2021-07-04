import { Movie } from 'src/shared/models/movie.model';
import { Pokemon } from 'src/shared/models/pokemon.model';
import { ParamService } from './param.service';
export declare class ParamController {
    private readonly paramService;
    constructor(paramService: ParamService);
    getAllPokemon(): Pokemon[];
    getPokemon(id: number): Pokemon;
    getAllMovies(): Movie[];
    getMovie(name: string): Movie;
}
