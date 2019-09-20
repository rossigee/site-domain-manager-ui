import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AgentsService } from 'src/app/services/agents.service';
import { Observable } from 'rxjs';
import { Agent } from 'src/app/models/Agent';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-domain',
  templateUrl: './create-domain.component.html',
  styleUrls: ['./create-domain.component.css'],
})
export class CreateDomainComponent implements OnInit {
  registrar$: Observable<Agent[]>;
  dns$: Observable<Agent[]>;
  site: number;
  waf$: Observable<Agent[]>;
  domainForm: FormGroup;
  submitted: boolean;
  constructor(
    private modalService: NgbModal,
    private agentService: AgentsService,
    private fb: FormBuilder
  ) {
    this.domainForm = this.fb.group({
      dns: [''],
      waf: [''],
      registrar: [''],
      name: ['', Validators.required],
    });
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-title' });
  }

  ngOnInit() {
    this.agentService.loadAll();
    this.registrar$ = this.agentService.registrarAgents;
    this.dns$ = this.agentService.dnsAgents;
    this.waf$ = this.agentService.wafAgents;
  }

  addDomain(modal: NgbActiveModal) {
    this.submitted = true;

    // if (!this.domainForm.invalid) {
    //   /**
    //    * Perform logic
    //    */
    //   const { label, agent } = this.newRegistrarForm.value;
    //   this.registrarService.create(label, agent);
    //   modal.close();
    // }
  }
}
