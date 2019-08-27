import { TestBed } from '@angular/core/testing';

import { DomainDetailsService } from './domain-details.service';

describe('DomainDetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DomainDetailsService = TestBed.get(DomainDetailsService);
    expect(service).toBeTruthy();
  });
});
