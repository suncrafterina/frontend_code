import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OthersCommissionComponent } from './others-commission.component';

describe('OthersCommissionComponent', () => {
  let component: OthersCommissionComponent;
  let fixture: ComponentFixture<OthersCommissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OthersCommissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OthersCommissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
