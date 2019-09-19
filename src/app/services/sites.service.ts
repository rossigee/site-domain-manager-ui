import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Site, SitesResponse, SiteResponse } from '../models/Site';
import { AuthenticationService } from './authentication.service';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Headers, Loading, HandleError } from '../models/Http';
import { map, catchError } from 'rxjs/operators';
import { HttpErrorHandler } from './http-error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class SitesService {
  private sitesUrl: string;
  private sites$: BehaviorSubject<Site[]>;
  private store: { sites: Site[] };
  private headers: HttpHeaders;
  private currentSiteId: string;
  private handleError: HandleError;
  loading: Loading;

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService,
    private httpErrorHandler: HttpErrorHandler
  ) {
    this.sitesUrl = `${environment.api_url}/sites`;
    this.sites$ = new BehaviorSubject([]) as BehaviorSubject<Site[]>;
    this.store = { sites: [] };
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
    this.handleError = this.httpErrorHandler.createHandleError('sites');
  }

  /**
   * Getter for Sites
   */
  get sites(): Observable<Site[]> {
    return this.sites$.asObservable();
  }

  /**
   * Getter for single Site
   */
  get site(): Observable<Site> {
    return this.sites$.pipe(
      map((sites: Site[]) =>
        sites.find((site: Site) => {
          const condition =
            site && parseInt(this.currentSiteId, 10) === site.id;
          if (condition) {
            this.loading.single = false;
          }
          return condition;
        })
      )
    );
  }

  /**
   * Load site by ID
   *
   * @param id Site ID
   * @param force Force ignore cache
   */
  load(id: string, force: boolean = false): void {
    this.loading.single = true;
    this.currentSiteId = id;
    const headers = !force
      ? this.headers
      : this.headers.set('reset-cache', 'true');
    this.http
      .get<SiteResponse>(this.sitesUrl + '/' + id, { headers })
      .pipe(catchError(this.handleError<SiteResponse>('load')))
      .subscribe({
        next: (res: SiteResponse) => {
          let notFound = true;
          const newSite = res.site;
          this.store.sites.forEach((site: Site, index: number) => {
            if (site.id === newSite.id) {
              this.store.sites[index] = newSite;
              notFound = false;
            }
          });
          if (notFound) {
            this.store.sites.push(newSite);
          }

          this.sites$.next(Object.assign({}, this.store).sites);
          this.loading.single = false;
        },
      });
  }

  /**
   * Load all (filtered by term) sites
   *
   * @param term  Search term
   * @param force Force ignore cache
   */
  loadAll(term: string = '', force: boolean = false): void {
    this.loading.bulk = true;
    const headers = !force
      ? this.headers
      : this.headers.set('reset-cache', 'true');
    const options = {
      headers,
      params: new HttpParams().set('label', term.trim()),
    };

    this.http
      .get<SitesResponse>(this.sitesUrl, options)
      .pipe(catchError(this.handleError<SitesResponse>('loadAll')))
      .subscribe({
        next: (res: SitesResponse) => {
          this.store = res;
          this.sites$.next(Object.assign({}, this.store).sites);
          this.loading.bulk = false;
        },
      });
  }
}
