import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, firstValueFrom, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { BaseService } from '../base/base.service';
import { NotificationsService } from 'angular2-notifications';
import { RegisterRequest } from '../../modules/register/components/register/register.model';
import { errors as userErrors } from './auth.errors';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {

  readonly baseResource: string = 'auth';

  constructor(
    private readonly httpClient: HttpClient,
    protected override readonly notificationsService: NotificationsService,
  ) {
    super(notificationsService);
    this.errors = { ...this.errors, ...userErrors };
  }

  async register(newUser: RegisterRequest): Promise<void> {
    const request = this.httpClient.post<void>(
      `${environment.apiUrl}/${this.baseResource}/register`,
      { ...newUser }
    ).pipe(catchError(this.catchCustomError.bind(this)));

    await firstValueFrom(request);
  }

}
