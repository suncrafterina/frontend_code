import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FactoryCommissionComponent } from './factory-commission.component';

describe('FactoryCommissionComponent', () => {
  let component: FactoryCommissionComponent;
  let fixture: ComponentFixture<FactoryCommissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FactoryCommissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FactoryCommissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
