import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtendedWarrantyCComponent } from './extended-warranty-c.component';

describe('ExtendedWarrantyCComponent', () => {
  let component: ExtendedWarrantyCComponent;
  let fixture: ComponentFixture<ExtendedWarrantyCComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExtendedWarrantyCComponent]
    });
    fixture = TestBed.createComponent(ExtendedWarrantyCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
