import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Site } from '../models/Site';

import { environment } from '../../environments/environment';
import { HandleError } from '../models/Http';
import { HttpErrorHandler } from './http-error-handler.service';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class SiteSearchService {
  sitesUrl = `${environment.api_url}/sites`;
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler,
    private authenticationService: AuthenticationService
  ) {
    this.handleError = httpErrorHandler.createHandleError('SiteSearchService');
  }

  /* GET sites whose name contains search term */
  searchSites(term: string): Observable<Site[]> {
    var headers = {
      'Content-Type': 'application/json',
      Authorization: this.authenticationService.getAuthorizationHeader(),
    };
    var options = {
      headers: headers,
      params: new HttpParams().set('label', term.trim()),
    };
    return this.http
      .get<Site[]>(this.sitesUrl, options)
      .pipe(catchError(this.handleError<Site[]>('searchSites', [])));
  }
}
