import { Component, OnInit, Input } from '@angular/core';

import { DomainRegistrarStatus } from '../domain';
import { DomainDetailsRegistrarService } from './domain-details-registrar.service';

import { ToastService } from '../toast/toast.service';

@Component({
  selector: 'app-domain-details-registrar',
  templateUrl: './domain-details-registrar.component.html',
  styleUrls: ['./domain-details-registrar.component.css'],
  providers: [DomainDetailsRegistrarService],
})
export class DomainDetailsRegistrarComponent implements OnInit {
  loading: boolean = false;
  status: DomainRegistrarStatus = null;
  error: string = null;

  constructor(
    private domainDetailsRegistrarService: DomainDetailsRegistrarService,
    private toastService: ToastService,
  ) {}

  ngOnInit() {}

  fetchStatusForDomain(registrar_id, domainname) {
    this.loading = true;
    this.domainDetailsRegistrarService
      .getDomainRegistrarStatusForDomain(registrar_id, domainname)
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
