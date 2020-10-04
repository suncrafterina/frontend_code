import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcategoryListLevel3Component } from './subcategory-list-level3.component';

describe('SubcategoryListLevel3Component', () => {
  let component: SubcategoryListLevel3Component;
  let fixture: ComponentFixture<SubcategoryListLevel3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubcategoryListLevel3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcategoryListLevel3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
