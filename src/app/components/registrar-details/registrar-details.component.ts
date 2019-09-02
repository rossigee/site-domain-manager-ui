import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Registrar } from 'src/app/models/Registrar';
import { Observable } from 'rxjs';
import { RegistrarsService } from 'src/app/services/registrars.service';

@Component({
  selector: 'app-registrar-details',
  templateUrl: './registrar-details.component.html',
  styleUrls: ['./registrar-details.component.css'],
  providers: [RegistrarsService],
})
export class RegistrarDetailsComponent implements OnInit {
  id: string;
  registrar$: Observable<Registrar>;
  notready: boolean;
  fileToUpload: File;

  constructor(
    route: ActivatedRoute,
    private registrarService: RegistrarsService
  ) {
    this.id = route.snapshot.paramMap.get('registrarId');
  }

  ngOnInit() {
    this.registrarService.load(this.id);
    this.registrar$ = this.registrarService.registrar;
  }

  get loading(): boolean {
    return this.registrarService.loading.single;
  }

  get refreshing(): boolean {
    return this.registrarService.handlingState.refreshing;
  }

  get uploading(): boolean {
    return this.registrarService.handlingState.uploading;
  }

  csvInput(files: FileList) {
    this.registrarService.uploadFile(files.item(0), 'csvfile');
  }

  jsonInput(files: FileList) {
    this.registrarService.uploadFile(files.item(0), 'jsonfile');
  }

  refreshFromApi() {
    this.registrarService.refreshFromAPI();
  }
}
