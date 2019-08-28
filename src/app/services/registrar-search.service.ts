import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Registrar } from '../models/Registrar';

import { environment } from '../../environments/environment';
import { HandleError } from '../models/Http';
import { HttpErrorHandler } from './http-error-handler.service';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class RegistrarSearchService {
  registrarsUrl = `${environment.api_url}/registrars`;
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler,
    private authenticationService: AuthenticationService
  ) {
    this.handleError = httpErrorHandler.createHandleError(
      'RegistrarSearchService'
    );
  }

  /* GET registrars whose name contains search term */
  searchRegistrars(term: string): Observable<Registrar[]> {
    var headers = {
      'Content-Type': 'application/json',
      Authorization: this.authenticationService.getAuthorizationHeader(),
    };
    var options = {
      headers: headers,
      params: new HttpParams().set('label', term.trim()),
    };
    return this.http
      .get<Registrar[]>(this.registrarsUrl, options)
      .pipe(catchError(this.handleError<Registrar[]>('searchRegistrars', [])));
  }
}
