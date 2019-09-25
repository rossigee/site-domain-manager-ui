import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { HandleError } from '../models/Http';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';
import { HttpErrorHandler } from './http-error-handler.service';
import { Agent, AgentResponse } from '../models/Agent';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AgentsService {
  private agentsUrl: string;
  private registrar$: BehaviorSubject<Agent[]>;
  private dns$: BehaviorSubject<Agent[]>;
  private waf$: BehaviorSubject<Agent[]>;
  private hosting$: BehaviorSubject<Agent[]>;
  private headers: HttpHeaders;
  private handleError: HandleError;
  private store: AgentResponse;
  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService,
    private httpErrorHandler: HttpErrorHandler
  ) {
    this.agentsUrl = `${environment.api_url}/agents`;
    this.registrar$ = new BehaviorSubject([]) as BehaviorSubject<Agent[]>;
    this.dns$ = new BehaviorSubject([]) as BehaviorSubject<Agent[]>;
    this.waf$ = new BehaviorSubject([]) as BehaviorSubject<Agent[]>;
    this.hosting$ = new BehaviorSubject([]) as BehaviorSubject<Agent[]>;
    this.store = { registrar: [], dns: [], waf: [], hosting: [] };
    this.headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append(
        'Authorization',
        this.authenticationService.getAuthorizationHeader()
      );
    this.handleError = this.httpErrorHandler.createHandleError('agents');
  }

  get registrarAgents(): Observable<Agent[]> {
    return this.registrar$.asObservable();
  }

  get dnsAgents(): Observable<Agent[]> {
    return this.dns$.asObservable();
  }

  get wafAgents(): Observable<Agent[]> {
    return this.waf$.asObservable();
  }

  get hostingAgents(): Observable<Agent[]> {
    return this.hosting$.asObservable();
  }

  loadAll(force: boolean = false): void {
    const options = {
      headers: !force ? this.headers : this.headers.set('reset-cache', 'true'),
    };
    this.http
      .get<AgentResponse>(this.agentsUrl, options)
      .pipe(catchError(this.handleError<AgentResponse>('loadAll')))
      .subscribe({
        next: (res: AgentResponse) => {
          this.store = res;
          console.log(res);
          this.registrar$.next(Object.assign({}, this.store).registrar);
          this.dns$.next(Object.assign({}, this.store).dns);
          this.waf$.next(Object.assign({}, this.store).waf);
          this.hosting$.next(Object.assign({}, this.store).hosting);
        },
      });
  }
}
