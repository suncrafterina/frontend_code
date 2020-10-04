import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOptionCreateComponent } from './add-option-create.component';

describe('AddOptionCreateComponent', () => {
  let component: AddOptionCreateComponent;
  let fixture: ComponentFixture<AddOptionCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOptionCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOptionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
