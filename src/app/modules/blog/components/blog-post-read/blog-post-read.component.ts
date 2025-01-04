import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BlogsService } from '../../../../services/blogs/blogs.service';
import { ActivatedRoute, RouterEvent } from '@angular/router';
import { blogPathParamNames } from '../../blog.model';
import { BlogPost, GetBlogPostRequest } from '../blog-post-edit/blog-post-edit.model';
import { defaultEditBlogPost } from '../blog-post-edit/blog-post-edit.config';
import { defaultBlogPost } from './blog-post-read.config';
import { RouterExtendedService } from '../../../../services/router-extended/router-extended.service';

@Component({
  selector: 'app-blog-post-read',
  templateUrl: './blog-post-read.component.html',
  styleUrl: './blog-post-read.component.scss',
})
export class BlogPostReadComponent implements OnInit {

  subscriptions: Subscription[] = [];
  getBlogPostRequest: GetBlogPostRequest = {
    path: '',
    language: '',
  };
  blogPost: BlogPost = defaultBlogPost;

  constructor(
    private readonly blogsService: BlogsService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: RouterExtendedService,
  ) { }

  async ngOnInit(): Promise<void> {
    this.applyPathParams();
    await this.getBlogPost();
  }

  ngOnDestroy(): void {
    while(this.subscriptions.length > 0)   {
      this.subscriptions.pop()!.unsubscribe();
    }
  }

  applyPathParams(): void {
    this.subscriptions.push(
      this.activatedRoute.paramMap.subscribe(params => {
        this.getBlogPostRequest = {
          path: params.get(blogPathParamNames.path) ?? defaultBlogPost.path,
          language: params.get(blogPathParamNames.language) ?? defaultBlogPost.language,
        };
      })
    );
  }
  
  /**
   * Make sure this method is called
   * after {@link applyPathParams} call!
   */
  async getBlogPost(): Promise<void> {
    try {
      this.blogPost = await this.blogsService.getSingle(this.getBlogPostRequest);
    } catch (e) {
    }
  }

  backToBlogPosts(): void {
    this.router.navigate(['/blog/posts']);
  }

}
