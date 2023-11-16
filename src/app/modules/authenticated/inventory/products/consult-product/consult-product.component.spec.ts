import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultProductComponent } from './consult-product.component';

describe('ConsultProductComponent', () => {
  let component: ConsultProductComponent;
  let fixture: ComponentFixture<ConsultProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultProductComponent]
    });
    fixture = TestBed.createComponent(ConsultProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
