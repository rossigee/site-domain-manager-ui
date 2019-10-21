import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Notifier, NotifierResponse } from '../models/Notifier';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { HttpErrorHandler } from './http-error-handler.service';
import { HandleError, Loading } from '../models/Http';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NotifiersService {
  private url: string;
  private notifiers$: BehaviorSubject<Notifier[]>;
  private store: { notifiers: Notifier[] };
  private headers: HttpHeaders;
  private handleError: HandleError;
  public loading: Loading;
  private currentNotifierId: string;

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService,
    private httpErrorHandler: HttpErrorHandler
  ) {
    this.url = `${environment.api_url}/notifiers`;
    this.notifiers$ = new BehaviorSubject([]) as BehaviorSubject<Notifier[]>;
    this.store = { notifiers: [] };
    this.handleError = this.httpErrorHandler.createHandleError('notifiers');
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
  }

  /**
   * Getter for Notifiers
   */
  get notifiers(): Observable<Notifier[]> {
    return this.notifiers$.asObservable();
  }

  /**
   * Getter for single registrar
   */
  get notifier(): Observable<Notifier> {
    return this.notifiers$.pipe(
      map((notifiers: Notifier[]) =>
        notifiers.find((notifier: Notifier) => {
          const condition =
            notifier && parseInt(this.currentNotifierId, 10) === notifier.id;
          if (condition) {
            this.loading.single = false;
          }
          return condition;
        })
      )
    );
  }

  /**
   * Load all notifiers
   *
   * @param force Force ignore HTTP cache, default ''
   */
  loadAll(force: boolean = false): void {
    this.loading.bulk = true;
    const options = {
      headers: !force ? this.headers : this.headers.set('reset-cache', 'true'),
    };

    this.http
      .get<NotifierResponse>(this.url, options)
      .pipe(catchError(this.handleError<NotifierResponse>('loadAll')))
      .subscribe({
        next: (res: NotifierResponse) => {
          this.store.notifiers = res.notifiers;
          this.notifiers$.next(Object.assign({}, this.store).notifiers);
          this.loading.bulk = false;
        },
      });
  }

  /**
   * Load notifier by id
   *
   * @param id Notifier ID
   * @param force Force ignore HTTP cache, default ''
   */
  load(id: string, force: boolean = false): void {
    this.currentNotifierId = id;
    this.loading.single = true;
    const options = {
      headers: !force ? this.headers : this.headers.set('reset-cache', 'true'),
    };

    this.http
      .get<any>(`${this.url}/${this.currentNotifierId}`, options)
      .pipe(catchError(this.handleError<any>('loadAll')))
      .subscribe({
        next: (res: any) => {
          let notFound = true;
          const newNotifier = res.notifier;
          this.store.notifiers.forEach((notifier: any, index: number) => {
            if (notifier.id === newNotifier.id) {
              this.store.notifiers[index] = newNotifier;
              notFound = false;
            }
          });
          if (notFound) {
            this.store.notifiers.push(newNotifier);
          }

          this.notifiers$.next(Object.assign({}, this.store).notifiers);
          this.loading.single = false;
        },
      });
  }
}
