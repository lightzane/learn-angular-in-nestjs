import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NameAndQuantityBottomSheetComponent } from './name-and-quantity-bottom-sheet.component';

describe('QuantityPriceComponent', () => {
  let component: NameAndQuantityBottomSheetComponent;
  let fixture: ComponentFixture<NameAndQuantityBottomSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NameAndQuantityBottomSheetComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NameAndQuantityBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
