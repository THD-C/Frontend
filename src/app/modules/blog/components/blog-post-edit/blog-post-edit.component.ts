import { Component, Inject, LOCALE_ID, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BlogsService } from '../../../../services/blogs/blogs.service';
import { CreateBlogPostRequest, EditBlogPostRequest } from './blog-post-edit.model';
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
    private readonly location: Location,
    private readonly notifications: NotificationsService,
  ) { }

  async ngOnInit(): Promise<void> {
    this.applyPathParams();
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
        this.editBlogPost.language = availableLanguages.find(l => l.isoCode === this.locale)?.code ?? defaultLanguage.code;
      })
    );
  }

  async save(): Promise<void> {
    if (this.isFormValid === false) {
      return;
    }

    try {
      if (this.isNew) {
        const { path } = await this.blogsService.create({
          title: this.editBlogPost.title,
          content: this.editBlogPost.content,
          language: this.editBlogPost.language,
        } satisfies CreateBlogPostRequest);

        const currentRoutePath = this.activatedRoute.snapshot.routeConfig?.path;
        const newRoutePath = currentRoutePath?.replace(`:${blogPathParamNames.path}`, path);

        this.editBlogPost.path = path;
        this.router.navigate([newRoutePath], {
          relativeTo: this.activatedRoute.parent, // Parent points to '/blog'
          replaceUrl: true,
        });
      }

      this.notifications.success(
        $localize`:@@notifications.Success:Success`,
        $localize`:@@blog-post-edit.Blog-post-saved-successfully:Blog post saved successfully`,
        BaseService.notificationOverride
      );
    } catch (e) {
    }
  }

}
