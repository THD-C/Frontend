import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, firstValueFrom } from 'rxjs';
import { NotificationsService } from 'angular2-notifications';
import { BaseService } from '../base/base.service';

import { errors } from './users.errors';
import { UpdateProfileDetailsRequest, UserProfileDetails } from '../../modules/profile/components/profile/profile.model';
import { environment } from '../../../environments/environment';
import { User } from '../../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends BaseService {

  /**
   * The base path to users related endpoints.
   */
  readonly baseUsersPath: string = 'users';

  constructor(
    private readonly httpClient: HttpClient,
    protected override readonly notificationsService: NotificationsService,
  ) {
    super(notificationsService);
    this.errors = { ...this.errors, ...errors };
  }

  /**
   * Makes a request call to the API for updating currently logged in user.
   * @param updateProfileDetailsRequest Logged user's data.
   */
  async updateProfileDetails(updateProfileDetailsRequest: UpdateProfileDetailsRequest): Promise<void> {
    const request = this.httpClient.put<void>(
      `${environment.apiUrl}/${this.baseUsersPath}/me/details`,
      { ...updateProfileDetailsRequest }
    ).pipe(catchError(this.catchCustomError.bind(this)));

    await firstValueFrom(request);
  }

  /**
   * Makes a request call to the API to get logged user's data.
   * @param updateProfileDetailsRequest Logged user's data.
   */
  async getMe(): Promise<UserProfileDetails> {
    const request = this.httpClient.get<UserProfileDetails>(
      `${environment.apiUrl}/${this.baseUsersPath}/me`
    ).pipe(catchError(this.catchCustomError.bind(this)));

    return await firstValueFrom(request) as UserProfileDetails;
  }

}