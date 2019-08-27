import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models/User';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public getAuthorizationHeader(): string {
    var token = JSON.parse(localStorage.getItem('token'));
    return `Bearer ${token.access_token}`;
  }

  login(username: string, password: string) {
    const body = new HttpParams()
      .set('username', username)
      .set('password', password)
      .set('grant_type', 'password');

    return this.http
      .post<any>(`${environment.api_url}/token`, body.toString(), {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      })
      .pipe(
        map(token => {
          if (token && token.access_token) {
            localStorage.setItem('token', JSON.stringify(token));
            //this.currentUserSubject.next(user);
          }
          return token;
        })
      );
  }

  logout() {
    // remove token from local storage to log user out
    localStorage.removeItem('token');
    //this.currentUserSubject.next(null);
  }
}
