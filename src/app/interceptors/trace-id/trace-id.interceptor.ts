import { HttpRequest, HttpEvent, HttpInterceptorFn, HttpHandlerFn } from '@angular/common/http';
import { Observable } from 'rxjs';
import { trace } from '@opentelemetry/api';


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
  const tracer = trace.getTracer('default');
  const span = tracer.startSpan('http_request');
  const traceId = span.spanContext().traceId;

  const clonedRequest = req.clone({
    setHeaders: {
      'traceparent': traceId,
    },
  });
  
  return next(clonedRequest).pipe();
}
