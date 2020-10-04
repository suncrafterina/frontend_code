import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalsDetailsComponent } from './proposals-details.component';

describe('ProposalsDetailsComponent', () => {
  let component: ProposalsDetailsComponent;
  let fixture: ComponentFixture<ProposalsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProposalsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposalsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
