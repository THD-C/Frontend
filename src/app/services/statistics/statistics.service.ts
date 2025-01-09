import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NotificationsService } from 'angular2-notifications';
import { catchError } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';
import { BaseService } from '../base/base.service';
import { errors } from './statistics.errors';
import { CryptoEstimationRequest, CryptoWalletStatistics, PortfolioDiversityRequest, PortfolioDiversityResponse } from '../../modules/profile/components/profile/profile-statisticts/profile-statisticts.model';

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

  async getPortfolioDiversity(filters: PortfolioDiversityRequest): Promise<PortfolioDiversityResponse> {
    const params = this.generateParams({ ...filters });

    const request = this.httpClient.get<PortfolioDiversityResponse>(
      `${this.config.apiUrl}/${this.baseStatisticsPath}/portfolio-diversity`,
      { params }
    ).pipe(catchError(this.catchCustomError.bind(this)));

    return await firstValueFrom(request) as PortfolioDiversityResponse;
  }

  async getCryptoEstimation(filters: CryptoEstimationRequest): Promise<CryptoWalletStatistics> {
    const params = this.generateParams({ ...filters });

    const request = this.httpClient.get<CryptoWalletStatistics>(
      `${this.config.apiUrl}/${this.baseStatisticsPath}/crypto-estimation`,
      { params }
    ).pipe(catchError(this.catchCustomError.bind(this)));

    return await firstValueFrom(request) as CryptoWalletStatistics;
  }
}
