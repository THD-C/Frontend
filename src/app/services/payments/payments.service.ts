import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, firstValueFrom } from 'rxjs';
import { NotificationsService } from 'angular2-notifications';

import { environment } from '../../../environments/environment';

import { BaseService } from '../base/base.service';
import { errors } from './payments.errors';
import { GetPaymentsResponse, MakePaymentRequest, MakePaymentResponse, Payment } from '../../modules/profile/components/profile/profile-payments/profile-payments.model';

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

  async get(): Promise<Payment[]> {
    const request = this.httpClient.get<GetPaymentsResponse>(
      `${environment.apiUrl}/${this.basePaymentsPath}/payments`
    ).pipe(catchError(this.catchCustomError.bind(this)));

    const { payments } = await firstValueFrom(request) as GetPaymentsResponse;
    return payments;
  }

  async cancel(payment_id: string): Promise<Payment> {
    const params = this.generateParams({ payment_id });
    const request = this.httpClient.put<Payment>(
      `${environment.apiUrl}/${this.basePaymentsPath}/payment/cancel`,
      undefined,
      { params }
    ).pipe(catchError(this.catchCustomError.bind(this)));

    return await firstValueFrom(request) as Payment;
  }

}
