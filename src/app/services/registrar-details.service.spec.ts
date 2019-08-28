import { TestBed } from '@angular/core/testing';

import { RegistrarDetailsService } from './registrar-details.service';

describe('RegistrarDetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegistrarDetailsService = TestBed.get(RegistrarDetailsService);
    expect(service).toBeTruthy();
  });
});
