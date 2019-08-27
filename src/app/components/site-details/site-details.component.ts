import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SiteDetailsService } from 'src/app/services/site-details.service';
import { Site } from 'src/app/models/Site';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-site-details',
  templateUrl: './site-details.component.html',
  styleUrls: ['./site-details.component.css'],
  providers: [SiteDetailsService],
})
export class SiteDetailsComponent implements OnInit, AfterViewInit {
  id: string;
  site: Site;
  loading: boolean = false;

  constructor(
    route: ActivatedRoute,
    private siteService: SiteDetailsService,
    private toastService: ToastService
  ) {
    this.id = route.snapshot.paramMap.get('siteId');
  }

  ngOnInit() {}

  ngAfterViewInit() {
    setTimeout(() => (this.loading = true));

    this.siteService.getSite(this.id).subscribe(
      resp => {
        this.loading = false;
        this.site = resp['site'];
        console.log(this.site);
      },
      error => {
        this.loading = false;
        this.toastService.error(error);
      }
    );
  }
}
