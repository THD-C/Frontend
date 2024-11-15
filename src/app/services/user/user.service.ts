import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { BaseService } from '../base/base.service';
import { NotificationsService } from 'angular2-notifications';
import { SignUpRequest } from '../../modules/sign-up/components/sign-up/sign-up.model';
import { errors as userErrors } from './user.errors';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {

  /**
   * Waiting for homie when he adds that prefix 🤘
   */
  readonly baseResource: string = 'auth';

  constructor(
    private readonly httpClient: HttpClient,
    protected override readonly notificationsService: NotificationsService,
  ) {
    super(notificationsService);
    this.errors = { ...this.errors, ...userErrors };
  }

  async register(newUser: SignUpRequest): Promise<void> {
    const request = this.httpClient.post<void>(
      `${environment.apiUrl}/${this.baseResource}/register`,
      { ...newUser }
    ).pipe(catchError(this.catchCustomError.bind(this)));

    await firstValueFrom(request);
  }

}
