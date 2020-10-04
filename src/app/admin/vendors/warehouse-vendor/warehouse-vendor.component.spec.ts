import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseVendorComponent } from './warehouse-vendor.component';

describe('WarehouseVendorComponent', () => {
  let component: WarehouseVendorComponent;
  let fixture: ComponentFixture<WarehouseVendorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarehouseVendorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
