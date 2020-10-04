import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarCommissionMatDialogComponent } from './war-commission-mat-dialog.component';

describe('WarCommissionMatDialogComponent', () => {
  let component: WarCommissionMatDialogComponent;
  let fixture: ComponentFixture<WarCommissionMatDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarCommissionMatDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarCommissionMatDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
