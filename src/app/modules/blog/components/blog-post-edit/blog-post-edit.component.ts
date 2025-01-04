import { Component, Inject, LOCALE_ID, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogsService } from '../../../../services/blogs/blogs.service';
import { CreateBlogPostRequest, EditBlogPostRequest, UpdateBlogPostRequest } from './blog-post-edit.model';
import { defaultEditBlogPost } from './blog-post-edit.config';
import { blogPathParamNames } from '../../blog.model';
import { availableLanguages, defaultLanguage } from '../../../../app.config';
import { Subscription } from 'rxjs';
import { RouterExtendedService } from '../../../../services/router-extended/router-extended.service';
import { NotificationsService } from 'angular2-notifications';
import { BaseService } from '../../../../services/base/base.service';

@Component({
  selector: 'app-blog-post-edit',
  templateUrl: './blog-post-edit.component.html',
  styleUrl: './blog-post-edit.component.scss'
})
export class BlogPostEditComponent implements OnInit, OnDestroy {

  protected readonly availableLanguages = availableLanguages;

  get isFormValid(): boolean {
    return this.editBlogPost.content.length > 0 && this.editBlogPost.title.length > 0 && this.editBlogPost.language.length > 0;
  }

  get isNew(): boolean {
    return this.editBlogPost.path.length === 0;
  }

  editBlogPost: EditBlogPostRequest = defaultEditBlogPost;

  subscriptions: Subscription[] = [];

  constructor(
    private readonly blogsService: BlogsService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: RouterExtendedService,
    @Inject(LOCALE_ID) private readonly locale: string,
    private readonly notifications: NotificationsService,
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
        this.editBlogPost.path = params.get(blogPathParamNames.path) ?? defaultEditBlogPost.path;
        this.editBlogPost.language = params.get(blogPathParamNames.language) // Entering edit view on existing blog post
          ?? availableLanguages.find(l => l.isoCode === this.locale)?.code // Entering edit view on new (creating) blog post
          ?? defaultLanguage.code;
      })
    );
  }
  
  /**
   * Make sure this method is called
   * after {@link applyPathParams} call!
   */
  async getBlogPost(): Promise<void> {
    try {
      this.editBlogPost = await this.blogsService.getSingle(
        this.editBlogPost.language,
        this.editBlogPost.path
      );
    } catch (e) {
    }
  }

  async save(): Promise<void> {
    if (this.isFormValid === false) {
      return;
    }

    try {
      if (this.isNew) {
        this.editBlogPost = await this.blogsService.create({
          title: this.editBlogPost.title,
          content: this.editBlogPost.content,
          language: this.editBlogPost.language,
        } satisfies CreateBlogPostRequest);
      } else {
        this.editBlogPost = await this.blogsService.update({
          title: this.editBlogPost.title,
          content: this.editBlogPost.content,
          language: this.editBlogPost.language,
          path: this.editBlogPost.path,
        } satisfies UpdateBlogPostRequest);
      }

      const currentRoutePath = this.activatedRoute.snapshot.routeConfig?.path;
      const newRoutePath = currentRoutePath?.replace(`:${blogPathParamNames.path}`, this.editBlogPost.path)
        .replace(`:${blogPathParamNames.language}`, this.editBlogPost.language);

      console.log(this.activatedRoute.parent);
      this.router.navigate([newRoutePath], {
        relativeTo: this.activatedRoute.parent, // Parent points to '/blog'
        replaceUrl: true,
      });

      this.notifications.success(
        $localize`:@@notifications.Success:Success`,
        $localize`:@@blog-post-edit.Blog-post-saved-successfully:Blog post saved successfully`,
        BaseService.notificationOverride
      );
    } catch (e) {
    }
  }

}
