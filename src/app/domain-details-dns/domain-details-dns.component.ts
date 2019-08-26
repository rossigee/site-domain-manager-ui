import { Component, OnInit, Input } from '@angular/core';

import { DomainDNSStatus } from '../domain';
import { DomainDetailsDNSService } from './domain-details-dns.service';

import { ToastService } from '../toast/toast.service';

@Component({
  selector: 'app-domain-details-dns',
  templateUrl: './domain-details-dns.component.html',
  styleUrls: ['./domain-details-dns.component.css'],
  providers: [DomainDetailsDNSService],
})
export class DomainDetailsDNSComponent implements OnInit {
  loading: boolean = false;
  status: DomainDNSStatus = null;
  error: string = null;

  constructor(
    private domainDetailsDNSService: DomainDetailsDNSService,
    private toastService: ToastService,
  ) {}

  ngOnInit() {}

  fetchStatusForDomain(dns_provider_id, domainname) {
    this.loading = true;
    this.domainDetailsDNSService
      .getDomainDNSStatusForDomain(dns_provider_id, domainname)
      .subscribe(
          resp => {
            this.loading = false;
            this.status = resp['status'];
          },
          error => {
            this.loading = false;
            this.toastService.error(error);
          });
  }
}
