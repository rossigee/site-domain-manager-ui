import { Component, OnInit } from '@angular/core';
import { HostingService } from 'src/app/services/hosting.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Hosting } from 'src/app/models/Hosting';

@Component({
  selector: 'app-hosting-details',
  templateUrl: './hosting-details.component.html',
  styleUrls: ['./hosting-details.component.css'],
})
export class HostingDetailsComponent implements OnInit {
  private id: string;
  hosting$: Observable<Hosting>;

  constructor(private hostingService: HostingService, route: ActivatedRoute) {
    this.id = route.snapshot.paramMap.get('hostingId');
  }

  get loading() {
    return this.hostingService.loading.bulk;
  }

  get updating(): boolean {
    return this.hostingService.loading.single;
  }

  refresh(): void {
    this.hostingService.refresh(this.id);
  }

  ngOnInit() {
    this.hostingService.loadAll(false, this.id);
    this.hosting$ = this.hostingService.hosting;
  }
}
