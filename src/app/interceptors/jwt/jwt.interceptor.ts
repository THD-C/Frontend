import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from '../../services/user/auth.service';
import { RouterExtendedService } from '../../services/router-extended/router-extended.service';

/**
 * "Man-in-the-middle".
 * It is executed before an actual call to the API.
 * Here we attach additional metadata that will be sent to the api
 * e.g. modified header, body etc.
 * @param req {@link HttpRequest}
 * @param next {@link HttpHandlerFn}
 * @returns A function {@link HttpInterceptorFn} which handles requests to the API.
 */
export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  return handleRequest(req, next);
};

function handleRequest(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const auth = inject(AuthService);
  const router = inject(RouterExtendedService);
  const location = inject(Location);

  if (auth.isTokenExpired) {
    auth.logout();
    router.navigateToLogin(location.toString());
  }

  req = req.clone({
    setHeaders: {
      Authorization: auth.authorizationHeaderValue
    }
  });

  return next(req);
}
