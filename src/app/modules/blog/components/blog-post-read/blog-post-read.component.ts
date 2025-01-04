import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { confirm } from 'devextreme/ui/dialog';

import { Subscription } from 'rxjs';

import { BlogsService } from '../../../../services/blogs/blogs.service';
import { blogPathParamNames } from '../../blog.model';
import { BlogPost, DeleteBlogPostRequest, GetBlogPostRequest } from '../blog-post-edit/blog-post-edit.model';
import { defaultBlogPost } from './blog-post-read.config';
import { RouterExtendedService } from '../../../../services/router-extended/router-extended.service';
import { BaseService } from '../../../../services/base/base.service';
import { NotificationsService } from 'angular2-notifications';
import { AuthService } from '../../../../services/auth/auth.service';
import { UserType } from '../../../../shared/models/user.model';

@Component({
  selector: 'app-blog-post-read',
  templateUrl: './blog-post-read.component.html',
  styleUrl: './blog-post-read.component.scss',
})
export class BlogPostReadComponent implements OnInit {
  
  protected readonly UserType = UserType;

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
    private readonly notifications: NotificationsService,
    protected readonly authService: AuthService,
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
  
  edit(): void {
    this.router.navigate(['/blog/edit', this.blogPost.language, this.blogPost.path]);
  }

  async delete(): Promise<void> {
    if (
      await confirm(
        $localize`:@@blog-posts.Are-you-sure-you-want-delete-blog-post:Are you sure you want delete blog post?`,
        $localize`:@@blog-posts.Caution:Caution!`
      ) === false
    ) {
      return;
    }

    try {
      await this.blogsService.delete({
        language: this.blogPost.language,
        path: this.blogPost.path,
      } satisfies DeleteBlogPostRequest);

      this.notifications.success(
        $localize`:@@notifications.Success:Success`,
        $localize`:@@blog-posts.Blog-post-deleted-successfully:Blog post deleted successfully`,
        BaseService.notificationOverride
      );

      this.router.navigate(['/blog/posts']);
    } catch (e) {
    }
  }

}
