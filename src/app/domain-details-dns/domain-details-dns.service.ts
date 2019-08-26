import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { DomainDNSStatus } from '../domain';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';

import { AuthenticationService } from '../authentication.service';

import { environment } from '../../environments/environment';

@Injectable()
export class DomainDetailsDNSService {
  dnsUrl = `${environment.api_url}/dns_providers`;
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler,
    private authenticationService: AuthenticationService
  ) {
    this.handleError = httpErrorHandler.createHandleError('DomainDetailsDNSService');
  }

  /* GET dns status for domain */
  public getDomainDNSStatusForDomain(dns_provider_id: string, domainname: string): Observable<DomainDNSStatus> {
    var headers = {
      'Content-Type': 'application/json',
      'Authorization': this.authenticationService.getAuthorizationHeader()
    }
    var options = {
      'headers': headers,
    };

    return this.http.get<DomainDNSStatus>(`${this.dnsUrl}/${dns_provider_id}/domains/${domainname}/status`, options)
      .pipe(
        catchError(this.handleError<DomainDNSStatus>('getDomainDNSStatusForDomain'))
      );
  }
}
