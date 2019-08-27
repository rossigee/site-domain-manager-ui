import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Domain } from '../models/Domain';

import { environment } from '../../environments/environment';
import { HandleError } from '../models/Http';
import { HttpErrorHandler } from './http-error-handler.service';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class DomainDetailsService {
  domainsUrl = `${environment.api_url}/domains`;
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler,
    private authenticationService: AuthenticationService
  ) {
    this.handleError = httpErrorHandler.createHandleError(
      'DomainDetailsService'
    );
  }

  /* GET domain by id */
  getDomain(id: string): Observable<Domain> {
    var headers = {
      'Content-Type': 'application/json',
      Authorization: this.authenticationService.getAuthorizationHeader(),
    };
    var options = {
      headers: headers,
    };

    return this.http
      .get<Domain>(this.domainsUrl + '/' + id, options)
      .pipe(catchError(this.handleError<Domain>('getDomain')));
  }
}
