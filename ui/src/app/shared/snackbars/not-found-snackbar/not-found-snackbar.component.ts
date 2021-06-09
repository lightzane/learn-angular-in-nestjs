import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-not-found-snackbar',
  template: `
    <div style="display:flex; align-items: center;">
      <mat-icon color="accent">error_outline</mat-icon>
      <span style="margin-left: 15px;">{{ data }}</span>
    </div>
  `,
  styles: [],
})
export class NotFoundSnackbarComponent implements OnInit {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {}

  ngOnInit(): void {}
}
