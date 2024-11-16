import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';

import { SimpleNotificationsModule } from 'angular2-notifications';

import { routes } from './app.routes';
import { jwtInterceptor } from './interceptors/jwt/jwt.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(
      SimpleNotificationsModule.forRoot(),
      JwtModule.forRoot({}),
    ),
    provideHttpClient(
      withInterceptors([jwtInterceptor]),
    ),
    provideAnimations(),
  ],
};

export const appName: string = 'THD(C)';
