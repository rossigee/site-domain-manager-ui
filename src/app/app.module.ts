import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HttpErrorHandler } from './http-error-handler.service';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ToastsContainer } from './toast/toast-container.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { SiteSearchComponent } from './site-search/site-search.component';
import { SiteDetailsComponent } from './site-details/site-details.component';
import { DomainSearchComponent } from './domain-search/domain-search.component';
import { DomainDetailsComponent } from './domain-details/domain-details.component';
import { DomainDetailsRegistrarComponent } from './domain-details-registrar/domain-details-registrar.component';
import { LoginComponent } from './login/login.component';

import { ErrorInterceptor } from './error.interceptor';
import { RegistrarSearchComponent } from './registrar-search/registrar-search.component';
import { RegistrarDetailsComponent } from './registrar-details/registrar-details.component';


@NgModule({
  declarations: [
    AppComponent,
    ToastsContainer,
    TopBarComponent,
    SiteSearchComponent,
    SiteDetailsComponent,
    DomainSearchComponent,
    DomainDetailsComponent,
    DomainDetailsRegistrarComponent,
    LoginComponent,
    RegistrarSearchComponent,
    RegistrarDetailsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    HttpErrorHandler,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
