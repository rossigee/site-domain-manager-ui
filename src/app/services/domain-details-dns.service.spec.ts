import { TestBed } from '@angular/core/testing';

import { DomainDetailsDNSService } from './domain-details-dns.service';

describe('DomainDetailsDNSService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DomainDetailsDNSService = TestBed.get(DomainDetailsDNSService);
    expect(service).toBeTruthy();
  });
});
