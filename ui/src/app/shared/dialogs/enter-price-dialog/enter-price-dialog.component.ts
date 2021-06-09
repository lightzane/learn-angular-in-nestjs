import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Item } from '../../models/item.model';

@Component({
  selector: 'app-enter-price-dialog',
  templateUrl: './enter-price-dialog.component.html',
  styleUrls: ['./enter-price-dialog.component.css'],
})
export class EnterPriceDialogComponent implements OnInit {
  quantityPriceForm: FormGroup;

  get quantity(): AbstractControl {
    return this.quantityPriceForm.get('quantity');
  }

  get price(): AbstractControl {
    return this.quantityPriceForm.get('price');
  }

  get quantityAndPrice(): any {
    return {
      quantity: parseFloat(this.quantity.value),
      price: parseFloat(this.price.value),
    };
  }

  constructor(
    public dialogRef: MatDialogRef<EnterPriceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public item: Item,
    private fb: FormBuilder
  ) {
    this.quantityPriceForm = this.fb.group({
      quantity: [this.item.quantity, [Validators.pattern(/^[0-9]+$/)]],
      price: [this.item.price, [Validators.pattern(/^[\d]+(\.\d{1,2})?$/)]],
    });

    // do this since technically
    // angular already touched it
    // so when the user updates the field
    // the errors will immediately display
    this.quantity.markAsTouched();
    this.price.markAsTouched();
  }

  ngOnInit(): void {}

  confirmPrice(): void {
    // if you are looking how the data is thrown back to the
    // dialog opener
    // (see enter-price-dialog.component.html)
    // --> [mat-dialog-close]

    // update the "selectedItems[]" array
    this.item.quantity = parseInt(this.quantity.value);
    this.item.price = parseFloat(this.price.value);
  }

  onMaybeClick(): void {
    this.dialogRef.close();
  }
}
