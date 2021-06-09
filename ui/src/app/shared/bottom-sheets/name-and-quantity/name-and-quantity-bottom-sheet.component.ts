import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA,
} from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Item } from 'src/app/shared/models/item.model';
import { Constants } from '../../constants';

@Component({
  selector: 'app-quantity-price',
  templateUrl: './name-and-quantity-bottom-sheet.component.html',
  styleUrls: ['./name-and-quantity-bottom-sheet.component.css'],
})
export class NameAndQuantityBottomSheetComponent implements OnInit {
  inputItemname = new FormControl(this.item.name, [Validators.required]);

  txtQuantity = new FormControl(this.item.quantity, [
    Validators.required,
    Validators.pattern(/^[0-9]+$/),
  ]);

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public item: Item,
    private bottomSheetRef: MatBottomSheetRef<NameAndQuantityBottomSheetComponent>,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.txtQuantity.markAsTouched();
  }

  /**
   * Closes the bottom sheet
   * and confirms update
   * then send back the data to parent
   */
  // updateQuantity(): void {
  //   this.bottomSheetRef.dismiss(this.item);
  // }

  /**
   * Decrement quantity as per user click on (-)
   */
  minusQuantity(): void {
    if (this.item.quantity > 0) {
      this.item.quantity--;
      this.txtQuantity.setValue(this.item.quantity);
    }
  }

  /**
   * Increment quantity as per user click on (+)
   */
  addQuantity(): void {
    this.item.quantity++;
    this.txtQuantity.setValue(this.item.quantity);
  }

  /**
   * Listens to [ENTER] key to confirm quantity
   * @param $event keyboard event
   */
  detectEnter($event: KeyboardEvent) {
    if ($event.code == 'Enter') {
      if (this.txtQuantity.invalid) {
        this.snackbar.open('Value not acceptable', 'Sorry', {
          duration: Constants.SNACKBAR_DURATION,
        });
        return;
      }

      let qty = parseInt(this.txtQuantity.value);

      this.item.quantity = qty;
      // throw the data back to the opener of dialog
      this.bottomSheetRef.dismiss(qty);
      // .dismiss(result?)
      // still pass the result so we can still manipulate the data
      // (see body.component.ts) openBottomSheet()
      // to see how we subscribe to the dismiss and get the data
    }
  }

  /**
   * Update the item name on enter key
   * @param $event - keyboard event
   */
  updateItemname($event: KeyboardEvent) {
    if ($event.code == 'Enter') {
      // trim whitespaces in beginning, ending and middle
      let val: string = this.inputItemname.value;
      val = val.trim().replace(/\s{2,}/g, ' ');

      if (this.inputItemname.valid) {
        this.item.name = val;
        this.inputItemname.setValue(val);
        this.inputItemname.markAsUntouched();
        this.inputItemname.markAsPristine();
        document.getElementById('inputItemname').blur();

        this.snackbar.open('Item name updated', 'Alright!', {
          duration: Constants.SNACKBAR_DURATION,
          verticalPosition: 'top',
        });
      }
    }
  }
}
