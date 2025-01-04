import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, firstValueFrom } from 'rxjs';
import { NotificationsService } from 'angular2-notifications';

import { BaseService } from '../base/base.service';
import { errors } from './blogs.errors';
import { BlogPost, CreateBlogPostRequest } from '../../modules/blog/components/blog-post-edit/blog-post-edit.model';

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

}
