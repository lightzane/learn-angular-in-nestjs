import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-successful-add',
  template: `
    <div style="display:flex; align-items: center;">
      <mat-icon style="color: #55efc4">check_circle</mat-icon>
      <span style="margin-left: 15px;">Added in the list successfully!</span>
    </div>
  `,
  styles: [],
})
export class SuccessfulAddComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
