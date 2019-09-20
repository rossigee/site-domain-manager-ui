import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { DomainDNSStatus, DomainDNSStatusResponse } from '../models/Domain';

import { environment } from '../../environments/environment';
import { HandleError, Loading, Headers } from '../models/Http';
import { HttpErrorHandler } from './http-error-handler.service';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class DomainDetailsDNSService {
  private dnsUrl: string;
  private handleError: HandleError;
  private status$: BehaviorSubject<DomainDNSStatus>;
  private store: { status: DomainDNSStatus };
  private headers: HttpHeaders;
  loading: Loading;

  constructor(
    private http: HttpClient,
    private httpErrorHandler: HttpErrorHandler,
    private authenticationService: AuthenticationService
  ) {
    this.dnsUrl = `${environment.api_url}/dns_providers`;
    this.status$ = new BehaviorSubject({}) as BehaviorSubject<DomainDNSStatus>;
    this.store = { status: {} as DomainDNSStatus };
    this.loading = {
      single: false,
      bulk: false,
    };
    this.headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append(
        'Authorization',
        this.authenticationService.getAuthorizationHeader()
      );
    this.handleError = this.httpErrorHandler.createHandleError(
      'DomainDetailsDNS'
    );
  }

  get status(): Observable<DomainDNSStatus> {
    return this.status$.asObservable();
  }

  /**
   * Load dns status for given domain
   *
   * @param providerId Provider ID
   * @param domain Domain name
   * @param force Force ignore cache
   */
  loadStatus(providerId: string, domain: string, force: boolean = false): void {
    this.loading.single = true;
    const options = {
      headers: force ? this.headers.set('reset-cache', 'true') : this.headers,
    };

    this.http
      .get<DomainDNSStatusResponse>(
        `${this.dnsUrl}/${providerId}/domains/${domain}/status`,
        options
      )
      .pipe(
        catchError(
          this.handleError<DomainDNSStatusResponse>(
            'getDomainDNSStatusForDomain'
          )
        )
      )
      .subscribe({
        next: (res: DomainDNSStatusResponse) => {
          const { status } = res;
          this.store.status = status;
          this.status$.next(Object.assign({}, this.store).status);
          this.loading.single = false;
        },
      });
  }
}
