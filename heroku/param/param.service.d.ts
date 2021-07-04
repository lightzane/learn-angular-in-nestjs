import { Logger } from '@nestjs/common';
import { Movie } from 'src/shared/models/movie.model';
import { Pokemon } from 'src/shared/models/pokemon.model';
export declare class ParamService {
    logger: Logger;
    getAllPokemon(): Pokemon[];
    getPokemon(id: number): Pokemon;
    getAllMovies(): Movie[];
    getMovie(name: string): Movie;
}
