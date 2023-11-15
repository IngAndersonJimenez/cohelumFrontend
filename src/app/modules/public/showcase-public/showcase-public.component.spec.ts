import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowcasePublicComponent } from './showcase-public.component';

describe('ShowcasePublicComponent', () => {
  let component: ShowcasePublicComponent;
  let fixture: ComponentFixture<ShowcasePublicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowcasePublicComponent]
    });
    fixture = TestBed.createComponent(ShowcasePublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
