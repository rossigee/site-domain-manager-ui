import { TestBed } from '@angular/core/testing';

import { WafService } from './waf.service';

describe('WafService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WafService = TestBed.get(WafService);
    expect(service).toBeTruthy();
  });
});
