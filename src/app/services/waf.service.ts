import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { HandleError, Loading } from '../models/Http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Waf, WafResponse } from '../models/Waf';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';
import { HttpErrorHandler } from './http-error-handler.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WafService {
  private wafUrl: string;
  private headers: HttpHeaders;
  private handleError: HandleError;
  private waf$: BehaviorSubject<Waf[]>;
  private store: { waf_providers: Waf[] };
  private currentWafId: string;
  loading: Loading;
  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService,
    private httpErrorHandler: HttpErrorHandler
  ) {
    this.wafUrl = `${environment.api_url}/waf`;
    this.handleError = this.httpErrorHandler.createHandleError('waf');
    this.headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append(
        'Authorization',
        this.authenticationService.getAuthorizationHeader()
      );
    this.waf$ = new BehaviorSubject([]) as BehaviorSubject<Waf[]>;
    this.store = { waf_providers: [] };
    this.loading = { single: false, bulk: false };
  }

  get waf(): Observable<Waf[]> {
    return this.waf$.asObservable();
  }

  loadAll(force: boolean = false) {
    this.loading.bulk = true;
    const headers = !force
      ? this.headers
      : this.headers.set('reset-cache', 'true');
    const options = {
      headers,
    };
    this.http
      .get<WafResponse>(this.wafUrl, options)
      .pipe(catchError(this.handleError<WafResponse>('loadAll')))
      .subscribe({
        next: (res: WafResponse) => {
          this.store = res;
          this.waf$.next(Object.assign({}, this.store).waf_providers);
          this.loading.bulk = false;
        },
      });
  }
}
