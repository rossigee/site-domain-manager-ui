import { Component, OnInit } from '@angular/core';
import { DnsService } from 'src/app/services/dns.service';
import { Observable } from 'rxjs';
import { Dns } from 'src/app/models/Dns';

@Component({
  selector: 'app-dns',
  templateUrl: './dns.component.html',
  styleUrls: ['./dns.component.css'],
})
export class DnsComponent implements OnInit {
  notready: boolean;
  dns$: Observable<Dns[]>;

  constructor(private dnsService: DnsService) {}

  get loading(): boolean {
    return this.dnsService.loading.bulk;
  }

  ngOnInit() {
    this.dnsService.loadProviders();

    this.dns$ = this.dnsService.providers;
  }
}
