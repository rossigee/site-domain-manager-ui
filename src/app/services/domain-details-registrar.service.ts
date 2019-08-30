import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';

import {
  DomainRegistrarStatus,
  DomainRegistrarStatusResponse,
} from '../models/Domain';

import { environment } from '../../environments/environment';
import { HandleError, Loading, Headers } from '../models/Http';
import { HttpErrorHandler } from './http-error-handler.service';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class DomainDetailsRegistrarService {
  private registrarsUrl: string;
  private _status: BehaviorSubject<DomainRegistrarStatus>;
  private store: { status: DomainRegistrarStatus };
  private headers: Headers;
  private handleError: HandleError;
  loading: Loading;

  constructor(
    private http: HttpClient,
    private httpErrorHandler: HttpErrorHandler,
    private authenticationService: AuthenticationService
  ) {
    this.registrarsUrl = `${environment.api_url}/registrars`;
    this.headers = {
      'Content-Type': 'application/json',
      Authorization: this.authenticationService.getAuthorizationHeader(),
    };
    this.handleError = this.httpErrorHandler.createHandleError(
      'DomainDetailsRegistrar'
    );
    this.loading = {
      single: false,
      bulk: false,
    };
    this._status = <BehaviorSubject<DomainRegistrarStatus>>(
      new BehaviorSubject({})
    );
    this.store = { status: {} as DomainRegistrarStatus };
  }

  /**
   * Get status from store
   */
  get status(): Observable<DomainRegistrarStatus> {
    return this._status.asObservable();
  }

  /**
   * Load status for domain registrar
   *
   * @param registrar_id string Registrar ID
   * @param domainname string Domain name
   */
  loadStatus(registrarId: string, domain: string) {
    this.loading.single = true;
    const options = {
      headers: this.headers,
    };

    this.http
      .get<DomainRegistrarStatusResponse>(
        `${this.registrarsUrl}/${registrarId}/domains/${domain}/status`,
        options
      )
      .pipe(
        catchError(
          this.handleError<DomainRegistrarStatusResponse>('loadStatus')
        )
      )
      .subscribe({
        next: (res: DomainRegistrarStatusResponse) => {
          const { status } = res;
          this.store.status = status;
          this._status.next(Object.assign({}, this.store).status);
          this.loading.single = false;
        },
      });
  }
}
