import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';
import { BaseService } from '../base/base.service';
import { NotificationsService } from 'angular2-notifications';
import { errors } from './statistics.errors';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService extends BaseService {

  /**
   * The base path to statistics related endpoints.
   */
  readonly baseStatisticsPath: string = 'statistics';

  constructor(
    protected override readonly notificationsService: NotificationsService,
    protected override readonly httpClient: HttpClient,
  ) {
    super(notificationsService, httpClient);
    this.errors = { ...this.errors, ...errors };
  }

  async getPortfolioDiversity(userId?: string, currency: string = 'usd'): Promise<unknown> {
    const params = this.generateParams({ user_id: userId, currency });

    const response = this.httpClient.get<unknown>(
      `${this.config.apiUrl}/${this.baseStatisticsPath}/portfolio-diversity`,
      { params }
    ).pipe(catchError(this.catchCustomError.bind(this)));

    return await firstValueFrom(response);
  }

  async getCryptoEstimation(userId?: string, currency: string = 'usd', walletId?: string): Promise<unknown> {
    const params = this.generateParams({ user_id: userId, currency, wallet_id: walletId });

    const response = this.httpClient.get<unknown>(
      `${this.config.apiUrl}/${this.baseStatisticsPath}/crypto-estimation`,
      { params }
    ).pipe(catchError(this.catchCustomError.bind(this)));

    return await firstValueFrom(response);
  }
}
