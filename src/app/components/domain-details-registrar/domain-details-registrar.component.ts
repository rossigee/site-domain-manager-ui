import { Component, OnInit, Input } from '@angular/core';
import { DomainDetailsRegistrarService } from 'src/app/services/domain-details-registrar.service';
import { DomainRegistrarStatus } from 'src/app/models/Domain';
import { ToastService } from 'src/app/services/toast.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-domain-details-registrar',
  templateUrl: './domain-details-registrar.component.html',
  styleUrls: ['./domain-details-registrar.component.css'],
  providers: [DomainDetailsRegistrarService],
})
export class DomainDetailsRegistrarComponent implements OnInit {
  @Input() domain: string;
  @Input() registrarId: string;
  status$: Observable<DomainRegistrarStatus>;
  notready: boolean;

  constructor(
    private domainDetailsRegistrarService: DomainDetailsRegistrarService
  ) {}

  get loading() {
    return this.domainDetailsRegistrarService.loading.single;
  }

  ngOnInit() {
    this.domainDetailsRegistrarService.loadStatus(
      this.registrarId,
      this.domain
    );
    this.status$ = this.domainDetailsRegistrarService.status;
  }
}
