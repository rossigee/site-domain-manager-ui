import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { BehaviorSubject, Observable } from 'rxjs';
import { Domain, DomainsResponse, DomainResponse } from '../models/Domain';
import { Headers, Loading, HandleError } from '../models/Http';
import { AuthenticationService } from './authentication.service';
import { HttpParams, HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { HttpErrorHandler } from './http-error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class DomainsService {
  private domainsUrl: string;
  private _domains: BehaviorSubject<Domain[]>;
  private store: DomainsResponse;
  private headers: Headers;
  private currentDomainId: string;
  private handleError: HandleError;
  loading: Loading;

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService,
    private httpErrorHandler: HttpErrorHandler
  ) {
    this.domainsUrl = `${environment.api_url}/domains`;
    this._domains = <BehaviorSubject<Domain[]>>new BehaviorSubject([]);
    this.store = { domains: [] };
    this.headers = {
      'Content-Type': 'application/json',
      Authorization: this.authenticationService.getAuthorizationHeader(),
    };
    this.loading = {
      bulk: false,
      single: false,
    };
    this.handleError = httpErrorHandler.createHandleError('domains');
  }

  get domains(): Observable<Domain[]> {
    return this._domains.asObservable();
  }

  get domain(): Observable<Domain> {
    this.loading.single = true;
    return this._domains.pipe(
      map((domains: Domain[]) =>
        domains.find((domain: Domain) => {
          const condition =
            domain && parseInt(this.currentDomainId) === domain.id;
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
   * @param id number
   */
  load(id: string): void {
    this.loading.single = true;
    this.currentDomainId = id;
    this.http
      .get<DomainResponse>(this.domainsUrl + '/' + id, {
        headers: this.headers,
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

          this._domains.next(Object.assign({}, this.store).domains);
          this.loading.single = false;
        },
      });
  }

  /**
   * Load all (filtered by term) domains
   *
   * @param term string default ''
   */
  loadAll(term: string = ''): void {
    this.loading.bulk = true;
    const options = {
      headers: this.headers,
      params: new HttpParams().set('name', term.trim()),
    };

    this.http
      .get<DomainsResponse>(this.domainsUrl, options)
      .pipe(catchError(this.handleError<DomainsResponse>('loadAll')))
      .subscribe({
        next: (res: DomainsResponse) => {
          this.store = res;
          this._domains.next(Object.assign({}, this.store).domains);
          this.loading.bulk = false;
        },
      });
  }
}
