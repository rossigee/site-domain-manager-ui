import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Notifier } from 'src/app/models/Notifier';
import { ActivatedRoute } from '@angular/router';
import { NotifiersService } from 'src/app/services/notifiers.service';

@Component({
  selector: 'app-notifier-details',
  templateUrl: './notifier-details.component.html',
  styleUrls: ['./notifier-details.component.css'],
})
export class NotifierDetailsComponent implements OnInit {
  private id: string;
  private notifier$: Observable<Notifier>;
  private notready: boolean;
  private editing: boolean;

  constructor(
    route: ActivatedRoute,
    private notifierService: NotifiersService
  ) {
    this.id = route.snapshot.paramMap.get('notifierId');
  }

  get loading(): boolean {
    return this.notifierService.loading.single;
  }

  ngOnInit() {
    this.notifierService.load(this.id);
    this.notifier$ = this.notifierService.notifier;
  }

  switchEditing(): void {
    this.editing = !this.editing;
  }
}
