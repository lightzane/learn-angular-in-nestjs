import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-already-in-list',
  template: `
    <div style="display:flex; align-items: center;">
      <mat-icon color="accent">error_outline</mat-icon>
      <span style="margin-left: 15px;">Already in the list!</span>
    </div>
  `,
  styles: [],
})
export class AlreadyInListComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
