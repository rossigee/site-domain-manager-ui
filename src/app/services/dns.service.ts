import { Injectable } from '@angular/core';

import { AuthenticationService } from './authentication.service';
import { HttpErrorHandler } from './http-error-handler.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { HandleError, Loading } from '../models/Http';
import { environment } from 'src/environments/environment';
import { Dns, DnsResponse } from '../models/Dns';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DnsService {
  private dnsUrl: string;
  private headers: HttpHeaders;
  private handleError: HandleError;
  private dns$: BehaviorSubject<Dns[]>;
  private store: { dns_providers: Dns[] };
  loading: Loading;
  currentProviderId: string;

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService,
    private httpErrorHandler: HttpErrorHandler
  ) {
    this.dnsUrl = `${environment.api_url}/dns_providers`;
    this.handleError = this.httpErrorHandler.createHandleError('dns');
    this.headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append(
        'Authorization',
        this.authenticationService.getAuthorizationHeader()
      );
    this.dns$ = new BehaviorSubject([]) as BehaviorSubject<Dns[]>;
    this.store = {
      dns_providers: [],
    };
    this.loading = {
      single: false,
      bulk: false,
    };
  }

  /**
   * Getter for Dns
   */
  get providers(): Observable<Dns[]> {
    return this.dns$.asObservable();
  }

  /**
   * Getter for Dns
   */
  get provider(): Observable<Dns> {
    return this.dns$.pipe(
      map((providers: Dns[]) =>
        providers.find((provider: Dns) => {
          const condition =
            provider && this.currentProviderId === provider.id.toString();
          if (condition) {
            this.loading.single = false;
          }
          return condition;
        })
      )
    );
  }

  /**
   * Load DNS providers list
   *
   * @param force Ignore HTTP cache
   */
  loadProviders(force: boolean = false): void {
    this.loading.bulk = true;
    const headers = !force
      ? this.headers
      : this.headers.set('reset-cache', 'true');
    const options = {
      headers,
    };
    this.http
      .get<DnsResponse>(this.dnsUrl, options)
      .pipe(catchError(this.handleError<DnsResponse>('loadProviders')))
      .subscribe({
        next: (res: DnsResponse) => {
          this.store = res;
          this.dns$.next(Object.assign({}, this.store).dns_providers);
          this.loading.bulk = false;
        },
      });
  }

  /**
   * Load single provider
   *
   * @param id Provider ID
   * @param force Ignore HTTP cache
   */
  loadProvider(id: string, force: boolean = false) {
    this.currentProviderId = id;
    this.loading.single = true;
    const headers = !force
      ? this.headers
      : this.headers.set('reset-cache', 'true');
    this.http
      .get<Dns>(this.dnsUrl + '/' + id, {
        headers,
      })
      .pipe(catchError(this.handleError<Dns>('load')))
      .subscribe({
        next: (res: Dns) => {
          let notFound = true;
          const newDns = res;
          this.store.dns_providers.forEach((dns: Dns, index: number) => {
            if (dns.id === newDns.id) {
              this.store.dns_providers[index] = newDns;
              notFound = false;
            }
          });
          if (notFound) {
            this.store.dns_providers.push(newDns);
          }

          this.dns$.next(Object.assign({}, this.store).dns_providers);
          this.loading.single = false;
        },
      });
  }
}
