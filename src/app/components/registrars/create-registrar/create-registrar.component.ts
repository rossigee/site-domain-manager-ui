import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ValidationErrors,
} from '@angular/forms';
import { RegistrarsService } from 'src/app/services/registrars.service';

@Component({
  selector: 'app-create-registrar',
  templateUrl: './create-registrar.component.html',
  styleUrls: ['./create-registrar.component.css'],
})
export class CreateRegistrarComponent implements OnInit {
  // TODO: Create factory for this
  agents: Array<{}>;
  newRegistrarForm: FormGroup;
  submitted: boolean;

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private registrarService: RegistrarsService
  ) {
    // TODO: Get this data from API
    this.agents = [
      { label: 'Marcaria', value: 'marcaria' },
      { label: 'Namecheap', value: 'namecheap' },
      { label: 'IONOS', value: 'ionos' },
      { label: 'United Domains', value: 'united_domains' },
    ];
    this.newRegistrarForm = this.formBuilder.group({
      label: ['', Validators.required],
      agent: ['', Validators.required],
    });
  }

  ngOnInit() {}

  get errors(): { [key: string]: ValidationErrors } {
    return {
      label: this.newRegistrarForm.controls.label.errors,
      agent: this.newRegistrarForm.controls.agent.errors,
    };
  }

  get creating(): boolean {
    return this.registrarService.handlingState.creating;
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-title' });
  }

  addRegistrar() {
    this.submitted = true;
    if (!this.newRegistrarForm.invalid) {
      /**
       * Perform logic
       */
      this.registrarService.create(this.newRegistrarForm.value);
    }
  }
}
