import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { HttpClient } from '@angular/common/http';
import { NotificationsService } from 'angular2-notifications';
import { errors } from './currencies.errors';
import { catchError, firstValueFrom } from 'rxjs';
import { Currency } from '../../modules/profile/components/profile/profile-wallets/profile-wallets.config';
import { GetCurrenciesRequest, GetCurrenciesResponse } from '../../modules/profile/components/profile/profile-wallets/profile-wallet-create/profile-wallet-create.model';

@Injectable({
  providedIn: 'root'
})
export class CurrenciesService extends BaseService {

  /**
   * The base path to currencies related endpoints.
   */
  readonly baseCurrenciesPath: string = 'currency';

  constructor(
    protected override readonly httpClient: HttpClient,
    protected override readonly notificationsService: NotificationsService,
  ) {
    super(notificationsService, httpClient);
    this.errors = { ...this.errors, ...errors };
  }
  
  /**
   * Makes a request call to the API
   * to retrieve the available currencies in the system.
   * @param getCurrenciesRequest Filters.
   */
  async get(getCurrenciesRequest: GetCurrenciesRequest): Promise<Currency[]> {
    const params = this.generateParams(getCurrenciesRequest);
    const request = this.httpClient.get<any>(
      `${this.config.apiUrl}/${this.baseCurrenciesPath}/currencies`,
      { params }
    ).pipe(catchError(this.catchCustomError.bind(this)));

    const { currencies } = await firstValueFrom(request) as GetCurrenciesResponse || { currencies: [] };
    return currencies;
  }
  
}
