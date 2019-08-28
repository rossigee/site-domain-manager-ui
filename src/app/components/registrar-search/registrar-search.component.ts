import { Component, OnInit } from '@angular/core';

import { FormControl } from '@angular/forms';
import { RegistrarSearchService } from 'src/app/services/registrar-search.service';
import { Registrar } from 'src/app/models/Registrar';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-registrar-search',
  templateUrl: './registrar-search.component.html',
  styleUrls: ['./registrar-search.component.css'],
  providers: [RegistrarSearchService],
})
export class RegistrarSearchComponent implements OnInit {
  searchTerm = new FormControl('');
  loading: boolean = false;
  registrars: Registrar[];

  constructor(
    private registrarsService: RegistrarSearchService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.search();
  }

  search(): void {
    this.loading = true;
    this.registrarsService
      .searchRegistrars(this.searchTerm.value)
      //.subscribe(registrars => console.log(registrars));
      .subscribe(
        resp => {
          this.loading = false;
          this.registrars = resp['registrars'];
        },
        error => {
          this.loading = false;
          this.toastService.error(error);
        }
      );
  }
}
