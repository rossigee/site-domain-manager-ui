import { Component, OnInit } from '@angular/core';

import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { DomainsService } from 'src/app/services/domains.service';
import { Domain } from 'src/app/models/Domain';

@Component({
  selector: 'app-domains',
  templateUrl: './domains.component.html',
  styleUrls: ['./domains.component.css'],
})
export class DomainsComponent implements OnInit {
  searchTerm: FormControl;
  domains$: Observable<Domain[]>;
  notready: boolean;
  page: number;
  pageSize: number;

  constructor(private domainsService: DomainsService) {
    this.searchTerm = new FormControl('');
    this.page = 1;
    this.pageSize = 10;
  }

  get loading() {
    return this.domainsService.loading.bulk;
  }

  ngOnInit() {
    // initial load
    this.domainsService.loadAll(this.searchTerm.value);

    // Make subscription on observer
    this.domains$ = this.domainsService.domains;
  }

  search(): void {
    this.domainsService.loadAll(this.searchTerm.value);
  }
}
