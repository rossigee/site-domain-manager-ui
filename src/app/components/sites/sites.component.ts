import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Site } from 'src/app/models/Site';
import { SitesService } from 'src/app/services/sites.service';

@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.css'],
})
export class SitesComponent implements OnInit {
  searchTerm = new FormControl('');
  loading: boolean = false;
  sites$: Observable<Site[]>;

  constructor(private sitesService: SitesService) {}

  ngOnInit() {
    // Initial load
    this.sitesService.loadAll(this.searchTerm.value);

    // Make subscription on observer
    this.sites$ = this.sitesService.sites;
  }
  search(): void {
    this.sitesService.loadAll(this.searchTerm.value);
  }
}
