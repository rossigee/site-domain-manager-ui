import { Component, OnInit } from '@angular/core';

import { FormControl } from '@angular/forms';
import { SiteSearchService } from 'src/app/services/site-search.service';
import { Site, SitesResponse } from 'src/app/models/Site';
import { ToastService } from 'src/app/services/toast.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-site-search',
  templateUrl: './site-search.component.html',
  styleUrls: ['./site-search.component.css'],
  providers: [SiteSearchService],
})
export class SiteSearchComponent implements OnInit {
  searchTerm = new FormControl('');
  loading: boolean = false;
  sites$: Observable<Site[]>;

  constructor(private sitesService: SiteSearchService) {}

  ngOnInit() {
    this.sitesService.searchSites(this.searchTerm.value);
    this.sites$ = this.sitesService.sites;
  }
  search(): void {
    this.sitesService.searchSites(this.searchTerm.value);
  }

  // search(): void {
  //   this.loading = true;
  //   if (!this.sites || this.searchTerm.value.length > 0) {
  //     this.sitesService
  //       .searchSites(this.searchTerm.value)
  //       //.subscribe(sites => console.log(sites));
  //       .subscribe({
  //         next: (res: SitesResponse) => {
  //           this.loading = false;
  //           this.sitesService.sites = res.sites;
  //           this.sites = this.sitesService.sites;
  //         },
  //         error: error => {
  //           this.loading = false;
  //           this.toastService.error(error);
  //         },
  //       });
  //   }
  //   this.sites = this.sitesService.sites;
  // }
}
