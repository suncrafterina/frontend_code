import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationLogComponent } from './quotation-log.component';

describe('QuotationLogComponent', () => {
  let component: QuotationLogComponent;
  let fixture: ComponentFixture<QuotationLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotationLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
