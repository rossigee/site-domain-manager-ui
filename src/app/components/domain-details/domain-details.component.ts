import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Domain } from 'src/app/models/Domain';
import { DomainsService } from 'src/app/services/domains.service';
import { Observable } from 'rxjs';

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

  constructor(route: ActivatedRoute, private domainService: DomainsService) {
    this.id = route.snapshot.paramMap.get('domainId');
  }

  get loading() {
    return this.domainService.loading.single;
  }

  refresh(): void {
    this.domainService.load(this.id, true);
  }

  ngOnInit() {
    this.domainService.load(this.id);
    this.domain$ = this.domainService.domain;
  }
}
