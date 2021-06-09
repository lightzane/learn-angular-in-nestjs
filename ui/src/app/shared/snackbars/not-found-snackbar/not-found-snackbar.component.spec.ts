import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotFoundSnackbarComponent } from './not-found-snackbar.component';

describe('NotFoundSnackbarComponent', () => {
  let component: NotFoundSnackbarComponent;
  let fixture: ComponentFixture<NotFoundSnackbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotFoundSnackbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotFoundSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
