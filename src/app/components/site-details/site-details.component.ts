import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Site } from 'src/app/models/Site';
import { SitesService } from 'src/app/services/sites.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-site-details',
  templateUrl: './site-details.component.html',
  styleUrls: ['./site-details.component.css'],
  providers: [SitesService],
})
export class SiteDetailsComponent implements OnInit {
  id: number;
  site$: Observable<Site>;
  notready: boolean;

  constructor(route: ActivatedRoute, private sitesService: SitesService) {
    this.id = parseInt(route.snapshot.paramMap.get('siteId'));
  }

  get loading() {
    return this.sitesService.loading.single;
  }

  ngOnInit() {
    this.sitesService.load(this.id);
    this.site$ = this.sitesService.site;
  }
}
