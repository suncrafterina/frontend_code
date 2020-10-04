import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerCreateComponent } from './banner-create.component';

describe('BannerCreateComponent', () => {
  let component: BannerCreateComponent;
  let fixture: ComponentFixture<BannerCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
