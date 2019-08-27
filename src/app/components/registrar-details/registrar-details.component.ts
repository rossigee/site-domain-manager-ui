import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RegistrarDetailsService } from 'src/app/services/registrar-details.service';
import { Registrar } from 'src/app/models/Registrar';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-registrar-details',
  templateUrl: './registrar-details.component.html',
  styleUrls: ['./registrar-details.component.css'],
  providers: [RegistrarDetailsService],
})
export class RegistrarDetailsComponent implements OnInit, AfterViewInit {
  id: string;
  registrar: Registrar;
  loading: boolean = false;
  uploading: boolean = false;
  refreshing: boolean = false;
  fileToUpload: File = null;

  constructor(
    route: ActivatedRoute,
    private registrarService: RegistrarDetailsService,
    private toastService: ToastService
  ) {
    this.id = route.snapshot.paramMap.get('registrarId');
  }

  ngOnInit() {}

  ngAfterViewInit() {
    setTimeout(() => (this.loading = true));

    this.refresh();
  }

  handleCSVFileInput(files: FileList) {
    this.uploading = true;
    this.registrarService.postCSVFile(this.id, files.item(0)).subscribe(
      data => {
        this.uploading = false;
        if (data.status == 'ok') {
          this.toastService.notice(
            'Upload successful. ' + data.records_read + ' records processed.'
          );
        }
        this.refresh();
      },
      error => {
        this.uploading = false;
        this.toastService.error(error);
      }
    );
  }

  handleJSONFileInput(files: FileList) {
    this.uploading = true;
    this.registrarService.postJSONFile(this.id, files.item(0)).subscribe(
      data => {
        this.uploading = false;
        if (data.status == 'ok') {
          this.toastService.notice(
            'Upload successful. ' + data.records_read + ' records processed.'
          );
        }
        this.refresh();
      },
      error => {
        this.uploading = false;
        this.toastService.error(error);
      }
    );
  }

  refreshFromAPI() {
    this.refreshing = true;
    this.registrarService.refreshFromAPI(this.id).subscribe(
      data => {
        this.refreshing = false;
        if (data.status == 'ok') {
          this.toastService.notice(
            'Refresh successful. ' + data.records_read + ' records updated.'
          );
        }
        this.refresh();
      },
      error => {
        this.refreshing = false;
        this.toastService.error(error);
      }
    );
  }

  refresh = function() {
    this.registrarService.getRegistrar(this.id).subscribe(
      resp => {
        this.loading = false;
        //this.fileToUpload = null;
        this.registrar = resp; //['registrar'];
      },
      error => {
        this.loading = false;
        //this.fileToUpload = null;
        this.toastService.error(error);
      }
    );
  };
}
