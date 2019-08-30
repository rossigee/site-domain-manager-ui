import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { ToastService } from './toast.service';

/** Handles HttpClient errors */
@Injectable()
export class HttpErrorHandler {
  constructor(private toastService: ToastService) {}

  /** Create curried handleError function that already knows the service name */
  createHandleError = (serviceName = '') => <T>(
    operation = 'operation',
    result = {} as T
  ) => this.handleError(serviceName, operation, result);

  /**
   * Returns a function that handles Http operation failures.
   * This error handler lets the app continue to run as if no error occurred.
   * @param serviceName = name of the data service that attempted the operation
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  handleError<T>(serviceName = '', operation = 'operation', result = {} as T) {
    return (error: HttpErrorResponse): Observable<T> => {
      // TODO: Create and log error tech details, maybe in backend?

      // Tell user via a pop-up error message
      this.toastService.error(
        `Operation ${operation} for ${serviceName}.service failed. Server responded with status code ${error.status}`
      );

      // Let the app keep running by returning a safe result.
      return of(result);
    };
  }
}
