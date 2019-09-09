import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ValidationErrors,
} from '@angular/forms';
import { RegistrarsService } from 'src/app/services/registrars.service';
import { Observable } from 'rxjs';
import { Agent } from 'src/app/models/Agent';
import { AgentsService } from 'src/app/services/agents.service';

@Component({
  selector: 'app-create-registrar',
  templateUrl: './create-registrar.component.html',
  styleUrls: ['./create-registrar.component.css'],
})
export class CreateRegistrarComponent implements OnInit {
  // TODO: Create factory for this
  agents: Observable<Agent[]>;
  newRegistrarForm: FormGroup;
  submitted: boolean;

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private registrarService: RegistrarsService,
    private agentService: AgentsService
  ) {
    this.newRegistrarForm = this.formBuilder.group({
      label: ['', Validators.required],
      agent: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.agentService.loadAll();
    this.agents = this.agentService.registrarAgents;
  }

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

  addRegistrar(modal: NgbActiveModal) {
    this.submitted = true;

    if (!this.newRegistrarForm.invalid) {
      /**
       * Perform logic
       */
      const { label, agent } = this.newRegistrarForm.value;
      this.registrarService.create(label, agent);
      modal.close();
    }
  }
}
