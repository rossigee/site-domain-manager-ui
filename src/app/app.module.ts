import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { ErrorInterceptor } from './error.interceptor';
import { ToastsContainer } from './components/toast/toast-container.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { SiteDetailsComponent } from './components/site-details/site-details.component';
import { DomainDetailsComponent } from './components/domain-details/domain-details.component';
import { DomainDetailsRegistrarComponent } from './components/domain-details-registrar/domain-details-registrar.component';
import { DomainDetailsDNSComponent } from './components/domain-details-dns/domain-details-dns.component';
import { LoginComponent } from './components/login/login.component';

import { RegistrarDetailsComponent } from './components/registrar-details/registrar-details.component';
import { HttpErrorHandler } from 'src/app/services/http-error-handler.service';
import { CacheInterceptor } from './services/cache.interceptor';
import { SitesComponent } from './components/sites/sites.component';
import { DomainsComponent } from './components/domains/domains.component';
import { RegistrarsComponent } from './components/registrars/registrars.component';
import { CreateRegistrarComponent } from './components/registrars/create-registrar/create-registrar.component';
import { CreateDomainComponent } from './components/domains/create-domain/create-domain.component';
import { WafComponent } from './components/waf/waf.component';
import { HostingComponent } from './components/hosting/hosting.component';

@NgModule({
  declarations: [
    AppComponent,
    ToastsContainer,
    TopBarComponent,
    SiteDetailsComponent,
    DomainDetailsComponent,
    DomainDetailsRegistrarComponent,
    DomainDetailsDNSComponent,
    LoginComponent,
    RegistrarsComponent,
    RegistrarDetailsComponent,
    ToastsContainer,
    SitesComponent,
    DomainsComponent,
    RegistrarsComponent,
    CreateRegistrarComponent,
    CreateDomainComponent,
    WafComponent,
    HostingComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true },
    CacheInterceptor,
    HttpErrorHandler,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
