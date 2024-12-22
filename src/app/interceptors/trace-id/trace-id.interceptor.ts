import { HttpRequest, HttpEvent, HttpInterceptorFn, HttpHandlerFn } from '@angular/common/http';
import { trace } from '@opentelemetry/api';
import { inject } from '@angular/core';

import { Observable } from 'rxjs';

import { serviceName } from '../../app.config';

import { AuthService } from '../../services/auth/auth.service';
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
export const traceIdInterceptor: HttpInterceptorFn = (req, next) => {
  return handleRequest(req, next);
};

function handleRequest(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const auth = inject(AuthService);
  const router = inject(RouterExtendedService);

  const tracer = trace.getTracer(serviceName);
  const span = tracer.startSpan(`${req.method} ${req.url}`);

  // Removing reference
  let clearedReqBody = JSON.parse(JSON.stringify(req.body));

  // Clearing body from sensitive data
  if (clearedReqBody?.hasOwnProperty('password')) {
    clearedReqBody = delete (clearedReqBody as any).password;
  }

  span.setAttributes({
    body: JSON.stringify(clearedReqBody),
    params: req.urlWithParams,
    user: JSON.stringify({
      email: auth.session?.email,
      username: auth.session?.username,
    }),
    page: router.url,
  });

  const { traceId, spanId } = span.spanContext();

  const clonedRequest = req.clone({
    setHeaders: {
      traceparent: `00-${traceId}-${spanId}-01`,
    },
  });

  span.end();
  
  return next(clonedRequest);
}
