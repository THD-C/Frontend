import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, firstValueFrom } from 'rxjs';
import { NotificationsService } from 'angular2-notifications';
import { BaseService } from '../base/base.service';
import { errors } from './cryptos.errors';
import { CryptoDetails, CryptoPrice, GetCryptoDetailsRequest, GetCryptoDetailsResponse, GetCryptoHistoricalDataRequest, GetCryptoHistoricalDataResponse } from '../../modules/stock/components/stock-analyse/stock-analyse.model';
import { GetCoinsRequest, GetCoinsResponse } from '../../modules/stock/components/stocks-list/stocks-list.model';

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

    const { data } = await firstValueFrom(request) as GetCryptoHistoricalDataResponse || { data: { timestamp: [], price: [], open: [], high: [], low: [], close: [] }};
    return data.timestamp.map((value, index, array) => ({
      date: new Date(value),
      price: data.price?.at(index),
      open: data.open?.at(index),
      high: data.high?.at(index),
      low: data.low?.at(index),
      close: data.close?.at(index),
    } satisfies CryptoPrice));
  }

  /**
   * Makes a request call to the API
   * to retrieve coins.
   * @param getCoinsRequest Filters.
   */
  async getCoins(getCoinsRequest: GetCoinsRequest): Promise<CryptoDetails[]> {
    const params = this.generateParams(getCoinsRequest);
    const request = this.httpClient.get<any>(
      `${this.config.apiUrl}/${this.baseCryptosPath}/coins`,
      { params }
    ).pipe(catchError(this.catchCustomError.bind(this)));

    const { coins } = await firstValueFrom(request) as GetCoinsResponse || { coins: [] };
    return coins.map(coin => {
      const [coin_name, coin_details] = Object.entries(coin)[0];
      return coin_details;
    });
  }

}
