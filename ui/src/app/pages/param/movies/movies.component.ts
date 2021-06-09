import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LightzaneHttpService } from 'src/app/services/lightzane-http.service';
import { Constants } from 'src/app/shared/constants';
import { NotFoundSnackbarComponent } from 'src/app/shared/snackbars/not-found-snackbar/not-found-snackbar.component';
import { Movie } from '../../../../../../rest-api/src/shared/models/movie.model';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  movies: Movie[];
  movie: Movie;

  constructor(
    private service: LightzaneHttpService,
    private route: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    // contact the service to request for movies
    this.service.getAllMovies().subscribe((movies) => {
      if (movies.length > 0) {
        this.movies = movies;
      }
    });
    // param (/movies/:name) is detected
    this.route.paramMap.subscribe((params) => {
      if (params.has('name')) {
        // contact service to request for a specific movie
        this.service.getMovie(params.get('name')).subscribe(
          (res) => {
            if (res) {
              this.movie = res;
              // there will be intellisense from the param of subscribe
              // in this case 'res'
              // why intellisense available ?
              // getMovie() method has specified a return type
              // Observable<Movie>
              // in which Movie is an interface
            }
          },

          // catch errors thrown by the server
          (error) => {
            // movie not on list!
            this.snackbar.openFromComponent(NotFoundSnackbarComponent, {
              data: error.error.message,
              duration: Constants.SNACKBAR_DURATION,
            });
            this.router.navigate(['/param/movies/xxxxxx/notfound']);
          }
        );
      }
    });
  }
}
