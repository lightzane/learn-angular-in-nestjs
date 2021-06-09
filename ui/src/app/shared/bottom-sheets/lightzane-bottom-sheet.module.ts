import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';
import { NameAndQuantityBottomSheetComponent } from './name-and-quantity/name-and-quantity-bottom-sheet.component';

@NgModule({
  declarations: [NameAndQuantityBottomSheetComponent],
  imports: [MaterialModule, ReactiveFormsModule],
})
export class LightzaneBottomSheetModule {}
