import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropLabelComponent } from './drop-label.component';

describe('DropLabelComponent', () => {
  let component: DropLabelComponent;
  let fixture: ComponentFixture<DropLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropLabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
