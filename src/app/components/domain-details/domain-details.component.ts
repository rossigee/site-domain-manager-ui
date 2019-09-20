import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Domain } from 'src/app/models/Domain';
import { DomainsService } from 'src/app/services/domains.service';
import { Observable } from 'rxjs';
import { DnsService } from 'src/app/services/dns.service';
import { Dns } from 'src/app/models/Dns';
import { Registrar } from 'src/app/models/Registrar';
import { RegistrarsService } from 'src/app/services/registrars.service';
import { WafService } from 'src/app/services/waf.service';
import { HostingService } from 'src/app/services/hosting.service';
import { Waf } from 'src/app/models/Waf';
import { Hosting } from 'src/app/models/Hosting';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ValidationErrors,
} from '@angular/forms';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-domain-details',
  templateUrl: './domain-details.component.html',
  styleUrls: ['./domain-details.component.css'],
  providers: [DomainsService],
})
export class DomainDetailsComponent implements OnInit {
  id: string;
  domain$: Observable<Domain>;
  notready: boolean;
  editing: boolean;
  dns$: Observable<Dns[]>;
  waf$: Observable<Waf[]>;
  hosting$: Observable<Hosting[]>;
  registrars$: Observable<Registrar[]>;
  submitted: boolean;
  editForm: FormGroup;

  constructor(
    route: ActivatedRoute,
    private domainService: DomainsService,
    private dnsService: DnsService,
    private wafService: WafService,
    private hostingService: HostingService,
    private registrarService: RegistrarsService,
    private fb: FormBuilder
  ) {
    this.id = route.snapshot.paramMap.get('domainId');
    this.editing = false;
    this.submitted = false;
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      registrar: [null],
      dns: [null],
      hosting: [null],
      waf: [null],
    });
  }

  get loading(): boolean {
    return this.domainService.loading.single;
  }

  get updating(): boolean {
    return this.domainService.loading.updating;
  }

  get errors(): { [key: string]: ValidationErrors } {
    return {
      name: this.editForm.controls.name.errors,
    };
  }

  switchEditing(): void {
    if (!this.editing) {
      /**
       * Load all data for editing
       */
      this.dnsService.loadProviders();
      this.registrarService.loadAll();
      this.hostingService.loadAll();
      this.wafService.loadAll();
      this.dns$ = this.dnsService.providers;
      this.registrars$ = this.registrarService.registrars;
      this.waf$ = this.wafService.waf;
      this.hosting$ = this.hostingService.hostings;
      this.setInitialValues();
    }
    this.submitted = false;
    this.editing = !this.editing;
  }

  submit(): void {
    this.submitted = true;
    if (!this.editForm.invalid) {
      this.domainService.update(this.editForm.value);
      setTimeout(() => {
        this.switchEditing();
      }, 500);
    }
  }

  refresh(): void {
    this.domainService.load(this.id, true);
  }

  ngOnInit() {
    this.domainService.load(this.id);
    this.setInitialValues();
  }

  setInitialValues(): void {
    this.domain$ = this.domainService.domain.pipe(
      tap(domain => {
        this.editForm.patchValue({
          name: domain.name,
          registrar: domain.registrar ? domain.registrar.id : null,
          dns: domain.dns ? domain.dns.id : null,
          hosting: domain.hosting ? domain.hosting.id : null,
          waf: domain.waf ? domain.waf.id : null,
        });
      })
    );
  }
}
