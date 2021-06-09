import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { map, startWith, shareReplay } from 'rxjs/operators';
import { NameAndQuantityBottomSheetComponent } from 'src/app/shared/bottom-sheets/name-and-quantity/name-and-quantity-bottom-sheet.component';
import { AlreadyInListComponent } from 'src/app/shared/snackbars/already-in-list/already-in-list.component';
import { SuccessfulAddComponent } from 'src/app/shared/snackbars/successful-add/successful-add.component';
import { Item } from 'src/app/shared/models/item.model';
import { MatDialog } from '@angular/material/dialog';
import { EnterPriceDialogComponent } from 'src/app/shared/dialogs/enter-price-dialog/enter-price-dialog.component';
import { Constants } from 'src/app/shared/constants';
import { UpdatePriceDialogComponent } from 'src/app/shared/dialogs/update-price-dialog/update-price-dialog.component';
import { LightzaneHttpService } from 'src/app/services/lightzane-http.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css'],
})
export class BodyComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  isServerAvailable: boolean = false;
  isRequestSubmitted: boolean = false;
  isResponseReceived: boolean = false;
  isFirstSubmission: boolean = true; // display response UI if sent

  addItemControl = new FormControl();

  @ViewChild(MatAutocompleteTrigger)
  autoCompleteTrigger: MatAutocompleteTrigger;

  // get items in local storage
  recentItems: Item[] = JSON.parse(localStorage.getItem('recentItems')) || [];

  // create variable to be used for filter as the user types
  filteredItems: Observable<Item[]>;

  // store here the selected items
  selectedItems: Item[] =
    JSON.parse(localStorage.getItem('selectedItems')) || [];

  // render Item table in frontend
  dataSource = new MatTableDataSource<Item>();
  columnHeaders = ['price', 'quantity', 'name', 'total', 'misc'];

  constructor(
    private snackbar: MatSnackBar,
    private breakpointObserver: BreakpointObserver,
    private bottomSheet: MatBottomSheet,
    private dialog: MatDialog,
    private service: LightzaneHttpService
  ) {}

  ngOnInit(): void {
    // filter the autocomplete list based on user input and as the value changes
    this.refreshList();
    // init table
    this.refreshTable();
    this.service.testServer().subscribe((res) => {
      if (res) this.isServerAvailable = true;
    });
  }

  /**
   * Refreshes the `filteredItems[]`
   * to be filtered as the value changes
   */
  refreshList() {
    try {
      this.filteredItems = this.addItemControl.valueChanges.pipe(
        startWith(''), // so the filter trigger the autocomplete to popup and see initial list (this happens when the user click on the input)
        map((value) => (typeof value === 'string' ? value : value.name)), // get available value
        map((name) => (name ? this._filter(name) : this.recentItems.slice())) // return the array with filter (defy case-sensitive) and remove unmatched strings
      );
    } catch (err) {}
  }

  /**
   * Refreshes the table with `selectedItems[]` list
   */
  refreshTable() {
    this.dataSource.data = this.selectedItems;
    this.isRequestSubmitted = false;
  }

  _filter(name: string) {
    const filterValue = name.toLowerCase();

    return this.recentItems.filter(
      (item) => item.name.toLowerCase().indexOf(filterValue) === 0
    );
  }
  // handle output in (html) the text field
  // after selecting an item in the autocomplete list
  displayItemName(item: Item): string {
    return item && item.name ? item.name : '';
  }

  detectEnter($event: KeyboardEvent) {
    if ($event.code == 'Enter') {
      this.triggerAdd();
    }
  }

  triggerAdd() {
    // reject blank
    if (this.addItemControl.value == '' || !this.addItemControl.value) {
      this.snackbar.open('Please enter something', 'OK', { duration: 3000 });
      return;
    }

    const val: Item = this.addItemControl.value;

    const item: Item = {
      // determine if new entry (string) or selected from autocomplete
      name: typeof val === 'string' ? val : val.name,
      quantity: val.quantity || 1,
      price: val.price || 0.0,
      total: val.total || 0,
    };

    // IF: item is NOT yet included in the recentItems (applies on filters/autocomplete)
    if (!this.isItemListed(item, this.recentItems)) {
      this.addItem(item, this.recentItems);
    }

    // IF: item is NOT yet included in the selectedItems (applies on table)
    if (!this.isItemListed(item, this.selectedItems)) {
      this.addItem(item, this.selectedItems);

      // update total property
      this.updateTotalCostPerItem();

      // refresh databse for view
      this.refreshTable();

      // enter price
      this.openDialogAndEnterPrice(item);

      // notify
      this.snackbar.openFromComponent(SuccessfulAddComponent, {
        duration: 3000,
      });

      // this.snackbar.open('Item added in list', 'NICE', {
      //   duration: 5000,
      //   horizontalPosition: 'end',
      //   verticalPosition: 'bottom',
      // });
    } else {
      this.snackbar.openFromComponent(AlreadyInListComponent, {
        duration: 3000,
      });
      // this.snackbar.open('Already in list', 'COOL', {
      //   duration: 5000,
      // });
    }
  }

  addItem(item: Item, list: Item[]): void {
    // PUSH > SORT > SAVE
    list.push(item);
    // sort array based on object property which in this case is .name
    // sort() method of Array, which takes a callback function,
    // which can take parameters 2 objects contained in the array (which we call a and b)
    list.sort((a, b) => (a.name > b.name ? 1 : -1));
    // When we return 1,
    // the function communicates to sort() that the object b takes precedence
    // in sorting over the object a. Returning -1 would do the opposite.

    // save item
    this.saveItemToStorage();
  }

  /**
   * Calculate and updates all the total price per item
   * by multiplying the quantity * price
   * then update the `total` property of the item
   * for the list of selected items
   */
  updateTotalCostPerItem(): void {
    this.selectedItems.forEach((value: Item, index, array) => {
      value.total = value.quantity * value.price;
    });
  }

  /**
   * Sums up all the total prices
   * @returns overall price of all items in the list
   */
  calculateOverallPrice(): number {
    return this.selectedItems
      .map((i) => i.total)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0); // n + ... + n + 0
  }

  /**
   * Sums up all the total quantity per item
   * @returns total quantity of all items in the list
   */
  calculateTotalQuantity(): number {
    return this.selectedItems
      .map((i) => i.quantity)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  }

  /**
   * Saves the item data into the browser's
   * localStorage for history purposes.
   * Not a guaranteed to last forever.
   */
  saveItemToStorage(): void {
    // this.recentItems = this.selectedItems;
    localStorage.setItem(ItemStorage.RECENT, JSON.stringify(this.recentItems));
    localStorage.setItem(
      ItemStorage.SELECTED,
      JSON.stringify(this.selectedItems)
    );
  }

  /**
   * Removes items in the recent history
   */
  destroyStorage(): void {
    // localStorage.clear(); // clear all storages!
    localStorage.removeItem(ItemStorage.SELECTED);
    // this.recentItems = [];
    this.selectedItems = [];
    this.refreshList(); // refresh the list that is displayed in (html)
    this.dataSource.data = [];
  }

  /**
   * Calls the following functions:
   * `updateTotalCostPerItem()`
   * `saveItemToStorage()`
   * `refreshTable()`
   */
  refreshData(): void {
    this.updateTotalCostPerItem();
    this.saveItemToStorage();
    this.refreshTable();
  }

  /**
   * Checks whether the item is already in the list
   * @param item the item to look for in the list
   * @param list the list to be searched upon
   * @param onExisting callback with 1 argument to get the index if existing
   * @returns boolean
   */
  private isItemListed(
    item: Item,
    list: Item[],
    onExisting?: (index: number) => void
  ): boolean {
    for (let i = 0; i < list.length; i++) {
      if (list[i].name == item.name) {
        if (onExisting) {
          onExisting(i);
        }
        return true;
      }
    }

    return false;
  }

  /**
   * Opens the bottom sheet
   * when user clicks on a row in the table
   * @param myRowData - will pass the data of that row (Item model)
   */
  openBottomSheet(myRowData: Item, index: number) {
    // store to variable so we can subscribe later
    const bottomSheetRef = this.bottomSheet.open(
      NameAndQuantityBottomSheetComponent,
      {
        // open bottom sheet and pass with data
        data: myRowData,
      }
    );

    // Subscribe to the sheet after it is dismissed
    // to get the Data
    // will return undefined if the bottom sheet is ignored
    // without clicking any controls as declared in the child
    // the controls should also dismissed with data
    // (see quantity.component.ts)
    bottomSheetRef.afterDismissed().subscribe((dataFromChild) => {
      if (dataFromChild) {
        // update recent items for history
        this.isItemListed(myRowData, this.recentItems, (index) => {
          this.recentItems[index].quantity = dataFromChild;
          // dataFromChild = expects to be a quantity
          // thrown by the dialog
          // (see quantity.component.ts)
          this.refreshData();
        });
      }
    });

    // emits when overlay is clicked
    bottomSheetRef.backdropClick().subscribe(() => {
      // update recent items
      this.recentItems[index].quantity = myRowData.quantity;
      // refresh and save
      this.refreshData();
    });
  }

  /**
   * Open dialog and enter price of item
   * specific to what the user had entered in Add Item control
   */
  openDialogAndEnterPrice(item: Item) {
    // open dialog
    const dialogRef = this.dialog.open(EnterPriceDialogComponent, {
      data: item,
    });

    // detects closing of dialog
    // returns the data stored in the [mat-dialog-close]
    // (see enter-price-dialog.component.html)
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.isItemListed(item, this.recentItems, (index) => {
          this.recentItems[index].quantity = result.quantity;
          this.recentItems[index].price = result.price;

          this.refreshData();
        });
      }

      this.autoCompleteTrigger.closePanel();
      this.addItemControl.setValue('');
      this.addItemControl.untouched;
    });
  }

  /**
   * Removes the item (obj) in the list
   * @param i the current index of the item in the array
   */
  removeItemFromList(i: number) {
    this.selectedItems = this.dataSource.data; // mimic the index especially if user clicked on sort headers
    this.selectedItems.splice(i, 1);
    this.refreshData();
    this.snackbar.open('Item removed', 'Thanks', {
      duration: Constants.SNACKBAR_DURATION,
    });
  }

  /**
   * Display dialog upon user click on a price in a cell
   * to update the price
   * @param item the specified item in which the user clicks on the price
   */
  updatePrice(item: Item) {
    const dialogRef = this.dialog.open(UpdatePriceDialogComponent, {
      data: item,
    });

    // detects closing of dialog
    // returns the data stored in the [mat-dialog-close]
    // (see update-price-dialog.component.html)
    dialogRef.afterClosed().subscribe((updatedPrice) => {
      // do something if updatedPrice is NOT undefined
      // it will be undefined if user clicks on cancel
      // ( see update-price-dialog.component.html )
      if (updatedPrice) {
        this.isItemListed(item, this.recentItems, (index) => {
          this.recentItems[index].price = parseFloat(updatedPrice);
        });
        this.isItemListed(item, this.selectedItems, (index) => {
          this.selectedItems[index].price = parseFloat(updatedPrice);
        });
        this.refreshData();
      }
    });
  }

  /**
   * Downloads a txt file
   * when user clicks on button.
   * (Client-side only)
   */
  downloadTxt() {
    // Determine the data
    const data = document.getElementById('data_raw').innerText;

    // Create element <a> tag
    const download = document.createElement('a');
    download.style.display = 'none';
    // Set filename when downloading
    download.setAttribute('download', 'groceries.txt');
    // Set content
    download.setAttribute(
      'href',
      'data:text/plain;charset=utf-8,' + encodeURIComponent(data)
    );
    // Append the element to the body
    document.body.appendChild(download);
    // Simulate click
    download.click();
    // Remove the element
    document.body.removeChild(download);
  }

  /**
   * Downloads a csv file
   * when user clicks on button.
   * (Client-side only)
   */
  downloadCsv() {
    // Determine the data
    // declare overall price
    let data = `Overall Price,${this.calculateOverallPrice()}\n`;

    // declare total items
    data += `Total Items,${this.calculateTotalQuantity()}\n`;

    // add blank row
    data += '\n';

    // set column headers
    data += `#,Price,Quantity,Name,Total\n`;

    this.selectedItems.forEach((value: Item, index: number, array: Item[]) => {
      const p = value.price;
      const q = value.quantity;
      const n = value.name;
      const t = value.total;

      data += `${index + 1},${p},${q},${n},${t}\n`;
    });

    // Create element <a> tag
    const download = document.createElement('a');
    download.style.display = 'none';
    // Set filename when downloading
    download.setAttribute('download', 'groceries.csv');
    // Set content
    download.setAttribute(
      'href',
      'data:text/plain;charset=utf-8,' + encodeURIComponent(data)
    );
    // Append the element to the body
    document.body.appendChild(download);
    // Simulate click
    download.click();
    // Remove the element
    document.body.removeChild(download);
  }

  // Create variables to store the response
  resTimestamp: string = '';
  resDateReceived: string = '';
  resTimeReceived: string = '';
  resTotalItems: number = 0;
  resOverallPrice: number = 0;
  resItems: any = {};
  /**
   * Submits the request
   * using HTTP service to the server
   */
  submitRequest(): void {
    this.isResponseReceived = false;
    this.isRequestSubmitted = true;
    this.isFirstSubmission = false;

    const data = {
      items: this.selectedItems,
      totalItems: this.calculateTotalQuantity(),
      overallPrice: this.calculateOverallPrice(),
    };

    this.service.submitPOST(data).subscribe((response: any) => {
      // see rest-api/src/body/body.service.ts
      if (response.lightzane) {
        const res = response.lightzane;
        this.resTimestamp = res.timestamp;
        this.resDateReceived = res.dateReceived;
        this.resTimeReceived = res.timeReceived;
        this.resTotalItems = res.totalItems.toString();
        this.resOverallPrice = res.overallPrice.toString();
        this.resItems = res.items;
        this.isResponseReceived = true;
      }
    });
  }
}

enum ItemStorage {
  RECENT = 'recentItems',
  SELECTED = 'selectedItems',
}
