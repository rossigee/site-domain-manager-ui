import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SiteSearchComponent } from './site-search/site-search.component';
import { SiteDetailsComponent } from './site-details/site-details.component';
import { DomainSearchComponent } from './domain-search/domain-search.component';
import { DomainDetailsComponent } from './domain-details/domain-details.component';
import { RegistrarSearchComponent } from './registrar-search/registrar-search.component';
import { RegistrarDetailsComponent } from './registrar-details/registrar-details.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'sites', component: SiteSearchComponent, canActivate: [AuthGuard] },
  { path: 'sites/:siteId', component: SiteDetailsComponent, canActivate: [AuthGuard] },
  { path: 'domains', component: DomainSearchComponent, canActivate: [AuthGuard] },
  { path: 'domains/:domainId', component: DomainDetailsComponent, canActivate: [AuthGuard] },
  { path: 'registrars', component: RegistrarSearchComponent, canActivate: [AuthGuard] },
  { path: 'registrars/:registrarId', component: RegistrarDetailsComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'domains'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
