import { Component, OnInit } from '@angular/core';

import { FormControl } from '@angular/forms';

import { Domain } from '../domain';
import { DomainSearchService } from './domain-search.service';

import { ToastService } from '../toast/toast.service';


@Component({
  selector: 'app-domain-search',
  templateUrl: './domain-search.component.html',
  styleUrls: ['./domain-search.component.css'],
  providers: [DomainSearchService],
})
export class DomainSearchComponent implements OnInit {
  searchTerm = new FormControl('');
  loading: boolean = false;
  domains: Domain[];

  constructor(
    private domainsService: DomainSearchService,
    private toastService: ToastService,
  ) {}

  ngOnInit() {
    this.search();
  }

  search(): void {
    this.loading = true;
    this.domainsService
      .searchDomains(this.searchTerm.value)
      //.subscribe(domains => console.log(domains));
      .subscribe(
        resp => {
          this.domains = resp['domains'];
        },
        error => {
          this.loading = false;
          this.toastService.error(error);
        }
      );
  }
}
