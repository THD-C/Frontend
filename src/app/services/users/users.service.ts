import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, firstValueFrom } from 'rxjs';
import { NotificationsService } from 'angular2-notifications';
import { BaseService } from '../base/base.service';

import { errors } from './users.errors';
import { UpdateUserPasswordRequest } from '../../modules/profile/components/profile/profile-password/profile-password.model';
import { UpdateProfileDetailsRequest, UserProfileDetails } from '../../modules/profile/components/profile/profile-details/profile-details.model';
import { GetUsersListResponse, ManageUser } from '../../modules/admin/components/admin/admin-users/admin-users.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends BaseService {

  /**
   * The base path to users related endpoints.
   */
  readonly baseUsersPath: string = 'user';

  constructor(
    protected override readonly httpClient: HttpClient,
    protected override readonly notificationsService: NotificationsService,
  ) {
    super(notificationsService, httpClient);
    this.errors = { ...this.errors, ...errors };
  }

  /**
   * Makes a request call to the API for updating currently logged in user.
   * @param updateProfileDetailsRequest Logged user's data.
   */
  async updateProfileDetails(updateProfileDetailsRequest: UpdateProfileDetailsRequest): Promise<void> {
    const request = this.httpClient.put<void>(
      `${this.config.apiUrl}/${this.baseUsersPath}/`,
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
      `${this.config.apiUrl}/${this.baseUsersPath}/update-password`,
      { ...updateUserPassword }
    ).pipe(catchError(this.catchCustomError.bind(this)));

    await firstValueFrom(request);
  }

  /**
   * Makes a request call to the API to get logged user's data.
   */
  async getMe(): Promise<UserProfileDetails> {
    const request = this.httpClient.get<UserProfileDetails>(
      `${this.config.apiUrl}/${this.baseUsersPath}/`,
    ).pipe(catchError(this.catchCustomError.bind(this)));

    return await firstValueFrom(request) as UserProfileDetails;
  }

  /**
   * Makes a request call to the API to get all users in the system.
   * Requests for admins ONLY!
   * @returns List of users that admin can manage
   */
  async getList(): Promise<ManageUser[]> {
    const request = this.httpClient.get<GetUsersListResponse>(
      `${this.config.apiUrl}/${this.baseUsersPath}/list-users`,
    ).pipe(catchError(this.catchCustomError.bind(this)));

    const { user_data } = await firstValueFrom(request) as GetUsersListResponse || { user_data: [] };
    return user_data;
  }

}
