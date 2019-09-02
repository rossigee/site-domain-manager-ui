import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { User } from './models/User';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'sdmgr-ui';

  currentUser: User;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(
      x => (this.currentUser = x)
    );
  }

  get topBar(): boolean {
    return !this.router.url.includes('login');
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
