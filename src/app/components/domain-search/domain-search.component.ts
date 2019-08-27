import { Component, OnInit } from '@angular/core';

import { FormControl } from '@angular/forms';
import { DomainSearchService } from 'src/app/services/domain-search.service';
import { Domain } from 'src/app/models/Domain';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-domain-search',
  templateUrl: './domain-search.component.html',
  styleUrls: ['./domain-search.component.css'],
  providers: [DomainSearchService],
})
export class DomainSearchComponent implements OnInit {
  searchTerm: FormControl = new FormControl('');
  loading: boolean = false;
  domains: Domain[];

  constructor(
    private domainsService: DomainSearchService,
    private toastService: ToastService
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
