import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  Registrar,
  RegistrarsResponse,
  PostResponse,
} from '../models/Registrar';
import { Headers, HandleError, Loading } from '../models/Http';

import { AuthenticationService } from './authentication.service';
import { environment } from 'src/environments/environment';
import { HttpErrorHandler } from './http-error-handler.service';
import { map, catchError } from 'rxjs/operators';
import { HttpParams, HttpClient } from '@angular/common/http';
import { ToastService } from './toast.service';
import { HttpCacheService } from './http-cache.service';

@Injectable({
  providedIn: 'root',
})
export class RegistrarsService {
  private registrarsUrl: string;
  private _registrars: BehaviorSubject<Registrar[]>;
  private store: { registrars: Registrar[] };
  private headers: Headers;
  private handleError: HandleError;
  private currentRegistrarId: string;
  handlingState: {
    refreshing: boolean;
    uploading: boolean;
  };
  loading: Loading;

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService,
    private httpErrorHandler: HttpErrorHandler,
    private cache: HttpCacheService,
    private toastService: ToastService
  ) {
    this.registrarsUrl = `${environment.api_url}/registrars`;
    this.handleError = this.httpErrorHandler.createHandleError('registrars');
    this._registrars = <BehaviorSubject<Registrar[]>>new BehaviorSubject([]);
    this.store = { registrars: [] };
    this.headers = {
      'Content-Type': 'application/json',
      Authorization: this.authenticationService.getAuthorizationHeader(),
    };
    this.loading = {
      bulk: false,
      single: false,
    };
    this.handlingState = {
      refreshing: false,
      uploading: false,
    };
  }

  /**
   * Getter for Registrars
   */
  get registrars(): Observable<Registrar[]> {
    return this._registrars.asObservable();
  }

  /**
   * Getter for single registrar
   */
  get registrar(): Observable<Registrar> {
    this.loading.single = true;
    return this._registrars.pipe(
      map((registrars: Registrar[]) =>
        registrars.find((registrar: Registrar) => {
          const condition =
            registrar && parseInt(this.currentRegistrarId) === registrar.id;
          if (condition) {
            this.loading.single = false;
          }
          return condition;
        })
      )
    );
  }

  /**
   * Load all (filtered by term) registrars
   *
   * @param term string default ''
   */
  loadAll(term: string = ''): void {
    this.loading.bulk = true;
    const options = {
      headers: this.headers,
      params: new HttpParams().set('label', term.trim()),
    };

    this.http
      .get<RegistrarsResponse>(this.registrarsUrl, options)
      .pipe(catchError(this.handleError<RegistrarsResponse>('loadAll')))
      .subscribe({
        next: (res: RegistrarsResponse) => {
          this.store = res;
          this._registrars.next(Object.assign({}, this.store).registrars);
          this.loading.bulk = false;
        },
      });
  }

  /**
   * Load registrar by ID
   *
   * @param {string} id Registrar ID
   */
  load(id: string): void {
    const url = this.registrarsUrl + '/' + id;
    this.loading.single = true;
    this.currentRegistrarId = id;
    this.http
      .get<Registrar>(url, { headers: this.headers })
      .pipe(catchError(this.handleError<Registrar>('load')))
      .subscribe({
        next: (res: Registrar) => {
          let notFound = true;
          this.store.registrars.forEach(
            (registrar: Registrar, index: number) => {
              if (registrar.id === res.id) {
                this.store.registrars[index] = res;
                notFound = false;
              }
            }
          );
          if (notFound) {
            this.store.registrars.push(res);
          }

          this._registrars.next(Object.assign({}, this.store).registrars);
          this.loading.single = false;
        },
      });
  }

  /**
   * Clear cache and get data for registrar. If no param passed will clear entire cache
   *
   * @param {string} id Registrar ID.
   */
  refresh(id: string = ''): void {
    const entity = `${this.registrarsUrl}${id ? `/${id}` : ''}`;
    this.cache.flush(entity);
    id ? this.load(id) : this.loadAll();
  }

  /**
   * Upload file to backend
   *
   * @param {File} file File to upload
   * @param {string} type File type to upload
   */
  uploadFile(file: File, type: string) {
    this.handlingState.uploading = true;
    const headers = Object.assign({}, this.headers);
    delete headers['Content-Type'];
    const endpoint = `${this.registrarsUrl}/${this.currentRegistrarId}/${type}`;
    const formData: FormData = new FormData();

    formData.append(type, file, file.name);
    this.http
      .post<PostResponse>(endpoint, formData, { headers })
      .pipe(catchError(this.handleError<PostResponse>('uploadFile')))
      .subscribe({
        next: (res: PostResponse) => {
          if (res.status == 'ok') {
            this.toastService.notice(
              `Upload successful. ${res.records_read} records processed.`
            );
          }
          this.handlingState.uploading = false;
          this.refresh(this.currentRegistrarId);
        },
      });
  }

  /**
   * GET refresh by API for registrar by id
   *
   * @param {string} id Registrar ID
   */
  refreshFromAPI(): void {
    const headers = Object.assign({}, this.headers);
    delete headers['Content-Type'];

    const endpoint = `${this.registrarsUrl}/${this.currentRegistrarId}/refresh`;
    this.cache.flush(endpoint);
    this.http.get<PostResponse>(endpoint, { headers }).pipe(
      map(res => {
        if (res.status == 'ok') {
          this.toastService.notice(
            `Refresh successful. ${res.records_read} records updated.`
          );
        }
        this.refresh(this.currentRegistrarId);
      }),
      catchError(this.handleError<PostResponse>('refreshFromAPI'))
    );
  }
}
