import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { BehaviorSubject, Observable } from 'rxjs';
import { Domain, DomainsResponse, DomainResponse } from '../models/Domain';
import { Headers, Loading, HandleError } from '../models/Http';
import { AuthenticationService } from './authentication.service';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { HttpErrorHandler } from './http-error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class DomainsService {
  private domainsUrl: string;
  private domains$: BehaviorSubject<Domain[]>;
  private store: DomainsResponse;
  private headers: HttpHeaders;
  private currentDomainId: string;
  private handleError: HandleError;
  loading: Loading;

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService,
    private httpErrorHandler: HttpErrorHandler
  ) {
    this.domainsUrl = `${environment.api_url}/domains`;
    this.domains$ = new BehaviorSubject([]) as BehaviorSubject<Domain[]>;
    this.store = { domains: [] };
    this.headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append(
        'Authorization',
        this.authenticationService.getAuthorizationHeader()
      );
    this.loading = {
      bulk: false,
      single: false,
    };
    this.handleError = this.httpErrorHandler.createHandleError('domains');
  }

  get domains(): Observable<Domain[]> {
    return this.domains$.asObservable();
  }

  get domain(): Observable<Domain> {
    return this.domains$.pipe(
      map((domains: Domain[]) =>
        domains.find((domain: Domain) => {
          const condition =
            domain && parseInt(this.currentDomainId, 10) === domain.id;
          if (condition) {
            this.loading.single = false;
          }
          return condition;
        })
      )
    );
  }

  /**
   * Load domain by ID
   *
   * @param id Domain ID
   * @param force Force ignore cache
   */
  load(id: string, force: boolean = false): void {
    this.loading.single = true;
    this.currentDomainId = id;
    const headers = !force
      ? this.headers
      : this.headers.set('reset-cache', 'true');
    this.http
      .get<DomainResponse>(this.domainsUrl + '/' + id, {
        headers,
      })
      .pipe(catchError(this.handleError<DomainResponse>('load')))
      .subscribe({
        next: (res: DomainResponse) => {
          let notFound = true;
          const newDomain = res.domain;
          this.store.domains.forEach((domain: Domain, index: number) => {
            if (domain.id === newDomain.id) {
              this.store.domains[index] = newDomain;
              notFound = false;
            }
          });
          if (notFound) {
            this.store.domains.push(newDomain);
          }

          this.domains$.next(Object.assign({}, this.store).domains);
          this.loading.single = false;
        },
      });
  }

  /**
   * Load all (filtered by term) domains
   *
   * @param term Search term. Default ''
   * @param force Force ignore cache
   */
  loadAll(term: string = '', force: boolean = false): void {
    this.loading.bulk = true;
    const headers = !force
      ? this.headers
      : this.headers.set('reset-cache', 'true');
    const options = {
      headers,
      params: new HttpParams().set('name', term.trim()),
    };

    this.http
      .get<DomainsResponse>(this.domainsUrl, options)
      .pipe(catchError(this.handleError<DomainsResponse>('loadAll')))
      .subscribe({
        next: (res: DomainsResponse) => {
          this.store = res;
          this.domains$.next(Object.assign({}, this.store).domains);
          this.loading.bulk = false;
        },
      });
  }
}
