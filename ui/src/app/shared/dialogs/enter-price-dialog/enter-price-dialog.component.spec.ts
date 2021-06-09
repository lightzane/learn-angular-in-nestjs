import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterPriceDialogComponent } from './enter-price-dialog.component';

describe('EnterPriceDialogComponent', () => {
  let component: EnterPriceDialogComponent;
  let fixture: ComponentFixture<EnterPriceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnterPriceDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterPriceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
