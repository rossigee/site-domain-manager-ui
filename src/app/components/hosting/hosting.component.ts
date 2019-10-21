import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Hosting } from 'src/app/models/Hosting';
import { HostingService } from 'src/app/services/hosting.service';

@Component({
  selector: 'app-hosting',
  templateUrl: './hosting.component.html',
  styleUrls: ['./hosting.component.css'],
})
export class HostingComponent implements OnInit {
  hostings$: Observable<Hosting[]>;
  notready: boolean;

  constructor(private hostingService: HostingService) {}

  get loading() {
    return this.hostingService.loading.bulk;
  }

  ngOnInit() {
    this.hostingService.loadAll();
    this.hostings$ = this.hostingService.hostings;
  }
}
