import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogPostReadComponent } from './blog-post-read.component';

describe('BlogPostReadComponent', () => {
  let component: BlogPostReadComponent;
  let fixture: ComponentFixture<BlogPostReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogPostReadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogPostReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
