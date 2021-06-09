import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { EnterPriceDialogComponent } from './enter-price-dialog/enter-price-dialog.component';
import { UpdatePriceDialogComponent } from './update-price-dialog/update-price-dialog.component';

@NgModule({
  declarations: [EnterPriceDialogComponent, UpdatePriceDialogComponent],
  imports: [MaterialModule, ReactiveFormsModule],
})
export class LightzaneDialogModule {}
