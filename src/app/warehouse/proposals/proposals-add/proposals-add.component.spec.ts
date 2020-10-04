import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalsAddComponent } from './proposals-add.component';

describe('ProposalsAddComponent', () => {
  let component: ProposalsAddComponent;
  let fixture: ComponentFixture<ProposalsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProposalsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposalsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
