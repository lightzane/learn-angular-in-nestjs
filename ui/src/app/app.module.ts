import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BodyComponent } from './pages/body/body.component';
import { ParamComponent } from './pages/param/param.component';
import { QueryComponent } from './pages/query/query.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MaterialModule } from './material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LightzaneSnackbarModule } from './shared/snackbars/lightzane-snackbar.module';
import { LightzaneBottomSheetModule } from './shared/bottom-sheets/lightzane-bottom-sheet.module';
import { LightzaneDialogModule } from './shared/dialogs/lightzane-dialog.module';
import { HttpClientModule } from '@angular/common/http';
import { PokemonComponent } from './pages/param/pokemon/pokemon.component';
import { MoviesComponent } from './pages/param/movies/movies.component';
import { SafePipe } from './shared/pipes/safe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    BodyComponent,
    ParamComponent,
    QueryComponent,
    PageNotFoundComponent,
    PokemonComponent,
    MoviesComponent,
    SafePipe, // custom pipe - used in movies.component.html as "url | safe"
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    LightzaneSnackbarModule,
    LightzaneBottomSheetModule,
    LightzaneDialogModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: LocationStrategy,
      /**
       * changes to `localhost:4200/#/home`
       * which works perfectly fine with NestJs
       * to determine whether that path entered in the browser address...
       * is an Angular Router or a NestJs Controller (REST Api)
       */
      useClass: HashLocationStrategy,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
