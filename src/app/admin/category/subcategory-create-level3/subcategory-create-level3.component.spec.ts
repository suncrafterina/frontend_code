import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcategoryCreateLevel3Component } from './subcategory-create-level3.component';

describe('SubcategoryCreateLevel3Component', () => {
  let component: SubcategoryCreateLevel3Component;
  let fixture: ComponentFixture<SubcategoryCreateLevel3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubcategoryCreateLevel3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcategoryCreateLevel3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
