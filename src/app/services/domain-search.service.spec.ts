import { TestBed } from '@angular/core/testing';

import { DomainSearchService } from './domain-search.service';

describe('DomainSearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DomainSearchService = TestBed.get(DomainSearchService);
    expect(service).toBeTruthy();
  });
});
