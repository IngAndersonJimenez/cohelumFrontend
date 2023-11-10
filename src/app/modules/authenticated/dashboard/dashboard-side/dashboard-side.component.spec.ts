import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSideComponent } from './dashboard-side.component';

describe('DashboardSideComponent', () => {
  let component: DashboardSideComponent;
  let fixture: ComponentFixture<DashboardSideComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardSideComponent]
    });
    fixture = TestBed.createComponent(DashboardSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
