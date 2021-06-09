import { Component } from '@angular/core';

@Component({
  selector: 'app-input-valid-values',
  template: `
    <div style="display:flex; align-items: center;">
      <mat-icon color="accent">error_outline</mat-icon>
      <span style="margin-left: 15px;">Please input valid values.</span>
    </div>
  `,
  styles: [],
})
export class InputValidValuesSnackbarComponent {}
