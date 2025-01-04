import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, firstValueFrom } from 'rxjs';
import { NotificationsService } from 'angular2-notifications';

import { BaseService } from '../base/base.service';
import { errors } from './blogs.errors';
import { BlogPost, CreateBlogPostRequest, GetBlogPostRequest, GetBlogPostResponse, UpdateBlogPostRequest } from '../../modules/blog/components/blog-post-edit/blog-post-edit.model';
import { defaultEditBlogPost } from '../../modules/blog/components/blog-post-edit/blog-post-edit.config';

@Injectable({
  providedIn: 'root'
})
export class BlogsService extends BaseService {

  /**
   * The base path to blogs related endpoints.
   */
  readonly baseBlogsPath: string = 'blog';

  constructor(
    protected override readonly httpClient: HttpClient,
    protected override readonly notificationsService: NotificationsService,
  ) {
    super(notificationsService, httpClient);
    this.errors = { ...this.errors, ...errors };
  }
  
  async create(data: CreateBlogPostRequest): Promise<BlogPost> {
    const request = this.httpClient.post<BlogPost>(
      `${this.config.apiUrl}/${this.baseBlogsPath}/`,
      { ...data }
    ).pipe(catchError(this.catchCustomError.bind(this)));

    return await firstValueFrom(request) as BlogPost;
  }
  
  async update(data: UpdateBlogPostRequest): Promise<BlogPost> {
    const request = this.httpClient.put<BlogPost>(
      `${this.config.apiUrl}/${this.baseBlogsPath}/`,
      { ...data }
    ).pipe(catchError(this.catchCustomError.bind(this)));

    return await firstValueFrom(request) as BlogPost;
  }

  async get(filters: GetBlogPostRequest): Promise<BlogPost[]> {
    const params = this.generateParams(filters);
    const request = this.httpClient.get<GetBlogPostResponse>(
      `${this.config.apiUrl}/${this.baseBlogsPath}/`,
      { params }
    ).pipe(catchError(this.catchCustomError.bind(this)));

    const { Blogs } = await firstValueFrom(request) as GetBlogPostResponse || { Blogs: [] };
    return Blogs;
  }

  async getSingle(language: string, path: string): Promise<BlogPost> {
    if (language.length === 0 || path.length === 0) {
      return defaultEditBlogPost;
    }

    const blogs = await this.get({
      language,
      path,
      title: '',
    });

    return blogs[0] ?? defaultEditBlogPost;
  }

}
