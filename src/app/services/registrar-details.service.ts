import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Registrar } from '../models/Registrar';

import { environment } from '../../environments/environment';
import { HandleError } from '../models/Http';
import { HttpErrorHandler } from './http-error-handler.service';
import { AuthenticationService } from './authentication.service';

interface PostResponse {
  status: string;
  records_read: number;
}

@Injectable()
export class RegistrarDetailsService {
  registrarsUrl = `${environment.api_url}/registrars`;
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler,
    private authenticationService: AuthenticationService
  ) {
    this.handleError = httpErrorHandler.createHandleError(
      'RegistrarDetailsService'
    );
  }

  /* GET registrar by id */
  getRegistrar(id: string): Observable<Registrar> {
    var headers = {
      'Content-Type': 'application/json',
      Authorization: this.authenticationService.getAuthorizationHeader(),
    };
    var options = {
      headers: headers,
    };

    return this.http
      .get<Registrar>(this.registrarsUrl + '/' + id, options)
      .pipe(catchError(this.handleError<Registrar>('getRegistrar')));
  }

  /* POST csvfile for registrar by id */
  postCSVFile(id: string, fileToUpload: File): Observable<PostResponse> {
    var headers = {
      Authorization: this.authenticationService.getAuthorizationHeader(),
    };
    var options = {
      headers: headers,
    };

    const endpoint = this.registrarsUrl + '/' + id + '/csvfile';
    const formData: FormData = new FormData();
    formData.append('csvfile', fileToUpload, fileToUpload.name);
    return this.http.post<PostResponse>(endpoint, formData, options).pipe(
      map(res => {
        console.log(res);
        if (res.status == 'ok') return res;
      }),
      catchError(this.handleError<PostResponse>('postCSVFile'))
    );
  }

  /* POST jsonfile for registrar by id */
  postJSONFile(id: string, fileToUpload: File): Observable<PostResponse> {
    var headers = {
      Authorization: this.authenticationService.getAuthorizationHeader(),
    };
    var options = {
      headers: headers,
    };

    const endpoint = this.registrarsUrl + '/' + id + '/jsonfile';
    const formData: FormData = new FormData();
    formData.append('jsonfile', fileToUpload, fileToUpload.name);
    return this.http.post<PostResponse>(endpoint, formData, options).pipe(
      map(res => {
        console.log(res);
        if (res.status == 'ok') return res;
      }),
      catchError(this.handleError<PostResponse>('postJSONFile'))
    );
  }

  /* GET refresh by API for registrar by id */
  refreshFromAPI(id: string): Observable<PostResponse> {
    var headers = {
      Authorization: this.authenticationService.getAuthorizationHeader(),
    };
    var options = {
      headers: headers,
    };

    const endpoint = this.registrarsUrl + '/' + id + '/refresh';
    return this.http.get<PostResponse>(endpoint, options).pipe(
      map(res => {
        console.log(res);
        if (res.status == 'ok') return res;
      }),
      catchError(this.handleError<PostResponse>('refreshFromAPI'))
    );
  }
}
