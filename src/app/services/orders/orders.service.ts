import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NotificationsService } from 'angular2-notifications';
import { catchError, firstValueFrom } from 'rxjs';
import { BaseService } from '../base/base.service';
import { errors } from './orders.errors';
import { environment } from '../../../environments/environment';
import { ConfirmOrderRequest, GetOrdersRequest, GetOrdersResponse, Order } from '../../modules/stock/components/stock/stock-order/stock-order.model';

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
   * Makes a request call to the API for confirming an order.
   * @param confirmOrderRequest {@link ConfirmOrderRequest}.
   */
  async confirmOrder(confirmOrderRequest: ConfirmOrderRequest): Promise<Order> {
    const request = this.httpClient.post<Order>(
      `${environment.apiUrl}/${this.baseOrdersPath}/`,
      { ...confirmOrderRequest }
    ).pipe(catchError(this.catchCustomError.bind(this)));

    return await firstValueFrom(request) as Order;
  }

  
  /**
   * Makes a request call to the API to retrieve the orders.
   * @param getOrdersRequest Filters.
   */
  async get(getOrdersRequest: GetOrdersRequest): Promise<Order[]> {
    const params = this.generateParams(getOrdersRequest);
    const request = this.httpClient.get<any>(
      `${environment.apiUrl}/${this.baseOrdersPath}/orders`,
      { params }
    ).pipe(catchError(this.catchCustomError.bind(this)));

    const { orders } = await firstValueFrom(request) as GetOrdersResponse;
    return orders;
  }

}
