import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FactoryDetailsComponent } from './factory-details.component';

describe('FactoryDetailsComponent', () => {
  let component: FactoryDetailsComponent;
  let fixture: ComponentFixture<FactoryDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FactoryDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FactoryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
