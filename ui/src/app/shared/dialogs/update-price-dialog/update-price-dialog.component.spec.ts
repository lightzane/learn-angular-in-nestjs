import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePriceDialogComponent } from './update-price-dialog.component';

describe('UpdatePriceDialogComponent', () => {
  let component: UpdatePriceDialogComponent;
  let fixture: ComponentFixture<UpdatePriceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePriceDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePriceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
