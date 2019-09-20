import { TestBed } from '@angular/core/testing';

import { DnsService } from './dns.service';

describe('DnsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DnsService = TestBed.get(DnsService);
    expect(service).toBeTruthy();
  });
});
