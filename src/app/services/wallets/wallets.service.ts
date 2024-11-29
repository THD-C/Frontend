import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { HttpClient } from '@angular/common/http';
import { NotificationsService } from 'angular2-notifications';
import { errors } from './wallets.errors';
import { CreateWalletRequest, UpdateWalletRequest, Wallet } from '../../modules/profile/components/profile/profile-wallets/profile-wallets.model';
import { environment } from '../../../environments/environment';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WalletsService extends BaseService {

  /**
   * The base path to wallets related endpoints.
   */
  readonly baseWalletsPath: string = 'wallets';

  constructor(
    private readonly httpClient: HttpClient,
    protected override readonly notificationsService: NotificationsService,
  ) {
    super(notificationsService);
    this.errors = { ...this.errors, ...errors };
  }

  async get(filters: {
    user_id: number
  }): Promise<Wallet[]> {
    const params = this.generateParams(filters);
    const request = this.httpClient.get<Wallet[]>(
      `${environment.apiUrl}/${this.baseWalletsPath}/`,
      { params }
    ).pipe(catchError(this.catchCustomError.bind(this)));

    return await firstValueFrom(request) as Wallet[];
  }

  async getById(id: number): Promise<Wallet> {
    const params = this.generateParams({ id });
    const request = this.httpClient.get<Wallet>(
      `${environment.apiUrl}/${this.baseWalletsPath}/wallet/`,
      { params }
    ).pipe(catchError(this.catchCustomError.bind(this)));

    return await firstValueFrom(request) as Wallet;
  }

  async delete(id: number): Promise<void> {
    const params = this.generateParams({ id });
    const request = this.httpClient.delete(
      `${environment.apiUrl}/${this.baseWalletsPath}/`,
      { params }
    ).pipe(catchError(this.catchCustomError.bind(this)));

    await firstValueFrom(request) as Wallet;
  }

  async create(createWalletRequest: CreateWalletRequest): Promise<Wallet> {
    const request = this.httpClient.post<Wallet>(
      `${environment.apiUrl}/${this.baseWalletsPath}/`,
      { ...createWalletRequest }
    ).pipe(catchError(this.catchCustomError.bind(this)));

    return await firstValueFrom(request) as Wallet;
  }

  async update(updateWalletRequest: UpdateWalletRequest): Promise<Wallet> {
    const request = this.httpClient.put<Wallet>(
      `${environment.apiUrl}/${this.baseWalletsPath}/`,
      { ...updateWalletRequest }
    ).pipe(catchError(this.catchCustomError.bind(this)));

    return await firstValueFrom(request) as Wallet;
  }

}
