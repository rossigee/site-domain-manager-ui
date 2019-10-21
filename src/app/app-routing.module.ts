import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { SiteDetailsComponent } from './components/site-details/site-details.component';
import { DomainDetailsComponent } from './components/domain-details/domain-details.component';

import { RegistrarDetailsComponent } from './components/registrar-details/registrar-details.component';
import { AuthGuard } from './guards/auth.guard';
import { SitesComponent } from './components/sites/sites.component';
import { DomainsComponent } from './components/domains/domains.component';
import { RegistrarsComponent } from './components/registrars/registrars.component';
import { WafComponent } from './components/waf/waf.component';
import { DnsComponent } from './components/dns/dns.component';
import { DnsDetailsComponent } from './components/dns-details/dns-details.component';
import { NotifiersComponent } from './components/notifiers/notifiers.component';
import { NotifierDetailsComponent } from './components/notifier-details/notifier-details.component';

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
    component: RegistrarsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'registrars/:registrarId',
    component: RegistrarDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'waf',
    component: WafComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'dns',
    component: DnsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'dns/:dnsId',
    component: DnsDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'notifiers',
    component: NotifiersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'notifiers/:notifierId',
    component: NotifierDetailsComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: 'domains' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
