import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicAttributesComponent } from './dynamic-attributes.component';

describe('DynamicAttributesComponent', () => {
  let component: DynamicAttributesComponent;
  let fixture: ComponentFixture<DynamicAttributesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicAttributesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
