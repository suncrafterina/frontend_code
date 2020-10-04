import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatCommissionListComponent } from './cat-commission-list.component';

describe('CatCommissionListComponent', () => {
  let component: CatCommissionListComponent;
  let fixture: ComponentFixture<CatCommissionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatCommissionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatCommissionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
