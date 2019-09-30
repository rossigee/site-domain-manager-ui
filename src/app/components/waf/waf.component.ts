import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Waf } from 'src/app/models/Waf';
import { WafService } from 'src/app/services/waf.service';

@Component({
  selector: 'app-waf',
  templateUrl: './waf.component.html',
  styleUrls: ['../css/components.css', './waf.component.css'],
})
export class WafComponent implements OnInit {
  waf$: Observable<Waf[]>;
  notready: boolean;

  constructor(private wafService: WafService) {}

  get loading(): boolean {
    return this.wafService.loading.bulk;
  }

  ngOnInit() {
    // initial load
    this.wafService.loadAll();

    // Make subscription on observer
    this.waf$ = this.wafService.waf;
  }
}
