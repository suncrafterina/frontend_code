import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarningInfoBlockComponent } from './warning-info-block.component';

describe('WarningInfoBlockComponent', () => {
  let component: WarningInfoBlockComponent;
  let fixture: ComponentFixture<WarningInfoBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarningInfoBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarningInfoBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
