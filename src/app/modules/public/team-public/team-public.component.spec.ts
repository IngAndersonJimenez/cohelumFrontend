import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamPublicComponent } from './team-public.component';

describe('TeamPublicComponent', () => {
  let component: TeamPublicComponent;
  let fixture: ComponentFixture<TeamPublicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeamPublicComponent]
    });
    fixture = TestBed.createComponent(TeamPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
