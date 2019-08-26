import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Domain } from '../domain';
import { DomainDetailsService } from './domain-details.service';
import { DomainDetailsRegistrarComponent } from '../domain-details-registrar/domain-details-registrar.component';
import { DomainDetailsDNSComponent } from '../domain-details-dns/domain-details-dns.component';

import { ToastService } from '../toast/toast.service';

@Component({
  selector: 'app-domain-details',
  templateUrl: './domain-details.component.html',
  styleUrls: ['./domain-details.component.css'],
  providers: [DomainDetailsService],
})
export class DomainDetailsComponent implements OnInit, AfterViewInit {
  @ViewChild(DomainDetailsRegistrarComponent, { static: false })
  private registrarStatusChild: DomainDetailsRegistrarComponent;

  @ViewChild(DomainDetailsDNSComponent, { static: false })
  private dnsStatusChild: DomainDetailsDNSComponent;

  id: string;
  domain: Domain;
  loading: boolean = false;

  constructor(
    route: ActivatedRoute,
    private domainService: DomainDetailsService,
    private toastService: ToastService,
  ) {
    this.id = route.snapshot.paramMap.get('domainId');;
  }

  ngOnInit() {}

  ngAfterViewInit() {
    setTimeout(() => this.loading = true);

    this.domainService.getDomain(this.id)
      .subscribe(
        resp => {
          this.loading = false;
          this.domain = resp['domain'];
          if(this.domain.registrar) {
            setTimeout(() => {
              this.registrarStatusChild.fetchStatusForDomain(this.domain.registrar.id, this.domain.name);
            });
          }
          if(this.domain.dns) {
            setTimeout(() => {
              this.dnsStatusChild.fetchStatusForDomain(this.domain.dns.id, this.domain.name);
            });
          }
        },
        error => {
          this.loading = false;
          this.toastService.error(error);
        }
      );


  }


}
