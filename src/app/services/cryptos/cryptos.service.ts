import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { HttpClient } from '@angular/common/http';
import { NotificationsService } from 'angular2-notifications';
import { errors } from './cryptos.errors';
import { catchError, firstValueFrom } from 'rxjs';
import { CryptoDetails, CryptoPrice, GetCryptoDetailsRequest, GetCryptoDetailsResponse, GetCryptoHistoricalDataRequest, GetCryptoHistoricalDataResponse } from '../../modules/stock/components/stock/stock.model';

@Injectable({
  providedIn: 'root'
})
export class CryptosService extends BaseService {

  /**
   * The base path to cryptos related endpoints.
   */
  readonly baseCryptosPath: string = 'crypto';

  constructor(
    protected override readonly httpClient: HttpClient,
    protected override readonly notificationsService: NotificationsService,
  ) {
    super(notificationsService, httpClient);
    this.errors = { ...this.errors, ...errors };
  }
  
  /**
   * Makes a request call to the API
   * to retrieve crypto details.
   * @param getCryptoDetailsRequest Filters.
   */
  async getDetails(getCryptoDetailsRequest: GetCryptoDetailsRequest): Promise<CryptoDetails> {
    const params = this.generateParams(getCryptoDetailsRequest);
    const request = this.httpClient.get<any>(
      `${this.config.apiUrl}/${this.baseCryptosPath}/details`,
      { params }
    ).pipe(catchError(this.catchCustomError.bind(this)));

    const { data } = await firstValueFrom(request) as GetCryptoDetailsResponse;
    return data;
  }
  
  /**
   * Makes a request call to the API
   * to retrieve crypto historical data.
   * @param getCryptoHistoricalDataRequest Filters.
   */
  async getHistoricalData(getCryptoHistoricalDataRequest: GetCryptoHistoricalDataRequest): Promise<CryptoPrice[]> {
    const params = this.generateParams(getCryptoHistoricalDataRequest);
    const request = this.httpClient.get<any>(
      `${this.config.apiUrl}/${this.baseCryptosPath}/historical-data`,
      { params }
    ).pipe(catchError(this.catchCustomError.bind(this)));

    const { data } = await firstValueFrom(request) as GetCryptoHistoricalDataResponse || { data: { timestamp: [], price: [] }};
    return data.timestamp.map((value, index, array) => ({
      date: new Date(value),
      price: data.price[index]
    } satisfies CryptoPrice));
  }

}
