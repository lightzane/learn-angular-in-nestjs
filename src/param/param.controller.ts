import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { Movie } from 'src/shared/models/movie.model';
import { Pokemon } from 'src/shared/models/pokemon.model';
import { ParamService } from './param.service';

@Controller('param')
export class ParamController {
  constructor(private readonly paramService: ParamService) {}
  // Get Pokemon
  @Get('pokemon')
  getAllPokemon(): Pokemon[] {
    return this.paramService.getAllPokemon();
  }
  @Get('pokemon/:id')
  getPokemon(@Param('id', ParseIntPipe) id: number): Pokemon {
    return this.paramService.getPokemon(id);
  }

  // Get Movies
  @Get('movies')
  getAllMovies(): Movie[] {
    return this.paramService.getAllMovies();
  }
  @Get('movies/:name')
  getMovie(@Param('name') name: string): Movie {
    return this.paramService.getMovie(name);
  }
}
