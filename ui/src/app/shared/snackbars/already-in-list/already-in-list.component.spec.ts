import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlreadyInListComponent } from './already-in-list.component';

describe('AlreadyInListComponent', () => {
  let component: AlreadyInListComponent;
  let fixture: ComponentFixture<AlreadyInListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlreadyInListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlreadyInListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
