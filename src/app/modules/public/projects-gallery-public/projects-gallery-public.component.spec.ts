import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsGalleryPublicComponent } from './projects-gallery-public.component';

describe('ProjectsGalleryPublicComponent', () => {
  let component: ProjectsGalleryPublicComponent;
  let fixture: ComponentFixture<ProjectsGalleryPublicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectsGalleryPublicComponent]
    });
    fixture = TestBed.createComponent(ProjectsGalleryPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
