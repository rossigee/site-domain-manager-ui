import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegistrarsService } from 'src/app/services/registrars.service';
import { Observable } from 'rxjs';
import { Registrar } from 'src/app/models/Registrar';

@Component({
  selector: 'app-registrars',
  templateUrl: './registrars.component.html',
  styleUrls: ['../../app.component.css', './registrars.component.css'],
})
export class RegistrarsComponent implements OnInit {
  searchTerm: FormControl;
  registrars$: Observable<Registrar[]>;
  notready: boolean;

  constructor(private registrarsService: RegistrarsService) {
    this.searchTerm = new FormControl('');
  }

  get loading(): boolean {
    return this.registrarsService.loading.bulk;
  }

  ngOnInit() {
    // Initial load
    this.registrarsService.loadAll(this.searchTerm.value);

    // Make subscription on observer
    this.registrars$ = this.registrarsService.registrars;
  }

  search(): void {
    this.registrarsService.loadAll(this.searchTerm.value);
  }
}
