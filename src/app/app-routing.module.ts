import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { SiteDetailsComponent } from './components/site-details/site-details.component';
import { DomainDetailsComponent } from './components/domain-details/domain-details.component';
import { RegistrarSearchComponent } from './components/registrar-search/registrar-search.component';
import { RegistrarDetailsComponent } from './components/registrar-details/registrar-details.component';
import { AuthGuard } from './guards/auth.guard';
import { SitesComponent } from './components/sites/sites.component';
import { DomainsComponent } from './components/domains/domains.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'sites', component: SitesComponent, canActivate: [AuthGuard] },
  {
    path: 'sites/:siteId',
    component: SiteDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'domains',
    component: DomainsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'domains/:domainId',
    component: DomainDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'registrars',
    component: RegistrarSearchComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'registrars/:registrarId',
    component: RegistrarDetailsComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: 'domains' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
