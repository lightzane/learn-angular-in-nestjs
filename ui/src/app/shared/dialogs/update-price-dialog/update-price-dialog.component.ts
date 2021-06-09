import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Item } from '../../models/item.model';

@Component({
  selector: 'app-update-price-dialog',
  templateUrl: './update-price-dialog.component.html',
  styleUrls: ['./update-price-dialog.component.css'],
})
export class UpdatePriceDialogComponent implements OnInit {
  updatePriceForm: FormGroup;

  get updatedPrice(): AbstractControl {
    return this.updatePriceForm.get('updatedPrice');
  }

  constructor(
    public dialogRef: MatDialogRef<UpdatePriceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public item: Item,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.updatePriceForm = this.fb.group({
      updatedPrice: [
        this.item.price,
        Validators.pattern(/^[\d]+(\.\d{1,2})?$/),
      ],
    });

    // to immediately display errors upon typing
    // mark as touched
    // since error will only be displayed after it is touched
    this.updatePriceForm.markAllAsTouched();
  }
}
