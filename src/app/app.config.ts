import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { JwtModule } from '@auth0/angular-jwt';
import { provideAnimations } from '@angular/platform-browser/animations';

import { SimpleNotificationsModule } from 'angular2-notifications';

import { routes } from './app.routes';
import { jwtInterceptor } from './interceptors/jwt/jwt.interceptor';
import { Currency } from './modules/profile/components/profile/profile-wallets/profile-wallets.config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(
      SimpleNotificationsModule.forRoot(),
      JwtModule.forRoot({}),
      CommonModule,
    ),
    provideHttpClient(
      withInterceptors([jwtInterceptor]),
    ),
    provideAnimations(),
  ],
};

export const appName: string = 'THD(C)';

export const availableLanguages: Language[] = [
  {
    code: 'en',
    name: 'EN',
    isoCode: 'en-US',
  },
  {
    code: 'pl',
    name: "PL",
    isoCode: 'pl-PL',
  },
];

export type Language = {
  code: string;
  name: string;
  isoCode: string;
}

export const defaultCurrency: Currency = {
  code: 'USD',
}

export const supportEmail: string = 'thdc.p.lodz@outlook.com';

export const defaultDate: string = '1970-01-01T00:00:00Z';

export const containerName: string = 'Frontend';
