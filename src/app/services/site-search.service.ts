import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable, BehaviorSubject } from 'rxjs';

import { Site, SitesResponse } from '../models/Site';

import { environment } from '../../environments/environment';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class SiteSearchService {
  private sitesUrl: string;
  private _sites: BehaviorSubject<Site[]>;
  private store: SitesResponse;

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) {
    this.sitesUrl = `${environment.api_url}/sites`;
    this._sites = <BehaviorSubject<Site[]>>new BehaviorSubject([]);
    this.store = { sites: [] };
  }

  get sites(): Observable<Site[]> {
    return this._sites.asObservable();
  }

  /**
   * Search sites by term
   *
   * @param term string
   */
  searchSites(term: string): void {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: this.authenticationService.getAuthorizationHeader(),
    };
    const options = {
      headers: headers,
      params: new HttpParams().set('label', term.trim()),
    };

    this.http.get<SitesResponse>(this.sitesUrl, options).subscribe({
      next: (res: SitesResponse) => {
        this.store = res;
        this._sites.next(Object.assign({}, this.store).sites);
      },
    });
  }
}
