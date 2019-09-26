import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { BehaviorSubject, Observable } from 'rxjs';
import {
  Domain,
  DomainsResponse,
  DomainResponse,
  DomainUpdateParams,
  DomainStatusCheck,
  DomainStatusChecksResponse
} from '../models/Domain';
import { Loading, HandleError, CRUDLoading } from '../models/Http';
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
  private checks$: BehaviorSubject<DomainStatusCheck>;
  private store: DomainsResponse;
  private store2: DomainStatusChecksResponse;
  private headers: HttpHeaders;
  private currentDomainId: string;
  private handleError: HandleError;
  loading: CRUDLoading;

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService,
    private httpErrorHandler: HttpErrorHandler
  ) {
    this.domainsUrl = `${environment.api_url}/domains`;
    this.domains$ = new BehaviorSubject([]) as BehaviorSubject<Domain[]>;
    this.checks$ = new BehaviorSubject(undefined) as BehaviorSubject<DomainStatusCheck>;
    this.store = { domains: [] };
    this.store2 = { checks: [] };
    this.headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append(
        'Authorization',
        this.authenticationService.getAuthorizationHeader()
      );
    this.loading = {
      bulk: false,
      single: false,
      updating: false,
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

  get checks(): Observable<DomainStatusCheck> {
    return this.checks$.asObservable();
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

  update(data: DomainUpdateParams) {
    this.loading.updating = true;
    this.http
      .post(`${this.domainsUrl}/${this.currentDomainId}`, data, {
        headers: this.headers,
      })
      .pipe(catchError(this.handleError('update')))
      .subscribe({
        next: () => {
          /**
           * TODO: Update local data
           */
          this.loading.updating = false;
          this.load(this.currentDomainId, true);
        },
      });
  }

  _updateCheck(newCheck: DomainStatusCheck): void {
    let notFound = true;
    this.store2.checks.forEach((check: DomainStatusCheck, index: number) => {
      if (check._check_id === newCheck._check_id) {
        this.store2.checks[index] = newCheck;
        notFound = false;
      }
    });
    if (notFound) {
      this.store2.checks.push(newCheck);
    }
  }

  /**
   * Fetch status checks for domain
   *
   * @param id Domain ID
   * @param force Force ignore cache
   */
  statusChecks(id: string, force: boolean = false): void {
    const headers = !force
      ? this.headers
      : this.headers.set('reset-cache', 'true');
    this.http
      .get<DomainStatusChecksResponse>(this.domainsUrl + '/' + id + '/checks', {
        headers: headers,
      })
      .pipe(catchError(this.handleError<DomainStatusChecksResponse>('statusChecks')))
      .subscribe({
        next: (res: DomainStatusChecksResponse) => {
          res.checks.forEach((check: DomainStatusCheck) => {
            this._updateCheck(check);
            this.checks$.next(check);
          });
        },
      });
  }

  /**
   * Trigger check of NS records`
   *
   * @param id Domain ID
   */
  recheckNS(id: string): void {
    this.http
      .get<DomainStatusChecksResponse>(this.domainsUrl + '/' + id + '/check/ns', { headers: this.headers })
      .pipe(catchError(this.handleError<DomainStatusChecksResponse>('statusChecks')))
      .subscribe({
        next: (res: DomainStatusChecksResponse) => {
          res.checks.forEach((check) => {
            this._updateCheck(check);
            this.checks$.next(check);
          });
        },
      });
  }

  /**
   * Trigger check of A records`
   *
   * @param id Domain ID
   */
  recheckA(id: string): void {
    this.http
      .get<DomainStatusChecksResponse>(this.domainsUrl + '/' + id + '/check/a', { headers: this.headers })
      .pipe(catchError(this.handleError<DomainStatusChecksResponse>('statusChecks')))
      .subscribe({
        next: (res: DomainStatusChecksResponse) => {
          res.checks.forEach((check) => {
            this._updateCheck(check);
            this.checks$.next(check);
          });
        },
      });
  }

}
