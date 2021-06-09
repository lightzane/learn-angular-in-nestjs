import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { LightzaneHttpService } from 'src/app/services/lightzane-http.service';
import { Constants } from 'src/app/shared/constants';
import { InputValidValuesSnackbarComponent } from 'src/app/shared/snackbars/input-valid-values/input-valid-values-snackbar.component';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.css'],
})
export class QueryComponent implements OnInit {
  first: number;
  second: number;
  sequence: number[];

  fibonacciForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: LightzaneHttpService,
    private fb: FormBuilder,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // get the query string from the URL (from Angular router)
    this.route.queryParamMap.subscribe((params) => {
      // check if there are keys in query string
      if (params.keys.length > 0) {
        const x = params.get('x');
        const y = params.get('y');
        const total = params.get('total');

        const validNumberFormat: RegExp = /^[0-9]+$/;

        // restrict only to number format
        if (
          !x.match(validNumberFormat) ||
          !y.match(validNumberFormat) ||
          !total.match(validNumberFormat)
        ) {
          // format doesn't match to a number
          this.snackbar.openFromComponent(InputValidValuesSnackbarComponent, {
            duration: Constants.SNACKBAR_DURATION,
          });
          // reroute to not found
          this.router.navigate(['/query/fibonacci/invalid-number']); // this could be anything - be creative
        } else {
          // number matched !
          const xNum = parseFloat(x);
          const yNum = parseFloat(y);
          const totalNum = parseFloat(total);

          // call this method if all data are set correctly
          this.getFibonacciSequence(xNum, yNum, totalNum);
        }
      }

      // init the form with default values if params are not available
      this.fibonacciForm = this.fb.group({
        firstNumber: [params.get('x') || 1],
        secondNumber: [params.get('y') || 1],
        total: [params.get('total') || 10],
      });
      // mark as touch to immediately show errors when user types-in an invalid value
      this.fibonacciForm.markAllAsTouched();
    });
  }

  /**
   * Contact the service to send a request to server and get fibonacci sequence
   * @param x the first number
   * @param y the second number
   * @param total output to display
   */
  getFibonacciSequence(x: number, y: number, total: number): void {
    this.service.getFibonacciSequence(x, y, total).subscribe(
      (res) => {
        if (res) {
          this.first = res.first;
          this.second = res.second;
          this.sequence = res.sequence;
        }
      },
      (error: any) => {
        alert(JSON.stringify(error, null, 4));
        // error             = object thrown by the client
        // error.error       = object thrown by the server
        // error.error.error = error name
      }
    );
  }

  /**
   * Generate text/html for viewing of query string
   * @param b - true if html, false if plain text
   * @returns text or html
   */
  getQueryStringAsHtml(b: boolean): string {
    let x = this.fibonacciForm.get('firstNumber').value;
    let y = this.fibonacciForm.get('secondNumber').value;
    let total = this.fibonacciForm.get('total').value;

    if (b)
      return `/query/fibonacci?x=<mark>${x}</mark>&y=<mark>${y}</mark>&total=<mark>${total}</mark>`;
    else return `/query/fibonacci?x=${x}&y=${y}&total=${total}`;
  }

  /**
   * Returns text as the list without the brackets
   * `1, 1, 2, 3, ... n`
   * @returns sequence in txt format
   */
  getSequenceInString(): string {
    return this.sequence
      .toString()
      .replace('[', '')
      .replace(']', '')
      .replace(/,/g, ', ')
      .trim();
  }

  /**
   * Redirects the user to the /query/fibonacci?x=2&y=5......
   */
  submitRequest() {
    let x = this.fibonacciForm.get('firstNumber').value;
    let y = this.fibonacciForm.get('secondNumber').value;
    let total = this.fibonacciForm.get('total').value;

    // go to the route
    this.router.navigate(['/query/fibonacci'], {
      // with query string
      queryParams: {
        x,
        y,
        total,
      },
    });
  }
}
