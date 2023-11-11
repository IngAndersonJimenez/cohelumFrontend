import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPublicComponent } from './product-public.component';

describe('ProductPublicComponent', () => {
  let component: ProductPublicComponent;
  let fixture: ComponentFixture<ProductPublicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductPublicComponent]
    });
    fixture = TestBed.createComponent(ProductPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
