import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, firstValueFrom, Observable } from 'rxjs';
import { NotificationsService } from 'angular2-notifications';

import { BaseService } from '../base/base.service';
import { RouterExtendedService } from '../router-extended/router-extended.service';

import { errors } from './auth.errors';
import { RegisterRequest, RegisterResponse } from '../../modules/register/components/register/register.model';
import { JwtPayload, Session } from '../../shared/models/auth.model';
import { LoginRequest, LoginResponse } from '../../modules/login/components/login/login.model';
import { UserType } from '../../shared/models/user.model';

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

  get payload(): JwtPayload | null {
    return this.jwtHelperService.decodeToken(this.session?.accessToken ?? '');
  }

  get canManageBlog(): boolean {
    return this.payload?.user_type === UserType.Blogger || this.payload?.user_type === UserType.Admin;
  }

  constructor(
    protected override readonly httpClient: HttpClient,
    protected override readonly notificationsService: NotificationsService,
    private readonly routerExtended: RouterExtendedService,
    private readonly jwtHelperService: JwtHelperService,
  ) {
    super(notificationsService, httpClient);
    this.errors = { ...this.errors, ...errors };
  }

  /**
   * Makes a request call to the API for registration purposes.
   * @param registerRequest New user's data provided during registration.
   * Currently user can provide only credentials (email, username, password).
   */
  async register(registerRequest: RegisterRequest): Promise<void> {
    const request = this.httpClient.post<RegisterResponse>(
      `${this.config.apiUrl}/${this.baseAuthPath}/register`,
      { ...registerRequest }
    ).pipe(catchError(this.catchCustomError.bind(this)));

    await this.handleAuthRequest(request);
  }

  /**
   * Makes a request call to the API for authentication purposes.
   * @param loginRequest User's credentials provided during log in.
   */
  async login(loginRequest: LoginRequest): Promise<void> {
    const request = this.httpClient.post<LoginResponse>(
      `${this.config.apiUrl}/${this.baseAuthPath}/login`,
      { ...loginRequest }
    ).pipe(catchError(this.catchCustomError.bind(this)));

    await this.handleAuthRequest(request);
  }

  /**
   * Makes a request call to the API for authentication purposes.
   * @param loginRequest User's credentials provided during log in.
   */
  async googleLogin(token: string): Promise<void> {
    const request = this.httpClient.post<LoginResponse>(
      `${this.config.apiUrl}/${this.baseAuthPath}/auth-google`,
      { OAuth_token: token },
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

  /**
   * Signs out user. Removes all session related data.
   */
  logout(redirectToLogin: boolean = false): void {
    this.clearSession();
    if (redirectToLogin) {
      this.routerExtended.navigateToLogin(this.routerExtended.previousUrl);
    } else {
      this.routerExtended.navigateToHome();
    }
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
