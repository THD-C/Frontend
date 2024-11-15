import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BaseService } from './base.service';
import { NotificationsService } from 'angular2-notifications';
import { SignUpRequest } from '../modules/sign-up/components/sign-up/sign-up.model';
import { catchError, firstValueFrom } from 'rxjs';

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
    protected override readonly notificationsService: NotificationsService) {
    super(notificationsService);
  }

  async register(newUser: SignUpRequest): Promise<void> {
    const formData = this.getFormData(newUser);
    const request = this.httpClient.post<void>(
      `${environment.apiUrl}/login`,
      formData
    ).pipe(catchError(this.catchCustomError.bind(this)));

    await firstValueFrom(request);
  }

}
