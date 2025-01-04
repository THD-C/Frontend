import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';

import { confirm } from 'devextreme/ui/dialog';

import { BlogsService } from '../../../../services/blogs/blogs.service';
import { availableLanguages, defaultLanguage } from '../../../../app.config';
import { BlogPost, DeleteBlogPostRequest, GetBlogPostsRequest } from '../blog-post-edit/blog-post-edit.model';
import { AuthService } from '../../../../services/auth/auth.service';
import { UserType } from '../../../../shared/models/user.model';
import { RouterExtendedService } from '../../../../services/router-extended/router-extended.service';
import { BaseService } from '../../../../services/base/base.service';
import { NotificationsService } from 'angular2-notifications';
import { contentCharsLimit } from './blog-posts.config';

@Component({
  selector: 'app-blog-posts',
  templateUrl: './blog-posts.component.html',
  styleUrl: './blog-posts.component.scss'
})
export class BlogPostsComponent implements OnInit {

  protected readonly availableLanguages = availableLanguages;
  protected readonly UserType = UserType;

  titleFilterTimeout?: NodeJS.Timeout = undefined;
  getBlogPostsRequest: GetBlogPostsRequest = {
    title: '',
    path: '',
    language: defaultLanguage.code,
  };

  blogPosts: BlogPost[] = [];

  loadingVisible: boolean = false;

  constructor(
    private readonly blogsService: BlogsService,
    @Inject(LOCALE_ID) private readonly locale: string,
    protected readonly authService: AuthService,
    private readonly router: RouterExtendedService,
    private readonly notifications: NotificationsService,
  ) { }

  async ngOnInit(): Promise<void> {
    this.applyLocale();
    await this.refreshBlogPosts();
  }

  applyLocale(): void {
    this.getBlogPostsRequest.language = availableLanguages.find(l => l.isoCode === this.locale)?.code ?? defaultLanguage.code;
  }

  async refreshBlogPosts(): Promise<void> {
    this.loadingVisible = true;

    try {
      this.blogPosts = await this.blogsService.get({
        ...this.getBlogPostsRequest,
        title: `${this.getBlogPostsRequest.title}*`, // "*" works like "%" in SQL
      });
    } catch (e) {
    } finally {
      setTimeout(() => {
        this.loadingVisible = false;
      }, 400);

      if (this.titleFilterTimeout) {
        clearTimeout(this.titleFilterTimeout);
        this.titleFilterTimeout = undefined;
      }
    }
  }

  truncateContent(blogPost: BlogPost): string {
    if (blogPost.content.length > contentCharsLimit) {
      return blogPost.content.substring(0, contentCharsLimit) + '...';
    }

    return blogPost.content;
  }

  edit(blogPost: BlogPost): void {
    this.router.navigate(['/blog/edit', blogPost.language, blogPost.path]);
  }

  async delete({ language, path }: BlogPost): Promise<void> {
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
        language,
        path,
      } satisfies DeleteBlogPostRequest);

      this.blogPosts = this.blogPosts.filter(bg => bg.language !== language || bg.path !== path);
      this.notifications.success(
        $localize`:@@notifications.Success:Success`,
        $localize`:@@blog-posts.Blog-post-deleted-successfully:Blog post deleted successfully`,
        BaseService.notificationOverride
      );
    } catch (e) {
    }
  }

}
