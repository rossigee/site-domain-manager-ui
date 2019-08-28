import { TestBed } from '@angular/core/testing';

import { SiteSearchService } from './site-search.service';

describe('SiteSearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SiteSearchService = TestBed.get(SiteSearchService);
    expect(service).toBeTruthy();
  });
});
