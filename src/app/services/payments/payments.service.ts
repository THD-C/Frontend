import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, firstValueFrom, Observable } from 'rxjs';
import { NotificationsService } from 'angular2-notifications';

import { environment } from '../../../environments/environment';

import { BaseService } from '../base/base.service';
import { errors } from './payments.errors';
import { MakePaymentRequest, MakePaymentResponse } from '../../shared/components/donate/donate.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService extends BaseService {

  /**
   * The base path to payments related endpoints.
   */
  readonly basePaymentsPath: string = 'payments';

  constructor(
    private readonly httpClient: HttpClient,
    protected override readonly notificationsService: NotificationsService,
  ) {
    super(notificationsService);
    this.errors = { ...this.errors, ...errors };
  }

  async makePayment(makePaymentRequest: MakePaymentRequest): Promise<MakePaymentResponse> {
    const request = this.httpClient.post<MakePaymentResponse>(
      `${environment.apiUrl}/${this.basePaymentsPath}/`,
      { 
        ...makePaymentRequest,
        nominal: makePaymentRequest.nominal.toString()
      }
    ).pipe(catchError(this.catchCustomError.bind(this)));

    return await firstValueFrom(request) as MakePaymentResponse;
  }
}
