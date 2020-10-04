import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributeCreateComponent } from './attribute-create.component';

describe('AttributeCreateComponent', () => {
  let component: AttributeCreateComponent;
  let fixture: ComponentFixture<AttributeCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttributeCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttributeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
