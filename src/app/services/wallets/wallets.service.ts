import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { HttpClient } from '@angular/common/http';
import { NotificationsService } from 'angular2-notifications';
import { errors } from './wallets.errors';
import { CreateWalletRequest, GetWalletsResponse, UpdateWalletRequest, Wallet } from '../../modules/profile/components/profile/profile-wallets/profile-wallets.model';
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
    protected override readonly httpClient: HttpClient,
    protected override readonly notificationsService: NotificationsService,
  ) {
    super(notificationsService, httpClient);
    this.errors = { ...this.errors, ...errors };
  }

  async get(): Promise<Wallet[]> {
    const request = this.httpClient.get<GetWalletsResponse>(
      `${this.config.apiUrl}/${this.baseWalletsPath}/`
    ).pipe(catchError(this.catchCustomError.bind(this)));

    const { wallets } = await firstValueFrom(request) as GetWalletsResponse || { wallets: [] };
    return wallets;
  }

  async getById(id: number): Promise<Wallet> {
    const params = this.generateParams({ wallet_id: id });
    const request = this.httpClient.get<Wallet>(
      `${this.config.apiUrl}/${this.baseWalletsPath}/wallet/`,
      { params }
    ).pipe(catchError(this.catchCustomError.bind(this)));

    return await firstValueFrom(request) as Wallet;
  }

  async delete(id: number): Promise<void> {
    const params = this.generateParams({ wallet_id: id });
    const request = this.httpClient.delete(
      `${this.config.apiUrl}/${this.baseWalletsPath}/`,
      { params }
    ).pipe(catchError(this.catchCustomError.bind(this)));

    await firstValueFrom(request) as Wallet;
  }

  async create(createWalletRequest: CreateWalletRequest): Promise<Wallet> {
    const request = this.httpClient.post<Wallet>(
      `${this.config.apiUrl}/${this.baseWalletsPath}/`,
      { ...createWalletRequest }
    ).pipe(catchError(this.catchCustomError.bind(this)));

    return await firstValueFrom(request) as Wallet;
  }

  async update(updateWalletRequest: UpdateWalletRequest): Promise<Wallet> {
    const request = this.httpClient.put<Wallet>(
      `${this.config.apiUrl}/${this.baseWalletsPath}/`,
      { ...updateWalletRequest }
    ).pipe(catchError(this.catchCustomError.bind(this)));

    return await firstValueFrom(request) as Wallet;
  }

}
