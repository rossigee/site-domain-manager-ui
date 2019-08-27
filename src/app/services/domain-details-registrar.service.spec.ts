import { TestBed } from '@angular/core/testing';

import { DomainDetailsRegistrarService } from './domain-details-registrar.service';

describe('DomainDetailsRegistrarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DomainDetailsRegistrarService = TestBed.get(DomainDetailsRegistrarService);
    expect(service).toBeTruthy();
  });
});
