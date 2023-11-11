import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlliesPublicComponent } from './allies-public.component';

describe('AlliesPublicComponent', () => {
  let component: AlliesPublicComponent;
  let fixture: ComponentFixture<AlliesPublicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlliesPublicComponent]
    });
    fixture = TestBed.createComponent(AlliesPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
