import { Component, OnInit, Input } from '@angular/core';
import { DomainDetailsRegistrarService } from 'src/app/services/domain-details-registrar.service';
import { DomainRegistrarStatus } from 'src/app/models/Domain';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-domain-details-registrar',
  templateUrl: './domain-details-registrar.component.html',
  styleUrls: ['./domain-details-registrar.component.css'],
  providers: [DomainDetailsRegistrarService],
})
export class DomainDetailsRegistrarComponent implements OnInit {
  loading: boolean = false;
  status: DomainRegistrarStatus = null;
  error: string | null = null;

  constructor(
    private domainDetailsRegistrarService: DomainDetailsRegistrarService,
    private toastService: ToastService
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
        }
      );
  }
}
