import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtendedWarrantyComponent } from './extended-warranty.component';

describe('ExtendedWarrantyComponent', () => {
  let component: ExtendedWarrantyComponent;
  let fixture: ComponentFixture<ExtendedWarrantyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExtendedWarrantyComponent]
    });
    fixture = TestBed.createComponent(ExtendedWarrantyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
