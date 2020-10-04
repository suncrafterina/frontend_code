import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiEmailFieldComponent } from './multi-email-field.component';

describe('MultiEmailFieldComponent', () => {
  let component: MultiEmailFieldComponent;
  let fixture: ComponentFixture<MultiEmailFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiEmailFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiEmailFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
