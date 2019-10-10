import { Component, OnInit } from '@angular/core';
import { DnsService } from 'src/app/services/dns.service';
import { Observable } from 'rxjs';
import { Dns } from 'src/app/models/Dns';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dns-details',
  templateUrl: './dns-details.component.html',
  styleUrls: ['../../app.component.css', './dns-details.component.css'],
})
export class DnsDetailsComponent implements OnInit {
  id: string;
  notready: boolean;
  dns$: Observable<Dns>;
  editing: boolean;

  constructor(private dnsService: DnsService, route: ActivatedRoute) {
    this.id = route.snapshot.paramMap.get('dnsId');
    this.editing = false;
  }

  get loading(): boolean {
    return this.dnsService.loading.single;
  }

  ngOnInit() {
    this.dnsService.loadProvider(this.id);
    this.dns$ = this.dnsService.provider;
  }

  switchEditing(): void {
    this.editing = !this.editing;
  }
}
