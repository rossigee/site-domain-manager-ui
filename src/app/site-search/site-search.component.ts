import { Component, OnInit } from '@angular/core';

import { FormControl } from '@angular/forms';

import { Site } from '../site';
import { SiteSearchService } from './site-search.service';

import { ToastService } from '../toast/toast.service';

@Component({
  selector: 'app-site-search',
  templateUrl: './site-search.component.html',
  styleUrls: ['./site-search.component.css'],
  providers: [SiteSearchService],
})
export class SiteSearchComponent implements OnInit {
  searchTerm = new FormControl('');
  loading: boolean = false;
  sites: Site[];

  constructor(
    private sitesService: SiteSearchService,
    private toastService: ToastService,
  ) {}

  ngOnInit() {
    this.search();
  }

  search(): void {
    this.loading = true;
    this.sitesService
      .searchSites(this.searchTerm.value)
      //.subscribe(sites => console.log(sites));
      .subscribe(
        resp => {
          this.loading = false;
          this.sites = resp['sites'];
        },
        error => {
          this.loading = false;
          this.toastService.error(error);
        }
      );
  }
}
