import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouterExtendedService extends Router {

  /**
   * Local storage key to the previous url.
   */
  static readonly localStoragePreviousUrlKey: string = 'previous-url';

  /**
   * The path to the home page.
   */
  static readonly homeUrl: string = '/';

  /**
   * The path to the login page.
   */
  static readonly loginUrl: string = '/login';

  /**
   * Sets from local storage identified by the key {@link localStoragePreviousUrlKey}
   * previously visited url.
   */
  set previousUrl(value: string) {
    localStorage.setItem(RouterExtendedService.localStoragePreviousUrlKey, value);
  }

  /**
   * Gets from local storage identified by the key {@link localStoragePreviousUrlKey}
   * previously visited url.
   */
  get previousUrl(): string {
    return localStorage.getItem(RouterExtendedService.localStoragePreviousUrlKey) ?? RouterExtendedService.homeUrl;
  }

  /**
   * Navigates to the {@link homeUrl} page.
   */
  navigateToHome(): void {
    this.navigateByUrl(RouterExtendedService.homeUrl);
  }

  /**
   * Navigates to sign in page.
   * @param returnUrl Url visited before redirect to {@link loginUrl}.
   */
  navigateToLogin(returnUrl: string): void {
    this.previousUrl = returnUrl;
    this.navigateByUrl(RouterExtendedService.loginUrl);
  }

  /**
   * Navigates to the previously visited url/page.
   */
  navigateToPreviousUrl(): void {
    this.navigateByUrl(this.previousUrl);
  }

  /**
   * Opens up in a new tab a link ({@link url}).
   * @param url The link to open.
   */
  openInNewTab(url: string, features: string = 'norefferer'): void {
    window.open(url, '_blank', features);
  }
}
