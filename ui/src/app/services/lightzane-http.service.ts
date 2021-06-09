import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fibonacci } from '../../../../rest-api/src/shared/models/fibonacci.model';
import { Pokemon } from '../../../../rest-api/src/shared/models/pokemon.model';
import { Movie } from '../../../../rest-api/src/shared/models/movie.model';

@Injectable({
  providedIn: 'root',
})
export class LightzaneHttpService {
  constructor(private readonly http: HttpClient) {}

  testServer(): Observable<any> {
    return this.http.get('/api');
  }

  /**
   * Sends item array from body.component.ts to the server
   * @param data item array and other details
   * @returns
   */
  submitPOST(data: any): Observable<any> {
    return this.http.post('/api/body', data);
  }

  /**
   * Sends a GET request to the server
   * @param x the first number
   * @param y the second number
   * @param total total output to be displayed
   * @returns array of fibonacci sequence
   */
  getFibonacciSequence(
    x: number,
    y: number,
    total: number
  ): Observable<Fibonacci> {
    // create a query string to send
    let params = new HttpParams().set('x', x).set('y', y).set('total', total);
    // this will be
    // x=2&y=5&total=10
    // console.log(params.keys()); // returns ['x','y','total']

    return this.http.get<Fibonacci>('/api/query/fibonacci', {
      params,
    });
  }

  getAllPokemon(): Observable<Pokemon[]> {
    // defining the types will add intellisense to "yourParamName" in
    // this.service.getPokemon().subscribe((yourParamName) => { })
    return this.http.get<Pokemon[]>('/api/param/pokemon');
  }

  getPokemon(id: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(`/api/param/pokemon/${id}`);
  }

  getAllMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>('/api/param/movies');
  }

  getMovie(name: string): Observable<Movie> {
    return this.http.get<Movie>(`/api/param/movies/${name}`);
  }
}
