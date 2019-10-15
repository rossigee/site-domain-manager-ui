import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Site } from 'src/app/models/Site';
import { SitesService } from 'src/app/services/sites.service';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-site-details',
  templateUrl: './site-details.component.html',
  styleUrls: ['../../app.component.css', './site-details.component.css'],
  providers: [SitesService],
})
export class SiteDetailsComponent implements OnInit {
  id: string;
  site$: Observable<Site>;
  notready: boolean;
  editing: boolean;
  editForm: FormGroup;
  submitted: boolean;

  constructor(
    route: ActivatedRoute,
    private sitesService: SitesService,
    private fb: FormBuilder
  ) {
    this.id = route.snapshot.paramMap.get('siteId');
    this.editing = false;
    this.editForm = this.fb.group({
      active: [null],
    });
  }

  get loading() {
    return this.sitesService.loading.single;
  }

  get updating(): boolean {
    return this.sitesService.loading.updating;
  }

  switchEditing(): void {
    if (!this.editing) {
      this.setInitialValues();
    }
    this.editing = !this.editing;
  }

  ngOnInit() {
    this.sitesService.load(this.id);
    this.setInitialValues();
  }

  setInitialValues(): void {
    this.site$ = this.sitesService.site.pipe(
      tap(site => {
        this.editForm.patchValue({
          active: site.active,
        });
      })
    );
  }

  submit(): void {
    this.submitted = true;
    if (!this.editForm.invalid) {
      this.sitesService.update(this.editForm.value);
      setTimeout(() => {
        this.switchEditing();
      }, 500);
    }
  }
}
