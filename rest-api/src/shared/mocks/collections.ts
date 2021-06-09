import { Movie } from '../models/movie.model';
import { Pokemon } from '../models/pokemon.model';

export function getPokemon(): Pokemon[] {
  return [
    {
      id: 1,
      name: 'Bulbasaur',
      height: '0.7 m (2′04″)',
      weight: '6.9 kg (15.2 lbs)',
      evolve: 'Ivysaur',
      type: ['GRASS', 'POISON'],
      image: 'https://img.pokemondb.net/artwork/bulbasaur.jpg',
    },
    {
      id: 2,
      name: 'Ivysaur',
      height: '1.0 m (3′03″)',
      weight: '13.0 kg (28.7 lbs)',
      evolve: 'Venusaur',
      type: ['GRASS', 'POISON'],
      image: 'https://img.pokemondb.net/artwork/ivysaur.jpg',
    },
    {
      id: 3,
      name: 'Venusaur',
      height: '2.0 m (6′07″)',
      weight: '100.0 kg (220.5 lbs)',
      evolve: 'n/a',
      type: ['GRASS', 'POISON'],
      image: 'https://img.pokemondb.net/artwork/venusaur.jpg',
    },
    {
      id: 25,
      name: 'Pikachu',
      height: '0.4 m (1′04″)',
      weight: '6.0 kg (13.2 lbs)',
      evolve: 'Raichu',
      type: ['ELECTRIC'],
      image: 'https://img.pokemondb.net/artwork/pikachu.jpg',
    },
    {
      id: 700,
      name: 'Sylveon',
      height: '1.0 m (3′03″)',
      weight: '23.5 kg (51.8 lbs)',
      evolve: 'n/a',
      type: ['FAIRY'],
      image: 'https://img.pokemondb.net/artwork/sylveon.jpg',
    },
  ];
}

export function getMovies(): Movie[] {
  return [
    {
      name: 'Edge of Tomorrow',
      imageUrl:
        'https://m.media-amazon.com/images/M/MV5BMTc5OTk4MTM3M15BMl5BanBnXkFtZTgwODcxNjg3MDE@._V1_.jpg',
      url: 'edge-of-tomorrow',
      videoTrailerUrl: 'https://www.youtube.com/embed/vw61gCe2oqI',
    },
    {
      name: 'Shazam',
      imageUrl:
        'https://resizing.flixster.com/qoCuDSD-QV4GRUaojaLk758-KG0=/ems.ZW1zLXByZC1hc3NldHMvbW92aWVzLzUxMDhmN2IxLTE0OWYtNDIwYy05ZjVlLTk1MWUwNzJhYjEwMi53ZWJw',
      url: 'shazam',
      videoTrailerUrl: 'https://www.youtube.com/embed/go6GEIrcvFY',
    },
    {
      name: 'PK',
      imageUrl:
        'https://m.media-amazon.com/images/M/MV5BMTYzOTE2NjkxN15BMl5BanBnXkFtZTgwMDgzMTg0MzE@._V1_.jpg',
      url: 'pk',
      videoTrailerUrl: 'https://www.youtube.com/embed/SOXWc32k4zA',
    },
    {
      name: '3 Idiots',
      imageUrl:
        'https://m.media-amazon.com/images/M/MV5BNTkyOGVjMGEtNmQzZi00NzFlLTlhOWQtODYyMDc2ZGJmYzFhXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg',
      url: '3-idiots',
      videoTrailerUrl: 'https://www.youtube.com/embed/K0eDlFX9GMc',
    },
    {
      name: 'Ip Man',
      imageUrl: 'https://flxt.tmsimg.com/assets/p3586588_p_v10_ac.jpg',
      url: 'ip-man',
      videoTrailerUrl: 'https://www.youtube.com/embed/RBYbqO_FUA4',
    },
    {
      name: 'Ip Man 2',
      imageUrl:
        'https://i.pinimg.com/originals/0b/e6/9f/0be69f021d877d6904933f4f2325ac1d.gif',
      url: 'ip-man-2',
      videoTrailerUrl: 'https://www.youtube.com/embed/gaBdgu00otE',
    },
    {
      name: 'Ip Man 3',
      imageUrl:
        'https://www.joblo.com/assets/images/oldsite/posters/images/full/ip-man-3-poster-exl.jpg',
      url: 'ip-man-3',
      videoTrailerUrl: 'https://www.youtube.com/embed/yo7z8c87Egg',
    },
    {
      name: 'Ip Man 4',
      imageUrl:
        'https://m.media-amazon.com/images/M/MV5BNzYyZWIwZjQtZGVjZi00NWIxLTk0ODMtNzA3YzE5MWM3OWI0XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg',
      url: 'ip-man-4',
      videoTrailerUrl: 'https://www.youtube.com/embed/oCBGTCNJW2g',
    },
    {
      name: 'Dragon Quest: Your Story',
      imageUrl:
        'https://m.media-amazon.com/images/M/MV5BM2Q5YTI0NTQtOGFlOC00MTEzLTg2NDYtM2VhNDk1ZTllNTNiXkEyXkFqcGdeQXVyMjU0ODQ5NTA@._V1_.jpg',
      url: 'dragon-quest-your-story',
      videoTrailerUrl: 'https://www.youtube.com/embed/ANB1TBs6RRA',
    },
  ];
}
