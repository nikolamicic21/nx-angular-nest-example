import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { OktaAuth } from '@okta/okta-auth-js';
import { Observable } from 'rxjs';
import { OKTA_AUTH } from '@okta/okta-angular';
import { Inject, Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(this.addAuthHeaderToAllowedOrigins(request));
  }

  private addAuthHeaderToAllowedOrigins(
    request: HttpRequest<unknown>
  ): HttpRequest<unknown> {
    let req = request;
    const allowedOrigins = ['http://localhost:3333/api/admin'];
    if (!!allowedOrigins.find((origin) => request.url.includes(origin))) {
      const authToken = this.oktaAuth.getAccessToken();
      req = request.clone({
        setHeaders: { Authorization: `Bearer ${authToken}` },
      });
    }

    return req;
  }
}
