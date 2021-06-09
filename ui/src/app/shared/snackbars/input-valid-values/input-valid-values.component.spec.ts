import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputValidValuesSnackbarComponent } from './input-valid-values-snackbar.component';

describe('InputValidValuesComponent', () => {
  let component: InputValidValuesSnackbarComponent;
  let fixture: ComponentFixture<InputValidValuesSnackbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputValidValuesSnackbarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputValidValuesSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
