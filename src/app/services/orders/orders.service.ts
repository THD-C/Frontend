import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NotificationsService } from 'angular2-notifications';
import { catchError, firstValueFrom } from 'rxjs';
import { BaseService } from '../base/base.service';
import { errors } from './orders.errors';
import { environment } from '../../../environments/environment';
import { PlaceOrderRequest } from '../../modules/stock/components/stock/stock-order/stock-order.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService extends BaseService {

  /**
   * The base path to orders related endpoints.
   */
  readonly baseOrdersPath: string = 'order';

  constructor(
    private readonly httpClient: HttpClient,
    protected override readonly notificationsService: NotificationsService,
  ) {
    super(notificationsService);
    this.errors = { ...this.errors, ...errors };
  }

  /**
   * Makes a request call to the API for placing an order.
   * @param placeOrderRequest {@link PlaceOrderRequest}.
   */
  async placeOrder(placeOrderRequest: PlaceOrderRequest): Promise<void> {
    const request = this.httpClient.post<void>(
      `${environment.apiUrl}/${this.baseOrdersPath}/`,
      { ...placeOrderRequest }
    ).pipe(catchError(this.catchCustomError.bind(this)));

    await firstValueFrom(request);
  }
}
