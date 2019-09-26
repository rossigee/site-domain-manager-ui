import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Domain, DomainStatusCheck } from 'src/app/models/Domain';
import { DomainsService } from 'src/app/services/domains.service';
import { Observable } from 'rxjs';
import { DnsService } from 'src/app/services/dns.service';
import { Dns } from 'src/app/models/Dns';
import { Registrar } from 'src/app/models/Registrar';
import { RegistrarsService } from 'src/app/services/registrars.service';
import { WafService } from 'src/app/services/waf.service';
import { SitesService } from 'src/app/services/sites.service';
import { Waf } from 'src/app/models/Waf';
import { Site } from 'src/app/models/Site';
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
  name: string;
  domain$: Observable<Domain>;
  checks$: Observable<DomainStatusCheck>
  domainNSStatusCheck: DomainStatusCheck;
  domainAStatusCheck: DomainStatusCheck;
  notready: boolean;
  editing: boolean;
  dns$: Observable<Dns[]>;
  waf$: Observable<Waf[]>;
  sites$: Observable<Site[]>;
  registrars$: Observable<Registrar[]>;
  submitted: boolean;
  editForm: FormGroup;

  constructor(
    route: ActivatedRoute,
    private domainsService: DomainsService,
    private dnsService: DnsService,
    private wafService: WafService,
    private sitesService: SitesService,
    private registrarService: RegistrarsService,
    private fb: FormBuilder
  ) {
    this.id = route.snapshot.paramMap.get('domainId');
    this.editing = false;
    this.submitted = false;
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      registrar: [null, Validators.required],
      dns: [null, Validators.required],
      site: [null, Validators.required],
      waf: [null, Validators.required],
      google_site_verification: [''],
      active: [null],
    });
  }

  get loading(): boolean {
    return this.domainsService.loading.single;
  }

  get updating(): boolean {
    return this.domainsService.loading.updating;
  }

  get errors(): { [key: string]: ValidationErrors } {
    return {
      name: this.editForm.controls.name.errors,
      registrar: this.editForm.controls.registrar.errors,
      dns: this.editForm.controls.dns.errors,
      site: this.editForm.controls.site.errors,
      waf: this.editForm.controls.waf.errors,
      google_site_verification: this.editForm.controls.google_site_verification
        .errors,
    };
  }

  switchEditing(): void {
    if (!this.editing) {
      /**
       * Load all data for editing
       */
      this.dnsService.loadProviders();
      this.registrarService.loadAll();
      this.sitesService.loadAll();
      this.wafService.loadAll();
      this.dns$ = this.dnsService.providers;
      this.registrars$ = this.registrarService.registrars;
      this.waf$ = this.wafService.waf;
      this.sites$ = this.sitesService.sites;
      this.setInitialValues();
    }
    this.submitted = false;
    this.editing = !this.editing;
  }

  submit(): void {
    this.submitted = true;
    if (!this.editForm.invalid) {
      this.domainsService.update(this.editForm.value);
      setTimeout(() => {
        this.switchEditing();
      }, 500);
    }
  }

  refresh(): void {
    this.domainsService.load(this.id, true);
    this.domainsService.statusChecks(this.id, true);
  }

  ngOnInit() {
    this.domainsService.load(this.id);
    this.setInitialValues();
  }

  setInitialValues(): void {
    this.domain$ = this.domainsService.domain.pipe(
      tap(domain => {
        this.name = domain.name;
        this.editForm.patchValue({
          name: domain.name,
          registrar: domain.registrar ? domain.registrar.id : null,
          dns: domain.dns ? domain.dns.id : null,
          site: domain.site ? domain.site.id : null,
          waf: domain.waf ? domain.waf.id : null,
          google_site_verification: domain.google_site_verification || '',
          active: domain.active,
        });
        this.statusChecks();
      })
    );
  }

  statusChecks(): void {
    this.domainsService.statusChecks(this.id);
    this.checks$ = this.domainsService.checks;
    this.checks$.subscribe(
      check => {
        if(check === undefined) return;
        let parts = check._check_id.split(":");
        if(parts[1] != this.name) return;
        const checkSwitch = (checkid) => ({
          "ns_records": (value) => {
            this.domainNSStatusCheck = value;
          },
          "a_records": (value) => {
            this.domainAStatusCheck = value;
          }
        })[checkid];
        checkSwitch(parts[2])(check);
      },
    );
  }

  recheckNS(): void {
    this.domainsService.recheckNS(this.id);
  }

  recheckA(): void {
    this.domainsService.recheckA(this.id);
  }

}
