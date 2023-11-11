import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterPublicComponent } from './footer-public.component';

describe('FooterPublicComponent', () => {
  let component: FooterPublicComponent;
  let fixture: ComponentFixture<FooterPublicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FooterPublicComponent]
    });
    fixture = TestBed.createComponent(FooterPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
