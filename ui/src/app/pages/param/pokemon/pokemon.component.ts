import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { LightzaneHttpService } from 'src/app/services/lightzane-http.service';
import { Constants } from 'src/app/shared/constants';
import { NotFoundSnackbarComponent } from 'src/app/shared/snackbars/not-found-snackbar/not-found-snackbar.component';
import { Pokemon } from '../../../../../../rest-api/src/shared/models/pokemon.model';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css'],
})
export class PokemonComponent implements OnInit {
  pokemon: Pokemon[];
  pkmn: Pokemon;

  constructor(
    private service: LightzaneHttpService,
    private route: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // contact service to send request to server (get all)
    this.service.getAllPokemon().subscribe((res) => {
      if (res) {
        this.pokemon = res;
        // there will be intellisense from the param of subscribe
        // in this case 'res'
        // why intellisense available ?
        // getAllPokemon() method has specified a return type
        // Observable<Pokemon[]>
        // in which Movie is an interface
      }
    });

    // there is a param detected ! (/pokemon/:id)
    this.route.paramMap.subscribe((param) => {
      if (param.has('id')) {
        // contact the service to send the request to server (get specific)
        this.service.getPokemon(param.get('id')).subscribe(
          (pkmn) => {
            if (pkmn) this.pkmn = pkmn;
          },

          // catch errors thrown by the server
          (error) => {
            if (error) {
              // display info to user that there is an error
              this.snackbar.openFromComponent(NotFoundSnackbarComponent, {
                data: error.error.message,
                duration: Constants.SNACKBAR_DURATION,
              });
              // this can be anything - be creative
              this.router.navigate(['/param/pokemon/id/notfound']);
            }
          }
        );
      }
    });
  }
}
