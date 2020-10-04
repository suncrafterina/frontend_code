import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnquiryDetailComponent } from './enquiry-detail.component';

describe('EnquiryDetailComponent', () => {
  let component: EnquiryDetailComponent;
  let fixture: ComponentFixture<EnquiryDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnquiryDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnquiryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
