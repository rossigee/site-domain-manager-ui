import { TestBed } from '@angular/core/testing';

import { RegistrarsService } from './registrars.service';

describe('RegistrarsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegistrarsService = TestBed.get(RegistrarsService);
    expect(service).toBeTruthy();
  });
});
