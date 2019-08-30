import { Component, OnInit, Input } from '@angular/core';
import { DomainDetailsDNSService } from 'src/app/services/domain-details-dns.service';
import { DomainDNSStatus } from 'src/app/models/Domain';
import { ToastService } from 'src/app/services/toast.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-domain-details-dns',
  templateUrl: './domain-details-dns.component.html',
  styleUrls: ['./domain-details-dns.component.css'],
  providers: [DomainDetailsDNSService],
})
export class DomainDetailsDNSComponent implements OnInit {
  @Input() providerId: string;
  @Input() domain: string;
  status$: Observable<DomainDNSStatus>;
  notready: boolean;

  constructor(private domainDetailsDNSService: DomainDetailsDNSService) {}

  get loading() {
    return this.domainDetailsDNSService.loading.single;
  }

  ngOnInit() {
    this.domainDetailsDNSService.loadStatus(this.providerId, this.domain);
    this.status$ = this.domainDetailsDNSService.status;
  }
}
