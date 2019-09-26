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

  constructor(private domainsService: DomainsService) {
    this.searchTerm = new FormControl('');
  }

  get loading() {
    return this.domainsService.loading.bulk;
  }

  ngOnInit() {
    // initial load
    this.domainsService.loadAll(this.searchTerm.value);

    // Make subscription on observers
    this.domains$ = this.domainsService.domains;
  }

  search(): void {
    this.domainsService.loadAll(this.searchTerm.value);
  }
}
