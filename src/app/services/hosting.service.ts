import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { HandleError, Loading } from '../models/Http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Hosting, HostingResponse } from '../models/Hosting';
import { HttpErrorHandler } from './http-error-handler.service';
import { AuthenticationService } from './authentication.service';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HostingService {
  private hostingUrl: string;
  private headers: HttpHeaders;
  private handleError: HandleError;
  private hosting$: BehaviorSubject<Hosting[]>;
  private store: { hosting_providers: Hosting[] };
  private currentHosting: string;
  loading: Loading;

  constructor(
    private http: HttpClient,
    private httpErrorHandler: HttpErrorHandler,
    private authenticationService: AuthenticationService
  ) {
    this.hostingUrl = `${environment.api_url}/hosting`;
    this.handleError = this.httpErrorHandler.createHandleError('hosting');
    this.headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append(
        'Authorization',
        this.authenticationService.getAuthorizationHeader()
      );
    this.hosting$ = new BehaviorSubject([]) as BehaviorSubject<Hosting[]>;
    this.store = {
      hosting_providers: [],
    };
    this.loading = { single: false, bulk: false };
  }

  get hostings(): Observable<Hosting[]> {
    return this.hosting$.asObservable();
  }

  get hosting(): Observable<Hosting> {
    return this.hosting$.pipe(
      map((hostings: Hosting[]) =>
        hostings.find((hosting: Hosting) => {
          const condition =
            hosting && this.currentHosting === hosting.id.toString();
          if (condition) {
            this.loading.single = false;
          }
          return condition;
        })
      )
    );
  }

  loadAll(force: boolean = false, currentHosting: string | null = null) {
    if (!isNaN(parseInt(currentHosting, 10))) {
      this.currentHosting = currentHosting;
    }
    this.loading.bulk = true;
    const headers = !force
      ? this.headers
      : this.headers.set('reset-cache', 'true');
    const options = {
      headers,
    };
    this.http
      .get<HostingResponse>(this.hostingUrl, options)
      .pipe(catchError(this.handleError<HostingResponse>('loadAll')))
      .subscribe({
        next: (res: HostingResponse) => {
          this.store = res;
          this.hosting$.next(Object.assign({}, this.store).hosting_providers);
          this.loading.bulk = false;
        },
      });
  }

  refresh(id: string): void {
    const headers = this.headers.set('reset-cache', 'true');
    const options = {
      headers,
    };
    this.loading.single = true;
    this.http
      .get(`${this.hostingUrl}/${id}`, options)
      .pipe(catchError(this.handleError<any>('refresh')))
      .subscribe({
        next: (res: any) => {
          this.loading.single = false;
        },
      });
  }
}
