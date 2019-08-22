import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from './authentication.service';


@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    var token = JSON.parse(localStorage.getItem("token"));
    if (token && token.access_token) {
      // If the token is out-of-date, the 401 should redirect them
      return true;
    }

    this.router.navigate(['/login'], {
      queryParams: {
        returnUrl: state.url
      }
    });
    return false;
  }
}
