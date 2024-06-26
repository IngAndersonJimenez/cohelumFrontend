import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingSectionComponent } from './setting-section.component';

describe('SettingSectionComponent', () => {
  let component: SettingSectionComponent;
  let fixture: ComponentFixture<SettingSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SettingSectionComponent]
    });
    fixture = TestBed.createComponent(SettingSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
