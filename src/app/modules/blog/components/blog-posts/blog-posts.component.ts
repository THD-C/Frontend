import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { BlogsService } from '../../../../services/blogs/blogs.service';
import { availableLanguages, defaultLanguage } from '../../../../app.config';
import { BlogPost, GetBlogPostRequest } from '../blog-post-edit/blog-post-edit.model';

@Component({
  selector: 'app-blog-posts',
  templateUrl: './blog-posts.component.html',
  styleUrl: './blog-posts.component.scss'
})
export class BlogPostsComponent implements OnInit {

  protected readonly availableLanguages = availableLanguages;

  titleFilterTimeout?: NodeJS.Timeout = undefined;
  getBlogPostsRequest: GetBlogPostRequest = {
    title: '',
    path: '',
    language: defaultLanguage.code,
  };

  blogPosts: BlogPost[] = [];

  loadingVisible: boolean = false;
  private readonly titleFilterTimeoutInMilliseconds: number = 400;

  constructor(
    private readonly blogsService: BlogsService,
    @Inject(LOCALE_ID) private readonly locale: string,
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

  onLanguageChanged(): void {
    this.refreshBlogPosts();
  }

  onTitleKeyDown(): void {
    if (this.titleFilterTimeout) {
      clearTimeout(this.titleFilterTimeout);
      this.titleFilterTimeout = undefined;
    }

    this.titleFilterTimeout = setTimeout(async () => await this.refreshBlogPosts(), this.titleFilterTimeoutInMilliseconds);
  }

}
