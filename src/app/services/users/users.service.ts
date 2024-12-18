import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, firstValueFrom } from 'rxjs';
import { NotificationsService } from 'angular2-notifications';
import { BaseService } from '../base/base.service';

import { errors } from './users.errors';
import { environment } from '../../../environments/environment';
import { UpdateUserPasswordRequest } from '../../modules/profile/components/profile/profile-password/profile-password.model';
import { UpdateProfileDetailsRequest, UserProfileDetails } from '../../modules/profile/components/profile/profile-details/profile-details.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends BaseService {

  /**
   * The base path to users related endpoints.
   */
  readonly baseUsersPath: string = 'user';

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
      `${environment.apiUrl}/${this.baseUsersPath}/`,
      { ...updateProfileDetailsRequest }
    ).pipe(catchError(this.catchCustomError.bind(this)));

    await firstValueFrom(request);
  }

  /**
   * Makes a request call to the API for updating currently logged in user's password.
   * @param updateProfileDetailsRequest Logged user's data.
   */
  async updatePassword(updateUserPassword: UpdateUserPasswordRequest): Promise<void> {
    const request = this.httpClient.put<void>(
      `${environment.apiUrl}/${this.baseUsersPath}/update-password`,
      { ...updateUserPassword }
    ).pipe(catchError(this.catchCustomError.bind(this)));

    await firstValueFrom(request);
  }

  /**
   * Makes a request call to the API to get logged user's data.
   */
  async getMe(): Promise<UserProfileDetails> {
    const request = this.httpClient.get<UserProfileDetails>(
      `${environment.apiUrl}/${this.baseUsersPath}/`,
    ).pipe(catchError(this.catchCustomError.bind(this)));

    return await firstValueFrom(request) as UserProfileDetails;
  }

}
