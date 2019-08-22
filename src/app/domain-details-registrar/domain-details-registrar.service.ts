import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { DomainRegistrarStatus } from '../domain';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';

import { AuthenticationService } from '../authentication.service';

import { environment } from '../../environments/environment';

@Injectable()
export class DomainDetailsRegistrarService {
  registrarsUrl = `${environment.api_url}/registrars`;
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler,
    private authenticationService: AuthenticationService
  ) {
    this.handleError = httpErrorHandler.createHandleError('DomainDetailsRegistrarService');
  }

  /* GET registrar status for domain */
  public getDomainRegistrarStatusForDomain(registrar_id: string, domainname: string): Observable<DomainRegistrarStatus> {
    var headers = {
      'Content-Type': 'application/json',
      'Authorization': this.authenticationService.getAuthorizationHeader()
    }
    var options = {
      'headers': headers,
    };

    return this.http.get<DomainRegistrarStatus>(`${this.registrarsUrl}/${registrar_id}/domains/${domainname}/status`, options)
      .pipe(
        catchError(this.handleError<DomainRegistrarStatus>('getRegetRegistrarStatusForDomain'))
      );
  }
}
