import { TestBed } from '@angular/core/testing';

import { RegistrarSearchService } from './registrar-search.service';

describe('RegistrarSearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegistrarSearchService = TestBed.get(RegistrarSearchService);
    expect(service).toBeTruthy();
  });
});
