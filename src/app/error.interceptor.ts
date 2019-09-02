import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from './services/authentication.service';
import { ToastService } from './services/toast.service';
import { HttpCacheService } from './services/http-cache.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private authenticationService: AuthenticationService,
    private cache: HttpCacheService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            // Clear http cache storage
            this.cache.flushAll();

            // auto logout if 401 response returned from api
            this.authenticationService.logout();
            location.reload(true);
          }
          return throwError(err);
        }
      })
    );
  }
}
