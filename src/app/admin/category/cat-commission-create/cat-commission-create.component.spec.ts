import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatCommissionCreateComponent } from './cat-commission-create.component';

describe('CatCommissionCreateComponent', () => {
  let component: CatCommissionCreateComponent;
  let fixture: ComponentFixture<CatCommissionCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatCommissionCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatCommissionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
