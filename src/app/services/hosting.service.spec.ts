import { TestBed } from '@angular/core/testing';

import { HostingService } from './hosting.service';

describe('HostingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HostingService = TestBed.get(HostingService);
    expect(service).toBeTruthy();
  });
});
