import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, firstValueFrom } from 'rxjs';
import { NotificationsService } from 'angular2-notifications';

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
    protected override readonly httpClient: HttpClient,
    protected override readonly notificationsService: NotificationsService,
  ) {
    super(notificationsService, httpClient);
    this.errors = { ...this.errors, ...errors };
  }

  async makePayment(makePaymentRequest: MakePaymentRequest): Promise<MakePaymentResponse[]> {
    const request = this.httpClient.post<MakePaymentResponse[]>(
      `${this.config.apiUrl}/${this.basePaymentsPath}/`,
      { 
        ...makePaymentRequest,
        nominal: makePaymentRequest.nominal.toString()
      }
    ).pipe(catchError(this.catchCustomError.bind(this)));

    return await firstValueFrom(request) as MakePaymentResponse[];
  }

  async get(): Promise<Payment[]> {
    const request = this.httpClient.get<GetPaymentsResponse>(
      `${this.config.apiUrl}/${this.basePaymentsPath}/payments`
    ).pipe(catchError(this.catchCustomError.bind(this)));

    const { payments } = await firstValueFrom(request) as GetPaymentsResponse || { payments: [] };
    return payments;
  }

  async cancel(payment_id: string): Promise<Payment> {
    const params = this.generateParams({ payment_id });
    const request = this.httpClient.put<Payment>(
      `${this.config.apiUrl}/${this.basePaymentsPath}/payment/cancel`,
      undefined,
      { params }
    ).pipe(catchError(this.catchCustomError.bind(this)));

    return await firstValueFrom(request) as Payment;
  }

}
