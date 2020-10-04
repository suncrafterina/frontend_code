import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FactoryCommissionEditComponent } from './factory-commission-edit.component';

describe('FactoryCommissionEditComponent', () => {
  let component: FactoryCommissionEditComponent;
  let fixture: ComponentFixture<FactoryCommissionEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FactoryCommissionEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FactoryCommissionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
