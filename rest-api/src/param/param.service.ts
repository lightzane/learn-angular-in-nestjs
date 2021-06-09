import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { getMovies, getPokemon } from 'src/shared/mocks/collections';
import { Movie } from 'src/shared/models/movie.model';
import { Pokemon } from 'src/shared/models/pokemon.model';

@Injectable()
export class ParamService {
  logger = new Logger('ParamService', true);

  getAllPokemon(): Pokemon[] {
    this.logger.debug('Client requested for all the Pokemon...');
    return getPokemon();
  }

  getPokemon(id: number): Pokemon {
    this.logger.debug(
      `Client requested for a specific Pokemon with an id of ${id}`,
    );
    let pkmn: Pokemon = getPokemon().filter((pkmn) => pkmn.id == id)[0];
    if (!pkmn) throw new NotFoundException('Lightzane: Pokemon Not Found');
    return pkmn;
  }

  getAllMovies(): Movie[] {
    this.logger.debug(`Client requested for all the movies`);
    return getMovies();
  }

  getMovie(name: string): Movie {
    this.logger.debug(`Client requested for a specific movie: ${name}`);
    let movie = getMovies().filter((mvi) => mvi.url == name)[0];
    if (!movie) throw new NotFoundException('Lightzane: Movie not on list!');
    return movie;
  }
}
