import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, firstValueFrom, Observable } from 'rxjs';
import { NotificationsService } from 'angular2-notifications';

import { environment } from '../../../environments/environment';

import { BaseService } from '../base/base.service';
import { RouterExtendedService } from '../router-extended/router-extended.service';

import { errors as userErrors } from './auth.errors';
import { RegisterRequest, RegisterResponse } from '../../modules/register/components/register/register.model';
import { Session } from '../../shared/models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {

  /**
   * The base path to authentication related endpoints.
   */
  readonly baseAuthPath: string = 'auth';

  /**
   * Local storage key to the session data.
   */
  static readonly localStorageSessionKey: string = 'session';

  /**
   * Checks whether use is authenticated or not.
   */
  get isAuthenticated(): boolean {
    return this.session !== undefined;
  }    

  /**
   * Checks whether token is expired.
   */
  get isTokenExpired(): boolean {
    if (this.isAuthenticated) {
      return this.jwtHelperService.isTokenExpired(this.session?.accessToken ?? '');
    }

    return false;
  }

  /**
   * Provides {@link Session} if exists.
   */
  get session(): Session | undefined {
    const session = localStorage.getItem(AuthService.localStorageSessionKey) ?? '';
    if (session) {
      return JSON.parse(session) as Session;
    }

    return undefined;
  }

  /**
   * Credentials to authenticate a user with a server.
   */
  get authorizationHeaderValue(): string {
    if (this.session) {
      return `${this.session?.authScheme} ${this.session?.accessToken}`;
    }

    return '';
  }

  constructor(
    private readonly httpClient: HttpClient,
    protected override readonly notificationsService: NotificationsService,
    private readonly routerExtended: RouterExtendedService,
    private readonly jwtHelperService: JwtHelperService,
  ) {
    super(notificationsService);
    this.errors = { ...this.errors, ...userErrors };
  }

  /**
   * Makes a request call to the API for registration purposes.
   * @param newUser New user's data provided during registration.
   * Currently user can provide only credentials (email, username, password).
   */
  async register(newUser: RegisterRequest): Promise<void> {
    const request = this.httpClient.post<RegisterResponse>(
      `${environment.apiUrl}/${this.baseAuthPath}/register`,
      { ...newUser }
    ).pipe(catchError(this.catchCustomError.bind(this)));

    await this.handleAuthRequest(request);
  }

  /**
   * Handles request.
   * @param request The request from {@link register}.
   */
  private async handleAuthRequest(request: Observable<void | RegisterResponse>): Promise<void> {
    const response = await firstValueFrom(request);
    this.saveSession(response as Session);

    this.routerExtended.navigateToPreviousUrl();
  }

  async secured(): Promise<void> {
    const request = this.httpClient.post<void>(
      `${environment.apiUrl}/${this.baseAuthPath}/secured`,
      {}
    ).pipe(catchError(this.catchCustomError.bind(this)));

    await firstValueFrom(request);
  }

  /**
   * Signs out user. Removes all session related data.
   */
  logout(): void {
    this.clearSession();
    this.routerExtended.navigateToHome();
  }

  /**
   * Saves {@link Session} to the local storage.
   * @param session The {@link Session} data to save in the local storage.
   */
  private saveSession(session: Session): void {
    localStorage.setItem(AuthService.localStorageSessionKey, JSON.stringify(session));
  }

  /**
   * Clears out all user related session data.
   */
  private clearSession(): void {
    localStorage.removeItem(AuthService.localStorageSessionKey);
  }

}
