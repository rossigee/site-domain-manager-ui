import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = JSON.parse(localStorage.getItem('token'));
    if (token && token.access_token) {
      // If the token is out-of-date, the 401 should redirect them
      return true;
    }

    this.router.navigate(['/login'], {
      queryParams: {
        returnUrl: state.url,
      },
    });
    return false;
  }
}
