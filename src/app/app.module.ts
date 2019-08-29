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
import { SiteSearchComponent } from './components/site-search/site-search.component';
import { SiteDetailsComponent } from './components/site-details/site-details.component';
import { DomainSearchComponent } from './components/domain-search/domain-search.component';
import { DomainDetailsComponent } from './components/domain-details/domain-details.component';
import { DomainDetailsRegistrarComponent } from './components/domain-details-registrar/domain-details-registrar.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrarSearchComponent } from './components/registrar-search/registrar-search.component';
import { RegistrarDetailsComponent } from './components/registrar-details/registrar-details.component';
import { HttpErrorHandler } from 'src/app/services/http-error-handler.service';
import { CacheInterceptor } from './services/cache.interceptor';

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
    ToastsContainer,
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
    HttpErrorHandler,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
