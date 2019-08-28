import { TestBed } from '@angular/core/testing';

import { SiteDetailsService } from './site-details.service';

describe('SiteDetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SiteDetailsService = TestBed.get(SiteDetailsService);
    expect(service).toBeTruthy();
  });
});
