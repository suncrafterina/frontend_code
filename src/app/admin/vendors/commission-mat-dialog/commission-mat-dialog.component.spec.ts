import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommissionMatDialogComponent } from './commission-mat-dialog.component';

describe('CommissionMatDialogComponent', () => {
  let component: CommissionMatDialogComponent;
  let fixture: ComponentFixture<CommissionMatDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommissionMatDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommissionMatDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
