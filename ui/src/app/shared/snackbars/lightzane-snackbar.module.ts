import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/material/material.module';
import { AlreadyInListComponent } from './already-in-list/already-in-list.component';
import { SuccessfulAddComponent } from './successful-add/successful-add.component';
import { InputValidValuesSnackbarComponent } from './input-valid-values/input-valid-values-snackbar.component';
import { NotFoundSnackbarComponent } from './not-found-snackbar/not-found-snackbar.component';

@NgModule({
  declarations: [
    AlreadyInListComponent,
    SuccessfulAddComponent,
    InputValidValuesSnackbarComponent,
    NotFoundSnackbarComponent,
  ],
  imports: [MaterialModule],
})
export class LightzaneSnackbarModule {}
