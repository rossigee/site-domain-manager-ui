import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Notifier } from 'src/app/models/Notifier';
import { NotifiersService } from 'src/app/services/notifiers.service';

@Component({
  selector: 'app-notifiers',
  templateUrl: './notifiers.component.html',
  styleUrls: ['./notifiers.component.css'],
})
export class NotifiersComponent implements OnInit {
  notready: boolean;
  notifiers$: Observable<Notifier[]>;

  constructor(private notifierService: NotifiersService) {}

  get loading(): boolean {
    return this.notifierService.loading.bulk;
  }

  ngOnInit() {
    this.notifierService.loadAll();
    this.notifiers$ = this.notifierService.notifiers;
  }
}
