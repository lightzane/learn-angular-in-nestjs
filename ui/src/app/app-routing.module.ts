import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BodyComponent } from './pages/body/body.component';
import { MoviesComponent } from './pages/param/movies/movies.component';
import { ParamComponent } from './pages/param/param.component';
import { PokemonComponent } from './pages/param/pokemon/pokemon.component';
import { QueryComponent } from './pages/query/query.component';

const routes: Routes = [
  {
    path: 'body',
    component: BodyComponent,
  },
  {
    path: 'param',
    component: ParamComponent,
    children: [
      { path: 'pokemon', component: PokemonComponent },
      { path: 'pokemon/:id', component: PokemonComponent },
      { path: 'movies', component: MoviesComponent },
      { path: 'movies/:name', component: MoviesComponent },
    ],
  },
  {
    path: 'query',
    component: QueryComponent,
  },
  {
    path: 'query/fibonacci',
    component: QueryComponent,
  },
  { path: '', redirectTo: '/body', pathMatch: 'full' }, // default page
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
